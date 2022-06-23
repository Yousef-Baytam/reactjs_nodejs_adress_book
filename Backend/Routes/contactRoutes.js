const express = require('express')
const router = express.Router()
const catchAsync = require('../Utils/catchAsync')
const contactController = require('../Controllers/contactsController')

router.get('/', catchAsync(contactController.getContacts))
router.post('/',)
router.patch('/',)
router.delete('/',)

module.exports = router