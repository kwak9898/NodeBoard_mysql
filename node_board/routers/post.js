const express = require('express')
const postControll = require('../controller/post')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/', authMiddleware, postControll.creatPost)

module.exports = router