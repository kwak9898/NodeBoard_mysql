const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const port = 3000
const app = express()
const { sequelize } = require('./models')
const indexRouter = require('./routers/index')

//db 연결
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('DB 연결 성공!!!!!!!')
    })
    .catch((err) => {
        console.log(err)
    });

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//router
app.use('/api', indexRouter)

//error
app.use((req, res, next) => {
    res.sendStatus(404)
})
app.use((error, req, res, next) => {
    console.error(error)
    res.sendStatus(500)
})


app.listen(port, () => {
    console.log(`http://localhost:${port} 서버 연결 준비가 되었습니다!`)
})
