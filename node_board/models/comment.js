const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                commentId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    primaryKey: true
                },
                comment: {
                    type: Sequelize.TEXT,
                    allowNull: true
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'comment', //js에서사용
                tableName: 'comments', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.comment.belongsTo(db.users, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            onDelete: 'cascade'
        })
        db.comment.hasMany(db.posts, {
            foreignKey: 'postId',
            sourceKey: 'postId'
        })
        db.comment.hasMany(db.likes, {
            foreignKey: 'commentId',
            sourceKey: 'commentId'
        })
    }
}