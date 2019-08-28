const logic = require('../../logic/card')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        logic.retrieveCard(id)
            .then(user => res.status(200).json({ message: 'card retrieved correctly', user }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}