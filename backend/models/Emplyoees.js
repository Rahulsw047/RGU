const mongoose= require('mongoose');
//Schema Design
const employeeSchema=new mongoose.Schema({
    name:{type:String, required: true},
    phone:{type:String},
    joiningDate:{type:Date, default:Date.now},
    ratePerPiece:{type:Number,default:0}
    
});

module.exports=mongoose.model('Employee',employeeSchema);
