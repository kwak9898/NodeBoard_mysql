const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                postId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                passWord: {
                    type: Sequelize.STRING(30),
                    allowNull: false
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'posts', //js에서사용
                tableName: 'posts', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.posts.belongsTo(db.users, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            onDelete: 'cascade'
        })
        db.posts.hasMany(db.like, {
            foreignKey: 'postId',
            sourceKey: 'postId'
        })
        db.posts.hasMany(db.comment, {
            foreignKey: 'postId',
            sourceKey: 'postId'
        })
    }
}