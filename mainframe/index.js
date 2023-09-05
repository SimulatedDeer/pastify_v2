// This is the main entry point for this server. The server takes in requests from the client, and handles all logic and database queries.

// lots of imports
const express = require ('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')

// routes
const userRoutes = require('./routes/user')
const playlistRoutes = require('./routes/playlist')
const songRoutes = require('./routes/song')
const ytapiRoutes = require('./routes/yt_api')

// middleware
//const authentication = require('./middleware/authentication')

const app = express()
app.use(cors());


// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// set port
const port = 3001

// set up database connection
const db = mysql.createConnection({
    host: 'localhost',
    password: 'student'
    //This does nothing, as it's declared in the connection.js file
})

// this is where we would use authentication middleware

// set up routes
app.use('/user', userRoutes)
app.use('/playlist', playlistRoutes)
app.use('/song', songRoutes)
app.use('/ytapi', ytapiRoutes)

// handle errors on middleware
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Something broke!')
})


// start listening
app.listen(port, () => {
    console.log(`Mainframe listening at http://localhost:${port}`)
})