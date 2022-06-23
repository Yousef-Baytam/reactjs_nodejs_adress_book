const express = require('express')
const router = express.Router()
const catchAsync = require('../Utils/catchAsync')
const contactController = require('../Controllers/contactsController')

router.get('/', catchAsync(contactController.getContacts))
router.post('/', catchAsync(contactController.addContacts))
router.patch('/:id', catchAsync(contactController.updateContacts))
router.delete('/:id', catchAsync(contactController.deleteContacts))

module.exports = router