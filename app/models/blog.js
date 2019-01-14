const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  survey_questions: {
    type: [{
      question: {
        type: String,
        required: true
      },
      input_type: {
        type: String,
        required: true
      },
      // If input type isn't a text or textarea, enter the choices or options for the survey
      // i.e radio button -- lets say survey question asks user to choose a scale
      // between 0-5 as an answer, the numbers(although, in string format), 0 through 5,
      // will be tossed into this choices array
      // on the client, there should be some code that test for input type and retrieves
      // choices, based on input type
      choices: {
        type: [{
          type: String
        }]
      }
    }],
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Survey', surveySchema)
