const Sequelize = require('sequelize')
const User = require('./User')
const Post = require('./Post')
const Like = require('./Like')
const Comment = require('./Comment')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = User
db.Comment = Comment
db.Like = Like
db.Post = Post

User.init(sequelize)
Comment.init(sequelize)
Post.init(sequelize)
Like.init(sequelize)

User.associate(db)
Comment.associate(db)
Post.associate(db)
Like.associate(db)

module.exports = db