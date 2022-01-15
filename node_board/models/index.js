const Sequelize = require("sequelize")
const User = require("./users")
const Post = require("./posts")
const Like = require("./likes")
const Comment = require("./comment")

const env = process.env.NODE_ENV || 'development'
const config = require("../config/config.json")[env]
const db = {}

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = User
db.comment = Comment
db.likes = Like
db.posts = Post

User.init(sequelize)
Comment.init(sequelize)
Post.init(sequelize)
Like.init(sequelize)

User.init(sequelize)
Comment.init(sequelize)
Post.init(sequelize)
Like.init(sequelize)

module.exports = db