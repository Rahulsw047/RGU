const mongoose=require('mongoose');

const workEntrySchema= new mongoose.Schema({
    employeeId: {type: mongoose.Schema.Types.ObjectId,ref: 'Employee',required:true},
    itemId: {type: mongoose.Schema.Types.ObjectId, ref:'Item',required:true},
    quantity: {type:Number, required: true,min:1},
    date: {type: Date, default:Date.now},
    totalAmount:{type:Number,required:true}//quantity*item.ratePerPiece
});

module.exports=mongoose.model('WorkEntry', workEntrySchema);