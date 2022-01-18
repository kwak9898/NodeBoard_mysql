const Users = require('../models/User')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const { Op } = require('sequelize')

const postUsersSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,30}$")).required(),
    confirm: Joi.string().required(),
})

// 회원가입
const createUser = async (req, res, next) => {
    try {
        const { username, password, confirm } = await postUsersSchema.validateAsync(req.body)

        if (password !== confirm) {
            res.status(400).send({
                errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다."
            })
            return
        } else if (username === password) {
            res.status(400).send({
                errorMessage: "아이디와 비밀번호를 다르게 입력해주세요."
            })
            return
        }

        const existUsers = await Users.findAll({ where: { userName: username } })
        if (existUsers.length) {
            res.status(400).send({
                errorMessage: "이미 가입된 아이디가 있습니다."
            })
            return
        }

        await Users.create({ userName: username, passWord: password })
        res.status(201).send({ result: "SUCCESS!" })
    } catch (error) {
        console.log('-------------------------------------')
        console.log('에러발생:' + error)
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다."
        })
    }
}

const postLoginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,30}$")).required(),
});

// 로그인
const loginUser = async (req, res, next) => {
    try {
        const { username, password } = await postLoginSchema.validateAsync(req.body)

        const user = await Users.findOne({ where: { userName: username, passWord: password } })

        if (!user) {
            res.status(400).send({
                errorMessage: "아이디 또는 패스워드가 잘못됐습니다."
            })
            return
        }

        const token = jwt.sign({ userName: user.userName }, "my-token")
        res.send({
            token
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
    createUser,
    loginUser
}