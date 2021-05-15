const express = require('express')
const session = require('express-session')
const mysql = require('mysql')
const dotenv = require('dotenv')
const app = express()
const fs = require("fs")

//pathings
app.use('/css', express.static('assets/css'));
app.use('/img', express.static('assets/imgs'));
app.set('view-engine', 'hbs')

//TEST DATABASE
const db = mysql.createConnection({
    host: process.env.databaseHost,
    user: 'root',
    password: '',
    database: process.env.database
})
//http://localhost/phpmyadmin/

app.use(session( {
        secret:'A random secret',
        name:'YourSessionID',
        resave: false,
        saveUninitialized: true 
    }));

async function initializeDB() {

    const mysql = require('mysql2/promise');

    const createDBAndTables = `CREATE DATABASE IF NOT EXISTS test;
        use test;
        CREATE TABLE IF NOT EXISTS user (
        ID int NOT NULL AUTO_INCREMENT,
        email varchar(30),
        password varchar(30),
        PRIMARY KEY (ID));`;

    await db.query(createDBAndTables);
    let results = await debugPort.query("SELECT COUNT(*) FROM user");
    let count = results[0][0]['COUNT(*)'];

    if(count < 1) {
        results = await db.query("INSERT INTO user (email, password) values ('arron_ferguson@bcit.ca', 'admin')");
        console.log("Added one user record.");
    }
    db.end();
}

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
    initializeDB()
})

app.get('/loggedin', (req, res) => {
    res.render('loggedin.hbs')
})

app.post('/authen', (req, res) => {
    try {
    const user = { email: req.body.email, password: req.body.password }
    user.push(user)
    res.status(201).send()
    } catch {
        res.status(404).send()
    }
})

// function auth(email, pwd) {
//     const {email, password} = req.body

//     if(!email || !password) {
//         return res.status(400).render('login', { 
//             message: 'Please provide email and password'
//         })
//     }

//     db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], 
//     async (error, results) => {
//         if (error) {
//             console.log(error)
//         }
        
//         if(!results || !password) {
//             res.status(401).render('login', {
//                 message: 'Email or Password was incorrect'
//             })
//         } else {
//             const id = results[0].id
            
//         }
//     })
// }
app.listen(3000)