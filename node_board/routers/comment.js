const express = require('express')
const commentControll = require('../controller/comment')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/comment/:postId', authMiddleware, commentControll.createComment)

module.exports = router