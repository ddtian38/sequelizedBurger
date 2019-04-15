
module.exports = function(sequelize, DataTypes){
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        img_link: {
            type:DataTypes.STRING,
            allowNull: false
        }
    });
    return Burger
};