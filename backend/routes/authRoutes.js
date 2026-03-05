const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

router.post('/register', async(req,res)=>{
    try{
        const {name, username,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({name,username, password:hashedPassword});
        await newUser.save();
        res.json({message:"Admin Registration Successfully!"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

//Login Page
router.post('/login',async(req,res)=>{
    try{
        const {username, password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({message:"User nahi mila!"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Password galat hai!"});
        }

        const token=jwt.sign({id:user._id},"RAHUL_SECRET_KEY",{expiresIn:'1d'});
        res.json({token, user:{name:user.name, username:user.username}});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;