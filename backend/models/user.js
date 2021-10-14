module.exports =(sequelize, DataTypes) => {
    return sequelize.define('sequser', {
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {   timestamps: false,
        freezeTableName: true

    });
};