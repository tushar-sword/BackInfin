const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');// Allow cross-origin requests
const userRoutes = require('./routes/user.routes'); // Import user routes

const connectDB = require('./db/db'); 
connectDB(); // Connect to MongoDB
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes); // Use user routes for API

module.exports = app;

