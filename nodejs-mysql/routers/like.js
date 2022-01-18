const express = require('express')
const likeControll = require('../controller/like')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/postLikes/:likeNo', authMiddleware, likeControll.createPostLike)
router.post('/commentLikes/:likeNo', authMiddleware, likeControll.createCommentLike)

module.exports = router