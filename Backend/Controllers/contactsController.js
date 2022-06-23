const Contact = require('../Models/contacts')

module.exports.getContacts = async (req, res) => {
    const contacts = await Contact.find({ 'owner': req.user.id })
    res.send({ "success": true, "results": contacts })
}