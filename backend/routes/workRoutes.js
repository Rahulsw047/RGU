const express=require('express');
const router=express.Router();
const WorkEntry=require('../models/WorkEntry');
const Item=require('../models/Item');
const Emplyoees = require('../models/Emplyoees');

router.get('/',async(req,res)=>{
    try{
        const entries=await WorkEntry.find()
        .populate('employeeId','name')
        .populate('itemId','itemName');
        res.json(entries)
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>{
    try {
          console.log("Frontend se aaya data:",req.body);


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
        // //Total amount calculate karna
        const rate=item.ratePerPiece||0
        const totalAmount=Number(quantity)*Number(rate);
        
        //nayi entry banana
        const newEntry=new WorkEntry({
            employeeId:employeeId,
            itemId:itemId,
            quantity:quantity,
            totalAmount:totalAmount,
            date:date||Date.now()
        });
        //SAVE KARNA
        await newEntry.save();

        res.status(201).json({
            message:"Entry added Successful!",
            // entry:newEntry
        });

    } catch (error) {
        console.error("Error adding work entry:",error.message);
        res.status(500).json({message:"Server Error, entry nahi hui."});        
    }
});

router.get('/summary',async(req,res)=>{
    try{
        const summary=await WorkEntry.aggregate([
            {
                $group:{
                    _id:"$employeeId",
                    totalPieces:{$sum:"$quantity"},
                    totalAmount:{$sum:"$totalAmount"}
                }
            },
            {
                $lookup:{
                    from:"employees",
                    localField:"_id",
                    foreignField:"_id",
                    as:"worker"
                }
            },
            {
                $unwind:{
                    path:"$worker",
                    preserveNullAndEmptyArrays:true
                }
            }
        ]);
        res.json(summary);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/detailed-report', async(req,res)=>{
    const month=parseInt(req.query.month) || new Date().getMonth()+1;
    const year=parseInt(req.query.year) || new Date().getFullYear();


    const startDate=new Date(year, month-1,1);
    const endDate=new Date(year, month, 0,23,59,59);
    try{
        const report=await WorkEntry.aggregate([
            {
                $match:{
                    date:{$gte: startDate, $lte: endDate}
                }
            },
            {
                $lookup:{
                    from:"employees",
                    localField:"employeeId",
                    foreignField:"_id",
                    as:"worker"
                }
            },
            {
                $unwind:"$worker"
            },
            {
                $lookup:{
                    from:"items",
                    localField:"itemId",
                    foreignField:"_id",
                    as:"itemDetails"
                }
            },
                {
                    $unwind:"$itemDetails"
                },
                {
                    $group:{
                        _id:"$employeeId",
                        workerName:{$first:"$worker.name"},
                        entries:{
                            $push:{
                                date:"$date",
                                itemName:{$ifNull:["$itemDetails.itemName","Unknown Item"]},
                                quantity:"$quantity",
                                rate:{$divide:["$totalAmount", "$quantity"]},
                                total:"$totalAmount"
                            }
                        },
                        grandTotal:{$sum:"$totalAmount"}
                    }
                }
            
        ]);
        res.json(report);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        await WorkEntry.findByIdAndDelete(req.params.id);
        res.json({message:"Entry Delete Successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/stats',async(req,res)=>{
    try{
        const month=new Date().getMonth()+1;
        const year=new Date().getFullYear();
        const start=new Date(year,month-1,1);
        const end=new Date(year,month,0,23,59,59);

        const totalWorkersCnt=await Emplyoees.countDocuments();

        const monthlyStats=await WorkEntry.aggregate([
            {
                $match:{
                    date:{$gte:start,$lte:end}
                }
            },
            {
                $group:{
                    _id:null,
                    totalAmount:{$sum:"$totalAmount"},
                    monthlyEntries:{$sum:1}
                }
            }
        ]);

        res.json({
            totalWokers:totalWorkersCnt||0,
            monthlyEntries:monthlyStats[0]?.monthlyEntries||0,
            totalAmount:monthlyStats[0]?.totalAmount||0
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
module.exports=router;