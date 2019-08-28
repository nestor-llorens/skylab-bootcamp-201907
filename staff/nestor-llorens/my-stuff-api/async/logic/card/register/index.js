// const validate = require('../../../utils/validate')
const { User, Card } = require('../../../data')

function registerCard(id, number, expiry) {
    
    return (async () => {
    const user = await User.findById(id)
   
    if (!user) throw new Error(`user with id ${id} does not exists`)

    const existing = user.cards.some(({ number: _number }) => _number === number)

    if (existing) throw new Error(`user with id ${id} already has card number ${number}`)

    const newCard = new Card({ number, expiry })
    
    const cardId = newCard.id
    user.cards.push(newCard)

    await user.save()

    return cardId

    })()
}

module.exports = registerCard