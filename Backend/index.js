const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const Companyroutes = require('./routes/Companyroutes');
const applicationroutes = require('./routes/applicationroutes');
const cookieParser = require('cookie-parser');
const path = require('path');


const app = express();


app.use(cors({
    origin:'https://jobportal-mkma.onrender.com',
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/users',userRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/companies',Companyroutes);
app.use('/api/applications',applicationroutes);



if(process.env.NODE_ENV === 'production'){

    const dirpath = path.resolve();

    app.use(express.static(
        path.join(dirpath,'frontend','dist')
    ));

    app.get('/*',(req,res)=>{
        res.sendFile(
            path.resolve(
                dirpath,
                'frontend',
                'dist',
                'index.html'
            )
        );
    });
}



app.get('/',(req,res)=>{
    res.send("Welcome to Job Portal API");
});


app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    });
});


const PORT = process.env.PORT || 5000;


connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err=>{
    console.log(err);
});