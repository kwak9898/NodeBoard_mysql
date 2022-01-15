const express = require('express')
const userControll = require('../controller/user')
const authmiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/', userControll.createUser)

module.exports = router