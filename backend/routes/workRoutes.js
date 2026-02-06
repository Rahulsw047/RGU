const express=require('express');
const router=express.Router();
const WorkEntry=require('../models/WorkEntry');
const Item=require('../models/Item');

router.post('/',async(req,res)=>{
    try {
        const {employeeId,itemId,quantity,date}=req.body;
        //basic validation
        if(!employeeId||!itemId||!quantity){
            return res.status(400).json({message:"Employee, Item aur Quantity zaroori hai."});
        }
        //item ka rate pata karna
        const item=await Item.findById(itemId);
        if(!item){
            return res.status(404).json({message:"Item nahi mila."});
        }
        //Total amount calculate karna
        const totalAmount=item.ratePerPiece*quantity;
        
        //nayi entry banana
        const newEntry=new WorkEntry({
            employeeId,
            itemId,
            quantity,
            totalAmount,
            date:date||Date.now()
        });
        //SAVE KARNA
        await newEntry.save();

        res.status(201).json({
            message:"Entry added Successful!",
            entry:newEntry
        });

    } catch (error) {
        console.error("Error adding work entry:",error);
        res.status(500).json({message:"Server Error, entry nahi hui."});        
    }
});

module.exports=router;