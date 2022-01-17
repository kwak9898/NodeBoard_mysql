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
const getPosts = async (req, res, next) => {
    try {
        const { postId } = req.query
        const existPost = await Post.findAll({ where: { postId: postId } })

        res.status(200).send({
            result: existPost
        })
    } catch (error) {
        console.log('-------------------------------------')
        console.log('에러발생:' + error)
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다."
        })
    }
}

// 게시물 상세 조회
const getPost = async (req, res, next) => {
    try {
        const { postId } = req.params
        const userPost = await Post.findOne({ where: { postId: postId } })

        res.status(200).send({
            result: userPost
        })
    } catch (error) {
        console.log('-------------------------------------')
        console.log('에러발생:' + error)
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다."
        })
    }
}

// 게시물 수정 시 글 가져오기
const checkUserPost = async (req, res, next) => {
    const { userName } = res.locals.user
    const { postId } = req.params

    const check = await Post.findOne({ where: { postId: postId } })

    if (check["userName"] === userName) {
        res.status(400).send({
            errorMessage: "유저 정보가 일치하지 않습니다."
        })
        return
    } else {
        res.status(200).send({
            result: check
        })
    }
}

module.exports = {
    creatPost,
    getPosts,
    getPost,
    checkUserPost
}