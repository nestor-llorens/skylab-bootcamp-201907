const { expect } = require('chai')
const logic = require('../.')
const { User, Card } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - unregister card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, name, surname, email, password, id, card

    beforeEach(() => {
        number = Number((Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10));

        expiry = new Date()


        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
        .then(() => {
                card = new Card({ number, expiry })

                return User.create({ name, surname, email, password, cards: card })
                    .then(user => id = user.id)
        }) 
        
    })      
    
    it('should succeed on correct data', () =>{
        debugger
        return logic.unregisterCard(id, number)
            .then(card => 
                expect(card).not.to.exist
            )
        })
    it('should fail if the user card does not exist', () => {
        number = "0.9343650890953465"
        return logic.unregisterCard(id, number)
            .then(res => expect(res).not.to.exist)
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal(`This card does not exist`)
            })
    })
    after(() => mongoose.disconnect())
})
