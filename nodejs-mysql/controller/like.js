const Users = require('../models/User')
const Likes = require('../models/Like')
const Comments = require('../models/Comment')
const Posts = require('../models/Post')
const { Op } = require('sequelize')

// 게시물 좋아요 기능
const createPostLike = async (req, res, next) => {
    try {
        const { userName } = res.locals.user
        const { likeNo } = req.params

        const existLike = await Likes.findOne({
            where: { userName: userName, postId: likeNo }
        })

        if (!existLike) {
            await Likes.create({ userName: userName, postId: likeNo })
            res.status(200).send({ result: "true" })
        } else {
            await Likes.destroy({ where: { userName: userName, postId: likeNo } })
            res.status(200).send({ result: "false" })
        }
    } catch (error) {
        console.log('-------------------------------------')
        console.log('에러발생:' + error)
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다."
        })
    }
}

// 댓글 좋아요 기능
const createCommentLike = async (req, res, next) => {
    try {
        const { userName } = res.locals.user
        const { likeNo } = req.params

        const existLike = await Likes.findOne({
            where: { userName: userName, commentId: likeNo }
        })

        if (!existLike) {
            await Likes.create({ userName: userName, commentId: likeNo })
            res.status(200).send({ result: "true" })
        } else {
            await Likes.destroy({ where: { userName: userName, commentId: likeNo } })
            res.status(200).send({ result: "false" })
        }
    } catch (error) {
        console.log('-------------------------------------')
        console.log('에러발생:' + error)
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다."
        })
    }
}

module.exports = {
    createPostLike,
    createCommentLike
}