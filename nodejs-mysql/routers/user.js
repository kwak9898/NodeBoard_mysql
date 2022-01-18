const express = require('express')
const userControll = require('../controller/user')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/', userControll.createUser)
router.post('/login', userControll.loginUser)

module.exports = router