const Post = require('../models/posts')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const { Op } = require('sequelize')
const { post } = require('../routers')

const creatPost = async (req, res, next) => {
    try {
        const { userName } = res.locals.user
        const { title, content, password } = req.body

        await Post.create({
            userName: userName,
            title: title,
            content: content,
            passWord: password
        })
        res.status.send({
            result: "SUCCESS!!"
        })
    } catch (error) {
        console.log('-------------------------------------')
        console.log('에러발생:' + error)
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다."
        })
    }
}

module.exports = {
    creatPost
}