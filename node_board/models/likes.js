const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                commentId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'commenets', //js에서사용
                tableName: 'commenets', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.likes.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
            onDelete: 'cascade'
        })
        db.likes.belongsTo(db.posts, {
            foreignKey: 'postId',
            targetKey: 'postId',
            onDelete: 'cascade'
        })
        db.likes.belongsTo(db.comments, {
            foreignKey: 'commentId',
            targetKey: 'commentId',
            onDelete: 'cascade'
        })
    }
}