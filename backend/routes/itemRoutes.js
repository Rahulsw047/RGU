const express=require('express');
const router=express.Router();
const Item=require('../models/Item');
const { route } = require('./employeeRoutes');

router.post('/',async(req,res)=>{
    try{
        //body se data lena
        const {itemName,ratePerPiece}=req.body;
        //validation
        if(!itemName||!ratePerPiece){
            return res.status(400).json({message:"Item ka naam aur rate dono zaroori hain."});
        }
        //check karna ki kya yeh item pehle se hai ?
        const existingItem=await Item.findOne({itemName:itemName});
        if(existingItem){
            return res.status(400).json({message:"Yeh item pehle se list mein hai."});
        }

        //naya item banana
        const newItem=new Item({itemName,ratePerPiece});
        await newItem.save();

        res.status(201).json({
            message:"Item added successful!",
            item:newItem
        });

    }catch(error){
        console.error("Error adding item:",error);
        if(error.code==11000){
            return res.status(400).json({message:"Yeh item pehle se list mein hai."});
        }
        res.status(500).json({message:"Server Error, item add nahi hua."});
    }
});

router.get('/',async(req,res)=>{
    try{
        const items=await Item.find().sort({itemName:1});
        res.status(200).json(items);
    }catch(error){
        console.error("Error fetching items:",error);
        res.status(500).json({message:"Server Error, list nahi mili."});
    }
});

module.exports=router;