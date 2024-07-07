const express=require("express")
const customerController = require("../controllers/customerController")
const getController = require("../controllers/getController")
const loginController = require("../controllers/loginController")
const authentication=require("../middleware/verifyToken")
const updateController = require("../controllers/updateController")
const deleteController = require("../controllers/deleteController")

const router=express.Router()

router.post("/postData",customerController)
router.get("/getData",authentication,getController)
router.post("/login",loginController)
router.post("/update/:id",authentication,updateController)
router.delete("/delete/:id",authentication,deleteController)

module.exports=router