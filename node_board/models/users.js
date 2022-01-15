const { Sequelize } = require('sequelize')
const db = require('.')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                userName: {
                    type: Sequelize.STRING(30),
                    allowNull: false
                },
                passWord: {
                    type: Sequelize.STRING(30),
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'users', //js에서사용
                tableName: 'users', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.users.hasMany(db.comment, {
            foreignKey: 'userID',
            sourceKey: 'userID'
        })
        db.users.hasMany(db.likes, {
            foreignKey: 'userID',
            sourceKey: 'userID'
        })
    }
}