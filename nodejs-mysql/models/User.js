const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userName: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                    primaryKey: true
                },
                passWord: {
                    type: Sequelize.STRING(30),
                    allowNull: true
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'User', //js에서사용
                tableName: 'users', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.User.hasMany(db.Post, {
            foreignKey: 'userName',
            sourceKey: 'userName'
        })
        db.User.hasMany(db.Comment, {
            foreignKey: 'userName',
            sourceKey: 'userName'
        })
        db.User.hasMany(db.Like, {
            foreignKey: 'userName',
            sourceKey: 'userName'
        })
    }
}