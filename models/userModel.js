const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const Customer = sequelize.define("customers", {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Customer;







// module.exports=(sequelize, Sequelize)=>{
//     const customers=sequelize.define("customer",{
//         name:{
//             type:Sequelize.STRING
//         },
//         email:{
//             type:Sequelize.STRING,
//             primaryKey:true
//         },
//         age:{
//             type:Sequelize.INTEGER
//         }
//     });
//     return customers
// }