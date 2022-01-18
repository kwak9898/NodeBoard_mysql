const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                postId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                },
                content: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                passWord: {
                    type: Sequelize.STRING(30),
                    allowNull: true
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'Post', //js에서사용
                tableName: 'posts', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.Post.belongsTo(db.User, {
            foreignKey: 'fk_userName',
            targetKey: 'userName',
            onDelete: 'cascade'
        })
        db.Post.hasMany(db.Like, {
            foreignKey: 'fk_postId',
            sourceKey: 'postId'
        })
        db.Post.hasMany(db.Comment, {
            foreignKey: 'fk_postId',
            sourceKey: 'postId'
        })
    }
}