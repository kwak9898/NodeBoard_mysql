const express = require('express')
const userRouter = require('./user')
const postRouter = require('./post')
const commentRouter = require('./comment')
const router = express.Router()

router.use('/users', userRouter)
router.use('/', postRouter)
router.use('/', commentRouter)

module.exports = router