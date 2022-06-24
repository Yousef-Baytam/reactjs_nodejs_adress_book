const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { phone } = require('phone')

const ContactsSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        unique: true,
        validate: {
            validator: function (e) {
                return phone(e).isValid
            },
            message: props => `${ props.value } is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    relationshipStatus: {
        type: String,
        enum: ["single", "married", "widowed", "separated", "divorced"]
    },
    address: {
        location: String,
        geometry: {
            type: {
                type: String,
                enum: ['point'],

            },
            coordinates: {
                type: [Number],
            }
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

ContactsSchema.pre('save', function (next) {
    if (this.phone)
        this.phone = phone(this.phone).phoneNumber
    next()
})

ContactsSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.phone)
        this._update.phone = phone(this._update.phone).phoneNumber
    next()
})

module.exports = mongoose.model('Conatct', ContactsSchema)