const mongoose=require('mongoose');

const itemSchema= new mongoose.Schema({
    itemName:{type:String, required:true,unique:true},
    ratePerPiece: { type: Number, required:true}
},{timestamps:true});

module.exports=mongoose.model('Item',itemSchema);