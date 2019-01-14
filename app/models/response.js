const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  responses: [
    {
      q_index: {
        type: Number,
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }
  ]
},
{
  timestamps: true
})

module.exports = mongoose.model('Response', responseSchema)
