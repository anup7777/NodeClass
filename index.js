require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('./logger')
const booksRouter = require('./routes/books-routes')
const categoryRouter = require('./routes/category-routes')
const userRouter = require('./routes/users-routes')
const profile_routes = require('../routes/profile-routes')
const auth = require('./middleware/auth')

const port = process.env.PORT || 3000

mongoose.connect("mongodb://localhost:27017/books-29B")
    .then(() => {
        console.log("Connected to MongoDB server");
        app.listen(port, () => {
            console.log(`App is running on the port: ${port}`);
        });
    })
    .catch((err) => console.log(err));


const app = express()

app.use((req, res, next) => {
    logger.log(`${req.method}\t${req.headers.origin}\t${req.path}`)
    console.log(`${req.method} ${req.path}`)
    next()
})
// To accept form data
app.use(express.urlencoded({ extended: false }))
// To accept json data
app.use(express.json())
// To serve static files
app.use(express.static(path.join(__dirname, 'public')))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use('/users', userRouter)
app.use(auth.verifyUser)
app.use('/profile', auth.verifyUser, profile_routes)
app.use('/books', booksRouter)
app.use('/categories', categoryRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack)
    if (res.statusCode == 200) res.status(500)
    res.json({ msg: err.message })
})

