const express = require('express')
const commentControll = require('../controller/comment')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/comment/:postId', authMiddleware, commentControll.createComment)  // 댓글 작성
router.get('/comment/:postId', commentControll.getComment)  // 댓글 조회

module.exports = router