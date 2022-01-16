const Post = require('../models/posts')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const { Op } = require('sequelize')

const creatPost = async (req, res, next) => {
    try {
        const { user } = res.locals
        const { title, content, password, } = req.body

        let newpost = await Post.findAll({ order: [["DESC"]] })
        let postId = 1

        if (newpost.length !== 0) {
            postId = newpost[0]["postId"] + 1
        }

        await Post.create({
            postId: postId,
            title: title,
            content: content,
            passWord: password,
            userName: user.userName
        })
        res.status(200).send({
            result: "SUCCESS!"
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