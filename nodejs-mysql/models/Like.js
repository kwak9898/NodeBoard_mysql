const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                likeId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    primaryKey: true,
                    autoIncrement: true
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'Like', //js에서사용
                tableName: 'likes', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.Like.belongsTo(db.User, {
            foreignKey: 'fk_userName',
            targetKey: 'userName',
            onDelete: 'cascade'
        })
        db.Like.belongsTo(db.Post, {
            foreignKey: 'fk_postId',
            targetKey: 'postId',
            onDelete: 'cascade'
        })
        db.Like.belongsTo(db.Comment, {
            foreignKey: 'fk_commentId',
            targetKey: 'commentId',
            onDelete: 'cascade'
        })
    }
}