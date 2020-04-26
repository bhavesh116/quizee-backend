const models =  require('../Models/index')
const { errorMessage, makeid} = require('./utils/index')

exports.createQuiz = async (req, res, next) => {
    const quizDetails = req.body.quizDetails
    const userName = req.body.userName
    let quizId = makeid(6)
    try {
      const quiz = new models.Quiz({
          userName: userName,
          quizDetails: quizDetails,
          quizId: quizId
      })
      quiz.save()
      res.status(200).json({message: "quiz created successfully", quizId: quizId })
    } catch(err) {
       errorMessage(err, 500, next)
    }
}

exports.submitQuiz = async (req, res, next) => {
    const quizDetails = req.body.quizDetails
    const quizId = req.body.quizId
    try { 
      const quiz = await models.Quiz.findOne({ quizId: quizId })
      quiz.results.push(quizDetails)
      await quiz.save()
      res.status(200).json({message: "quiz submitted successfully"})
    } catch(err) { 
       errorMessage(err, 500, next)
    }
}

exports.getQuizResults = async (req, res, next) => {
    const quizId = req.params.quizId
    try { 
      const quiz = await models.Quiz.findOne({ quizId: quizId })
      res.status(200).json({data: quiz})
    } catch(err) { 
       errorMessage(err, 500, next)
    } 
} 