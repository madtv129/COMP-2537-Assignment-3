const express = require("express")

const router = express.Router();

route.get('/', req, res => {
    res.render('index.hbs')
})

route.get('/loggedin', req, res => {
    res.render('loggedin.hbs')
})

module.exports = route