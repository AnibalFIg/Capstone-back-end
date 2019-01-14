// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for blog and response
const Blog = require('../models/blog')
const Response = require('../models/response')
// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX - get all blogs

router.get('/blogs', function (req, res) {
  Blog.find().sort({createdAt: -1})
    .then(function (blogs) {
      return blogs.map(blog => blog.toObject())
    })
    .then(function (blogs) {
      res.status(200).json({blogs: blogs})
    })
    .catch(err => handle(err, res))
})

// only display blogs created by the user

router.get('/myblogs', requireToken, function (req, res) {
  Blog.find({owner: req.user.id}).sort({createdAt: -1})
    .then(function (blogs) {
      return blogs.map(blog => blog.toObject())
    })
    .then(function (blogs) {
      res.status(200).json({blogs: blogs})
    })
    .catch(err => handle(err, res))
})

// SHOW - display 1 blog, and if blog has responses, then it will display
// response object along with the blog object

router.get('/blogs/:id', requireToken, function (req, res) {
  const blog = Blog.findById(req.params.id)
  blog.then(function (blog) {
    handle404(blog)
    // if blog owner is the logged in user, then get responses,
    // else, return false, which will only return blog and its questions
    if (req.user.id === blog.owner) {
      return Response.find({owner: blog.id}).select('responses -_id')
    } else {
      return []
    }
  })
    .then(function (response) {
      return Promise.all([blog, response])
        .then(function (blogResponses) {
          res.status(200).json({
            blog: blogResponses[0],
            all_responses: blogResponses[1]
          })
        })
    })
    .catch(err => handle(err, res))
})

// CREATE - create a blog

router.post('/blogs', requireToken, function (req, res) {
  req.body.blog.owner = req.user.id
  Blog.create(req.body.blog)
    .then(function (blog) {
      res.status(201).json({ blog: blog.toObject() })
    })
    .catch(err => handle(err, res))
})

// DELETE - delete a blog

router.delete('/blogs/:id', requireToken, function (req, res) {
  Blog.findById(req.params.id)
    .then(function (blog) {
      requireOwnership(req, blog)
      blog.remove()
    })
    .then(res.status(204).json({message: 'Blog has been deleted'}))
    .catch(err => handle(err, res))
})

module.exports = router
