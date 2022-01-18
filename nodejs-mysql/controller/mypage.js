const Users = require('../models/User')
const Likes = require('../models/Like')
const Posts = require('../models/Post')
const Comment = require('../models/Comment')

const getMypage = async (req, res, next) => {
    try {
        const { userName } = req.params

        let postList = []
        let commentList = []
        const existUser = await Users.findOne({
            where: { userName: userName },
            raw: true
        })
        const existLike = await Likes.findAll({
            order: [['likeId', 'DESC']],
            where: { userName: userName },
            raw: true
        })

        for (let i = 0; i < existLike.length; i++) {
            if (existLike[i]['postId']) {
                const likePost = await Posts.findOne({
                    attributes: ['title', 'content'],
                    where: { userName: userName },
                    raw: true
                })
                postList.push(likePost)
            } else if (existLike[i]['commentId']) {
                const likeComment = await Comment.findOne({
                    attributes: ['comment'],
                    where: { userName: userName },
                    raw: true
                })
                commentList.push(likeComment)
            }
        }
        res.status(200).send({
            existLike, post: postList, comment: commentList
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
    getMypage
}