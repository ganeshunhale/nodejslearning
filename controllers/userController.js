const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const User = require("../models/userModel");
//des register user 
//rotes GET /api/user/register
//access public
const registserUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body
    if(!username||!email||!password){
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("user already registered !")
    }
    //hashed pass
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("hashed pass ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error("user data uss not valid")
    }
    
    res.json({message:"register the user"})
});
//des Login user 
//rotes post /api/user/login
//access public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({message:"login user"})
});
//des Current user info
//rotes post /api/user/current
//access public
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message: "current user information"})
});

  module.exports ={registserUser,loginUser,currentUser}