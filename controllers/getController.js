const userModel=require("../models/userModel")

const getController=async(req,res)=>{

    try{
        console.log("getController is callingss");
        let data=await userModel.findAll()

        return res.status(200).send({
            data:data
        })
    }
    catch(error){
        console.error("Error in getController:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports=getController