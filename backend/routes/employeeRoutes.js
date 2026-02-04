const express = require('express');
const router=express.Router();
const Employee=require('../models/Emplyoees');

router.post('/',async(req,res)=>{
    //req->request se aaya data
    //res->response bhejana
    try{
        const{name,ratePerPiece,phone}=req.body;
        if(!name||!ratePerPiece){
            return res.status(400).json({message:"Naam aur Rate Bharna zaroori hai!"});
        }

        const newEmployee=new Employee({
            name:name,
            ratePerPiece:ratePerPiece,
            phone:phone
        });

        const savedEmployee=await newEmployee.save();

        res.status(201).json({
            message:"Employee added successful!!",
            employee:savedEmployee
        });

    }catch(error){
        console.error("Error adding employee:",error);
        res.status(500).json({message:"Server Error, employee add nahi hua."});
    }
});

router.get('/',async(req,res)=>{
    try {
        const employees=await Employee.find().sort({name:1});
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:",error);
        res.status(500).json({message:"Server Error, list nahi mili."});
    }
});

router.put('/update/:id',async(req,res)=>{
    try {
        const employeeId=req.params.id;
        const updates=req.body;
        const updateEmployee=await Employee.findByIdAndUpdate(
          employeeId,
          updates,
          {new:true}  
        );
        if(!updateEmployee){
            return res.status(404).json({message:"Employee nahi mila"});
        }

        res.status(200).json({
            message:"Employee updated successful!",
            employee:updateEmployee
        });
    } catch (error) {
        console.error("Error Updating Employee:",error);
        res.status(500).json({message:"Server Error,Update nahi hua"});
    }
});

router.delete('/delete/:id',async(req,res)=>{
    try {
        const employeeId=req.params.id;
        //find and delete
        const deletedEmployee=await Employee.findByIdAndDelete(employeeId);

        if(!deletedEmployee){
            return res.status(404).json({message:"Employee nahi mila jise delete karna tha"});
        }

        res.status(200).json({
            message:"Employee delete ho gaya!",
            id:deletedEmployee._id
        });
    } catch (error) {
        console.error("Error Delete Employee:",error);
        res.status(500).json({message:"Server Error,Delete nahi hua"});
    }
});
module.exports=router;