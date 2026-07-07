const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const Companyroutes = require('./routes/Companyroutes');
const applicationroutes = require('./routes/applicationroutes');
const cookieParser = require('cookie-parser');


const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();


// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', Companyroutes);
app.use('/api/applications',applicationroutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Job Portal API');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
