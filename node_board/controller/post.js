const Post = require('../models/posts')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const { Op } = require('sequelize')
const { post } = require('../routers')

// 게시물 작성
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
        res.status(200).send({
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

// 게시물 전체 조회
const getPost = async (req, res, next) => {
    try {
        const { postId } = req.query
        const existPost = await Post.findAll({ order: [["postId", "DESC"]], where: { postId: postId } })
        res.status(200).send({ result: existPost })
    } catch (error) {
        console.log('-------------------------------------')
        console.log('에러발생:' + error)
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다."
        })
    }
}

module.exports = {
    creatPost,
    getPost
}