const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quizSchema = new Schema({
    quizDetails: [{
      type: Object,
    }],
    results: [{
      type: Object
    }],
    userName: {
      type: String,
      required: true
    }, 
    quizId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Quiz', quizSchema )