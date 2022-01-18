const express = require('express')
const likeControll = require('../controller/like')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/postLikes/:likeNo', authMiddleware, likeControll.createPostLike)
// router.post('/likes/:likeNo', authMiddleware, likeControll)

module.exports = router