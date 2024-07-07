const userModel=require("../models/userModel")

const deleteController=async(req,res)=>{

    try{
        const{id}=req.params;
        let findData=await userModel.findByPk(id)
       
        if(!findData){
            return res.status(404).json({ message: "Id not found" });
        }

        let deleteData=await userModel.destroy({
           where:{id}
        })

        return res.status(200).json({
            message: "User Deleted successfully."
        });

    }
    catch(error){
        console.error("Error in deleteController:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

module.exports=deleteController