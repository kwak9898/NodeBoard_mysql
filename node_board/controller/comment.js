const Comment = require('../models/comment')
const Posts = require('../models/posts')

// 댓글 작성
const createComment = async (req, res, next) => {
    const { userName } = res.locals.user
    const { postId } = req.params
    const { comment } = req.body

    const existPost = await Posts.findOne({
        attributes: ['postId'],
        where: { postId: postId },
        raw: true
    })

    if (!userName) {
        res.status(400).send({
            errorMessage: "로그인 후 사용해주세요."
        })
        return
    }

    if (existPost) {
        await Comment.create({
            userName: userName,
            postId: postId,
            comment: comment
        })
        res.status(200).send({ result: "SUCCESS!!!" })
    } else {
        res.status(400).send({ result: "fail" })
    }
}

// 댓글 조회
const getComment = async (req, res, next) => {
    const { postId } = req.params

    const existComment = await Comment.findAll({
        order: [["commentId", "DESC"]],
        where: { postId: postId },
        raw: true
    })
}

module.exports = {
    createComment,
    getComment
}