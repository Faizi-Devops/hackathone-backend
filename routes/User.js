const express = require("express");
const router = express.Router();
const {userRegister,loginUser,changePassword} = require("../controllers/User")


//Public Routes

// router.use("/changepassword",checkUserAuth)

router.post("/register",userRegister);
router.post("/login",loginUser);




//Protected Routes
router.post("/changepassword",changePassword)

module.exports = router;