const mongoose= require('mongoose');
//Schema Design
const employeeSchema=new mongoose.Schema({
    name:{type:String, required: true},
    phone:{type:String},
    ratePerPiece:{type: Number,required:true},
    joiningDate:{type:Date, default:Date.now}
    
});

module.exports=mongoose.model('Employee',employeeSchema);
