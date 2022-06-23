const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const app = express()
const MongoStore = require('connect-mongo');
const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017/AddressBook')
    .then(() => {
        console.log("Database Connected")
    }).catch(err => {
        console.log('ERROR!!', err)
    })

app.listen('777', () => {
    console.log('Listening for requests on port 77777777777777777777777777777777')
})