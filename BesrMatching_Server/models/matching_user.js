var models = require('../models');
module.exports = (sequelize, DataTypes)=>{
    const matching_user = sequelize.define('matching_user',{
        user_id:{
            type: DataTypes.STRING(14),
            allowNull: false,
        },
        match_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'matching_user'
    });
    matching_user.associate = (models)=>{
        models.Matching_user.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        models.Matching_user.belongsTo(models.match, {
            foreignKey: 'match_id'
        });
    };
    return matching_user;
};