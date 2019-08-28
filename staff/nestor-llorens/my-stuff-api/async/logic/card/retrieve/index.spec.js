const { expect } = require('chai')
const logic = require('../.')
const { User, Card } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, name, surname, email, password, id, card, user

    beforeEach( async() => {
 
        number = Number((Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10));;

        expiry = new Date()

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        card = new Card({ number, expiry })

        user = await User.create({ name, surname, email, password, cards: card })
        id = user.id

    })      
    

    it('should succeed on correct data', async() => {
        const card = await logic.retrieveCard(id)
    
        expect(card).to.exist
        expect(card[0].number).to.equal(number)
        expect(card[0].expiry).to.deep.equal(expiry)
        }
    )
    it('should fail if the user does not have cards', async() => {
        const user = await User.findById(id)

        user.cards = []
        await user.save()
                    

        try{
            const res = await logic.retrieveCard(id)
            expect(res).not.to.exist
        }
        catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`This user does not have cards`)
        }
        
            
    })

    after(() => mongoose.disconnect())
})
