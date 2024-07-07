const userModel=require("../models/userModel")
const Sequelize = require('sequelize');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const loginController=async(req,res)=>{

    try{
        console.log("controller is callingsss");
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({
                message: "Please provide the user login details"
            });
        }

        const user = await userModel.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { name: username },
                    { email: username }
                ]
            }
        });

        // If user is not found, return an error
        if (!user) {
            return res.status(400).send({
                message: "Invalid login details"
            });
        }

        let isPasswordValid=await bcrypt.compare(password,user.password)

        if (!isPasswordValid) {
            return res.status(400).send({
                message: "Invalid login details"
            });
        }

        let token=jwt.sign({
            exp:Math.floor(Date.now()/1000)+(60*60),
            user:user
        },"secret")

        console.log("token",token);

        return res.status(200).send({
            message: "User logged in successfully",
            token,token
        });

    }
    catch(error){
        console.error("Error in loginController:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports=loginController