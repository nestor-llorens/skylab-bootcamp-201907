const { expect } = require('chai')
const logic = require('../.')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, _number, expiry

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        _number = Number((Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10));

        expiry = new Date

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
         logic.registerCard(id, _number, expiry)
            .then(_id => cardId = _id)
            .then(() => User.findById(id))
            .then(user => {
                expect(user).to.exist

                expect(user.cards).to.have.lengthOf(1)

                expect(user.cards[0]).to.exist
                expect(user.cards[0].number).to.equal(_number)
                expect(user.cards[0].expiry).to.deep.equal(expiry)           
            })
    )

    after(() => mongoose.disconnect())
})