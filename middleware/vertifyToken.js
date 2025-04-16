const httpStatusTest = require('../utils/httpStatusTest');
const appError = require('../utils/appError');
const jwt = require('jsonwebtoken');



const vertifyToken = (req, res,next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    
    if(!authHeader) {
        const error = appError(' token is required', 401, httpStatusTest.FAIL)
        return next(error);    
    };

    const token = authHeader.split(' ')[1];

    try{

       const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
       next();

    } catch(err){

        const error = appError('invalid token ', 401, httpStatusTest.FAIL);
        return next(error);

    };
};

module.exports = vertifyToken; 