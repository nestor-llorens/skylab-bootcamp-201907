const mongoose = require('mongoose')
const { user, vehicle } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Vehicle: mongoose.model('Vehicle', vehicle)
}