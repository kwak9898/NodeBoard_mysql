const express = require('express')
const postControll = require('../controller/post')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/post', authMiddleware, postControll.creatPost)
router.get('/posts', postControll.getPosts)
router.get('/:postId', postControll.getPost)
router.get('/check/:postId', authMiddleware, postControll.checkUserPost)

module.exports = router