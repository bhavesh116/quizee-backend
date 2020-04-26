const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')

const quiz = require('./routes/quiz')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS','GET','POST','PUT','PATCH','DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorzation');
    next();
})

app.use('/',quiz)

app.use(compression)

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500; 
    res.status(error.statusCode).json({error: error}) 
}) 

//connect to db
mongoose.connect('mongodb+srv://quizeeDb:Password@1@quizee-cluster-cubuh.gcp.mongodb.net/test?retryWrites=true&w=majority', 
 {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => { 
     console.log('connected to db')
     app.listen(process.env.PORT || 8082)
 })
 .catch(err => console.log(err))

