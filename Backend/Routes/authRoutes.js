const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth = require('../Controllers/authController')

router.get('/me',)
router.post('/register', auth.register)
router.post('/login',)
router.post('/logout',)

module.exports = router