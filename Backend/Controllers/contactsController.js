const Contact = require('../Models/contacts')

module.exports.getContacts = async (req, res) => {
    const contacts = await Contact.find({ 'owner': req.user.id })
    res.send({ "success": true, "results": contacts })
}

module.exports.addContacts = async (req, res) => {
    const { fullName, phone, email, relationshipStatus, address } = req.body
    const contact = new Contact({ fullName, phone, email, relationshipStatus, address, "owner": req.user })
    const result = await contact.save()
    res.send({ "success": true, "results": result })
}

module.exports.updateContacts = async (req, res) => {
    const { fullName, phone, email, relationshipStatus, address } = req.body
    const contact = await Contact.findByIdAndUpdate(req.params.id, { fullName, phone, email, relationshipStatus, address }, { new: true, runValidators: true })
    res.send({ "success": true, "results": contact })
}

module.exports.deleteContacts = async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    res.send({ "success": true, "results": contact })
}