const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/mongoose');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//initialize express
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/users', userRoutes);


//Start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})

