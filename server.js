const express = require('express')
const app = express()

const users = []
app.set('view-engine', 'ejs')
app.use(express.json())


app.get('/', (req, res) => {
    res.render('index.ejs')
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