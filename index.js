const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const coursesRouter = require('./routes/courses.rout');
const httpStatusTest = require('./utils/httpStatusTest');
const cors = require('cors');
const userRouter = require('./routes/user.rout');
const loginRouter = require('./routes/user.rout');
const path = require('path');


mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
});

app.use(cors());

app.use(express.json()); 

app.use('/api/courses', coursesRouter);

app.use('/api/users', userRouter);

app.use('/api/users/login', loginRouter);

app.use('/uploads' , express.static(path.join(__dirname,'uploads')));
const appError = require('./utils/appError');

app.all('*', (req, res, next) => {
    next(appError('Route not found', 404, httpStatusTest.ERROR));
});


app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || httpStatusTest.ERROR,
        message: error.message || 'An error occurred',
        code: error.statusCode || 500,
        data: null
    });
});


app.listen(process.env.PORT , ()=>{
console.log('Server is running on port 5001');
});