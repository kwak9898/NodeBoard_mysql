const jwt = require("jsonwebtoken")
const Users = require("../models/User")

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    const [tokenType, tokenValue] = authorization.split(' ')

    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        })
        return
    }

    try {
        const { userName } = jwt.verify(tokenValue, "my-token")

        Users.findByPk(userName).then((user) => {
            res.locals.user = user
            next()
        })
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        })
        return
    }
}