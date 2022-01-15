const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')

const authUser = async (req, res, next) => {
    const userId = req.body
}

module.exports = {
    authUser
}