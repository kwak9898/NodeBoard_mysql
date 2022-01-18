const express = require('express')
const userRouter = require('./user')
const postRouter = require('./post')
const commentRouter = require('./comment')
const likeRouter = require('./like')
const router = express.Router()

router.use('/users', userRouter)
router.use('/', postRouter)
router.use('/', commentRouter)
router.use('/', likeRouter)

module.exports = router