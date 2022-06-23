const Contact = require('../Models/contacts')

module.exports.getContacts = async (req, res) => {
    const contacts = await Contact.find({ 'owner': req.user.id })
    res.send({ "success": true, "results": contacts })
}

module.exports.addContacts = async (req, res) => {
    const { fullName, phone, email, relationshipStatus, adress } = req.body
    const contacts = new Contact({ fullName, phone, email, relationshipStatus, adress, "owner": req.user })
    const result = await contacts.save()
    res.send({ "success": true, "results": result })
}

module.exports.updateContacts = async (req, res) => {
    const { fullName, phone, email, relationshipStatus, adress } = req.body
    const contacts = await Contact.findByIdAndUpdate(req.params.id, { fullName, phone, email, relationshipStatus, adress }, { new: true, runValidators: true })
    res.send({ "success": true, "results": contacts })
}