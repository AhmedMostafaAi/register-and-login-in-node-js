const appError = require('../utils/appError');
const httpStatusTest = require('../utils/httpStatusTest');


module.exports = (...roles) => {

    return (req , res , next) => {
        if(!roles.includes(req.currentUser.role)){
            const error = appError('Unauthorized', 401, httpStatusTest.FAIL);
            return next(error);
        }
        next();
    }
}
