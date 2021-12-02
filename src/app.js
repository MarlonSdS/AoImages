

let express = require('express')
let app = express()
let mongoose = require('mongoose')
let user = require('../models/User')

app.use(express.urlencoded({extended: false}))
app.use(express.json)

mongoose.connect('mongodb://127.0.0.1:27017/apimages', {useNewUrlParser: true, useUnifiedTopology: true})

let User = mongoose.model('User', user)

app.get('/', (req, res) =>{
    res.json({})
})

app.post('/user', async (req, res) =>{
        let newUser = new User({
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password
    })
    try{
    await newUser.save()
    res.json({email: req.body.email})
    return res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = app