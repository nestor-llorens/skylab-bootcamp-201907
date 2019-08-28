const mongoose = require('mongoose')

const { Schema } = mongoose

const cardSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})

module.exports = cardSchema