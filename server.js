const express = require('express')
const session = require('express-session')
const mysql = require('mysql')
const dotenv = require('dotenv')
const app = express()
const fs = require("fs")

//pathings
app.use('/css', express.static('assets/css'));
app.use('/img', express.static('assets/img'));

app.set('view-engine', 'hbs')
console.log(__dirname);
//TEST DATABASE
const db = mysql.createConnection({
    host: process.env.databaseHost,
    user: 'root',
    password: '',
    database: process.env.database
})
//http://localhost/phpmyadmin/

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("DB Connected.")
    }
})

app.use(express.json())


app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/login', (req, res) => {
    res.render('login.html')
})

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users/', (req, res) => {
    try {
    const user = { name: req.body.name, password: req.body.password }
    user.push(user)
    res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await req.body.password == user.password) {
            res.send('You\'ve successfully logged in')
        }
        else {
            res.send('Username or Password was incorrect.')
        }
    } catch {
        res.status(500).send()
    }
})

/
app.listen(3000)