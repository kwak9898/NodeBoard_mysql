const express = require('express')
const port = 3000
const app = express()
const { sequelize } = require('./models')
const indexRouter = require('./routers/index')

app.set('views', __dirname + '/views')
app.set('view engine', 'html')

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('DB 연결 성공!!')
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/api', indexRouter)

app.use((req, res, next) => {
    res.sendStatus(404)
})
app.use((error, req, res, next) => {
    console.error(error)
    res.sendStatus(500)
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})