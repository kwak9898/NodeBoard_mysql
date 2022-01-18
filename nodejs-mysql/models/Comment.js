const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                commentId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    primaryKey: true,
                    autoIncrement: true
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
                modelName: 'Comment', //js에서사용
                tableName: 'comments', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.Comment.belongsTo(db.User, {
            foreignKey: 'fk_userName',
            targetKey: 'userName',
            onDelete: 'cascade'
        })
        db.Comment.belongsTo(db.Post, {
            foreignKey: 'fk_postId',
            targetKey: 'postId',
            onDelete: 'cascade'
        })
        db.Comment.hasMany(db.Like, {
            foreignKey: 'fk_commentId',
            sourceKey: 'commentId'
        })
    }
}