const validate = require('../../../utils/validate')
const { User } = require('../../../data')

function retrieveCards(id) {
    
    validate.string(id, 'id')
    
    let cards = []
    
    return (async () => {
    const user = await User.findById(id)
    if (!user) throw Error(`This user does not exist.`)
    else {      
        if (user.cards.length === 0) throw Error(`This user does not have cards`) 

        else {
            user.cards.forEach((item) => {
            cards.push({ number: item.number, expiry: item.expiry})
            })
            return cards
        }
    }    
    })()
}

module.exports = retrieveCards