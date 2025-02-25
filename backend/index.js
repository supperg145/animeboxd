const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const supabase = require('./config/supabase');
require('dotenv').config();

//initialize express
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//routes
app.use('/api/users', userRoutes);

//Test supabase connection
app.get('/test-supabase', async (req, res) => {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    console.log("Supabase is connected")
    return res.status(200).json(data);
})

//Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

