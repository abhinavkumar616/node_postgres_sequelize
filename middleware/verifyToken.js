const jwt=require("jsonwebtoken")

const verifyToken=async(req,res,next)=>{

    let token=req.headers.authorization
    if(!token){
        return res.status(404).send({
            message:"token not found"
        })
    }

    // Check if the token starts with 'Bearer '
    if (!token.startsWith('Bearer ')) {
        return res.status(403).send({
            message: "Invalid token format. Token must be in 'Bearer <token>' format."
        });
    }

    // Remove 'Bearer ' from token string
    token = token.slice(7);

    jwt.verify(token,"secret",(err,user)=>{
        if(err){
            return res.status(403).send({
                message:"You are not Authorized"
            })
        }
        req.user=user
        console.log("req.user----",req.user);
        next()
    })

}
module.exports=verifyToken