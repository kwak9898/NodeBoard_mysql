const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                likeId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'likes', //js에서사용
                tableName: 'likes', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.likes.belongsTo(db.users, {
            foreignKey: 'userId',
            targetKey: 'userId',
            onDelete: 'cascade'
        })
        db.likes.belongsTo(db.posts, {
            foreignKey: 'postId',
            targetKey: 'postId',
            onDelete: 'cascade'
        })
        db.likes.belongsTo(db.comment, {
            foreignKey: 'commentId',
            targetKey: 'commentId',
            onDelete: 'cascade'
        })
    }
}