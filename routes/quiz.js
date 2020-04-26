const express = require('express')
const quizController = require('../controllers/quizController')
const router = express.Router()

//get all post

router.post('/createQuiz', quizController.createQuiz)

router.post('/submitQuiz', quizController.submitQuiz)

router.get('/quiz/:quizId', quizController.getQuizResults)

module.exports = router;