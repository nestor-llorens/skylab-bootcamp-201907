const mongoose = require('mongoose')
const { user, vehicle, card } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Vehicle: mongoose.model('Vehicle', vehicle),
    Card: mongoose.model('Card', card)
}