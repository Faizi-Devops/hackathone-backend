const { userModel } = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const userRegister = async (req, res) => {
    const { name, email, password, password_confirmation } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.send({
                "status": "failed",
                "message": "Email already exists"
            });
        }

        if (name && email && password && password_confirmation) {
            if (password === password_confirmation) {
                const salt = await bcrypt.genSalt(12);
                const hashpassword = await bcrypt.hash(password, salt);
                const newUser = new userModel({
                    name: name,
                    email: email,
                    password: hashpassword
                });
                await newUser.save();
                const saved_user = await userModel.findOne({
                    email:email
                })
                const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECURITY_KEY,{expiresIn:"1d"})
                return res.status(201).send({
                    "status": "success",
                    "message": "User registered successfully",
                    "token":token
                });
            } else {
                return res.send({
                    "status": "failed",
                    "message": "Password and confirm password don't match"
                });
            }
        } else {
            return res.send({
                "status": "failed",
                "message": "All fields are required"
            });
        }
    } catch (error) {
        console.error(error);
        return res.send({
            "status": "failed",
            "message": "Unable to register"
        });
    }
};

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        
        if(email && password){
            const user = await userModel.findOne({email:email});
            if(user !== null){
                const isMatch = await bcrypt.compare(password,user.password)

                if(user.email === email &&isMatch){
                    const token = jwt.sign({userID:user._id},process.env.JWT_SECURITY_KEY,{expiresIn:"1d"})
                    res.send({
                        "status":"success",
                        "message":"Login successfully",
                        "Token":token
                    })

                }
                else{
                    res.send({
                        "status":"failed",
                        "message":'Email or password is not match'
                    })
                }

            }
            else{
                res.send({
                    status:"failed",
                    message:"You are not a register user"
                })
            }

        }
        else{
            res.send({
                "status":"failed",
                "message":"All fields are required"
            })
        }
        
    } catch (error) {
        console.log(error)
        res.send({
            "status":"failed",
            "message":"Unable to Login"
        })
        
    }

}

const changePassword = async(req,res)=>{
    const {password ,password_confirmation} = req.body;
    if(password && password_confirmation){
        if(password !== password_confirmation){
            res.send({
                "status":"failed",
                "message":"Password and confirm password does't match"
            })

        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password,salt)
        }

    }
    else{
        res.send({
            "status":"failed",
            "message":"All fields are required"
        })
    }

}

module.exports = {
    userRegister,
    loginUser,
    changePassword
};