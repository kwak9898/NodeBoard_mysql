const express = require('express')
const postControll = require('../controller/post')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.post('/post', authMiddleware, postControll.creatPost)    // 게시글 작성
router.get('/posts', postControll.getPosts)     // 게시글 전체 조회
router.get('/:postId', postControll.getPost)    // 게시글 상세 조회
router.get('/check/:postId', authMiddleware, postControll.checkUserPost)    // 수정 시 불러올 글
router.patch('/post/:postId', authMiddleware, postControll.patchPost)   // 게시글 수정

module.exports = router