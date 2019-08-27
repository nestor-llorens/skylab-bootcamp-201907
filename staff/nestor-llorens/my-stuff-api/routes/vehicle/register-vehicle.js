const logic = require('../../logic/vehicle')

module.exports = function (req, res) {
    const { body: { brand, model, year, type, color, electric, owner } } = req

    try {
        logic.registerVehicle(brand, model, year, type, color, electric, owner)
            .then(() => res.status(201).json({ message: 'vehicle correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}