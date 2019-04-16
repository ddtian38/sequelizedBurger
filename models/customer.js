
module.exports = function(sequelize, DataTypes){
    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },

    });
    Customer.associate = function(models){
        models.Customer.hasMany(models.Burger)
    }

    return Customer
};