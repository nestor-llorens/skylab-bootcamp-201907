const validate = require('../../../utils/validate')
const { User } = require('../../../data')

function unregisterCard(id, number) {

    validate.string(id, 'id')
    // validate.string(number, 'number')

    return (async () => {
    const user = await User.findById(id)
    if (!user) throw Error('There is no user with this id')
    else {
        
        const cardIndex = user.cards.findIndex(card => card.number === number)

        if (cardIndex === -1) throw Error('This card does not exist')
        else {
            user.cards.splice(cardIndex)
            await user.save()
        }
    }
    })()
}

module.exports = unregisterCard