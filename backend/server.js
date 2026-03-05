const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();


const app=express();

//Middleware
app.use(cors());
app.use(express.json());//handle json data


//MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ritika_udyog')
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