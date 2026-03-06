require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');



const app=express();

//Middleware
app.use(cors({
    origin:"https://rgu-eight.vercel.app",
    credentials:true
}));
app.use(express.json());//handle json data

const mongoURI=process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ritika_udyog"
//MongoDB Connection
mongoose.connect(mongoURI)
.then(()=>console.log("Database Connected!"))
.catch(err=>console.log("DB Connection Error:",err));

//Routes
app.use('/api/employees',require('./routes/employeeRoutes'));
app.use('/api/items',require('./routes/itemRoutes'));
app.use('/api/work-entries',require('./routes/workRoutes'));
app.use('/api/auth',require('./routes/authRoutes'));

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});
//employee  69639417ce931d81ef15df76
//item  69638a1ad06cdd957691badf