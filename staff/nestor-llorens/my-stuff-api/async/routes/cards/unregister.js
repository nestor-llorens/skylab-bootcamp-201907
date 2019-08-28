const logic = require('../../logic/card')

module.exports = function (req, res) {
    const { params: { id }, body: { password } } = req

    try {
        logic.unregisterCard(id, password)
            .then(() => res.json({ message: 'card correctly unregistered' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}