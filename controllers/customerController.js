const Customer = require('../models/userModel');
const bcrypt=require("bcrypt")

const customerController = async (req, res) => {
    console.log("Controller is called");
    try {
        const { name, email, age, password } = req.body;
        if(!name || !email || !age || !password){
            return res.status(400).send({
                message:"Kindly Provide the all required Fields"
            })
        }
        if(password.length < 8){
            return res.status(400).send({
                 message:"Password length Should be 8 digits"
            })
        }
        // Check if email already exists
        const existingCustomer = await Customer.findOne({ where: { email } });
        if (existingCustomer) {
            return res.status(409).json({ message: "Duplicate email not allowed" });
        }

       // Hash the password and ensure it's awaited correctly
       const hashPassword = await bcrypt.hash(password, 10);
       console.log("hashPassword type:", typeof(hashPassword));  
        // Create new customer
        const newCustomer = await Customer.create({ name, email, age, password:hashPassword });

        // Respond with the newly created customer data
        return res.status(201).json({ data: newCustomer });
    } catch (error) {
        console.error("Error in customerController:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = customerController;