// const validate = require('../../../utils/validate')
const { User, Card } = require('../../../data')

function registerCard(id, number, expiry) {
    
    return User.findById(id)
        .then(user => {

            
            if (!user) throw new Error(`user with id ${id} does not exists`)

            const existing = user.cards.some(({ number: _number }) => _number === number)

            if (existing) throw new Error(`user with id ${id} already has card number ${number}`)

            user.cards.push(new Card({ number, expiry }))

            return user.save()
        })
        .then(() => { })
}

module.exports = registerCard