// const validate = require('../../utils/validate')
const { Vehicle } = require('../../../data')

function registerVehicle (brand, model, year, type, color, electric, owner, plate) {
    
    return Vehicle.findOne({plate})
        .then(vehicle => {
            if (vehicle) throw new Error(`vehicle already exists`)
            return Vehicle.create({ brand, model, year, type, color, electric, owner, plate })
        })
        .then(() => { })
    
}

module.exports = registerVehicle