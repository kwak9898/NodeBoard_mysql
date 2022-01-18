const express = require('express')
const likeControll = require('../controller/like')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/likes/:likeNo', authMiddleware, likeControll.createLike)

module.exports = router