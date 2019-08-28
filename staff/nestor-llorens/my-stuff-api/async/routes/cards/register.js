const logic = require('../../logic/card')

module.exports = function (req, res) {
    const { body: { id, number, expiry } } = req

    try {
        logic.registerCard(id, number, expiry)
            .then(() => res.status(201).json({ message: 'card correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}