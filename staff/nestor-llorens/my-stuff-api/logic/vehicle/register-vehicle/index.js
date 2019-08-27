// const validate = require('../../utils/validate')
const { Vehicle } = require('../../../data')

function registerVehicle (brand, model, year, type, color, electric, owner) {
    
    return Vehicle.findOne({ })
        .then(vehicle => {
            if (vehicle) throw new Error(`vehicle already exists`)
            return Vehicle.create({ brand, model, year, type, color, electric, owner })
        })
        .then(() => { })
    
}

module.exports = registerVehicle