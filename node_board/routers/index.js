const express = require('express')
const userRouter = require('./user')
const postRouter = require('./post')
const router = express.Router()

router.use('/users', userRouter)
router.use('/', postRouter)

module.exports = router