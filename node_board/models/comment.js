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
                },
                commenet: {
                    type: Sequelize.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: false, //_사용 여부
                modelName: 'commenet', //js에서사용
                tableName: 'commenets', //db에서 사용
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        )
    }
    static associate(db) {
        db.User.belongsTo(db.users, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            onDelete: 'cascade'
        })
        db.User.hasMany(db.posts, {
            foreignKey: 'postId',
            sourceKey: 'postId'
        })
    }
}