const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const employeeRoutes=require('./routes/employeeRoutes');
const itemRoutes=require('./routes/itemRoutes');
const workRoutes=require('./routes/workRoutes');

const app=express();

//Middleware
app.use(cors());
app.use(express.json());//handle json data
app.use('/api/employees',employeeRoutes);
app.use('/api/items',itemRoutes);
app.use('/api/work',workRoutes);

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Database Connected!"))
.catch(err=>console.log("DB Connection Error:",err));

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log('Server running on port ${PORT}')
});
//employee  69639417ce931d81ef15df76
//item  69638a1ad06cdd957691badf