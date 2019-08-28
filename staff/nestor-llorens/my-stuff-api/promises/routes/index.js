const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser } = require('./user')
const { registerVehicle } = require('./vehicle')


const router = Router()

router.post('/users', registerUser)

router.post('/auth', authenticateUser)

router.get('/users/:id', tokenMiddleware, retrieveUser)

router.patch('/users/:id', tokenMiddleware, updateUser)

router.delete('/users/:id', tokenMiddleware, unregisterUser)

//

router.post('/vehicles', registerVehicle)

module.exports = router