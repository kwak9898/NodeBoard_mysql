const express = require('express')
const mypageControll = require('../controller/mypage')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router()

router.get('/mypage/:userName', authMiddleware, mypageControll.getMypage)

module.exports = router