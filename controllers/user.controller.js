const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/user.model');
const httpStatusTest = require('../utils/httpStatusTest')
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const genrateJWT = require('../utils/gerateJWT');

const getAllUsers =asyncWrapper( async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page ||1;
  const skip = (page-1) * limit;
  const users = await User.find({},{"__v":false , "password":false}).limit(limit).skip(skip);
    res.json({status: httpStatusTest.SUCCESS, data:{users}});
}); 

const register =asyncWrapper( async(req,res,next) => {
  const {firstName, lastName, email, password, role,avatar} = req.body;
  const oldUser = await User.findOne({email: email});
  if(oldUser){
  const error = appError('user already exist', 400, httpStatusTest.FAIL)
  return  next(error);
            }

  // password hashing  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({
    firstName,
    lastName,
     email,
    password: hashedPassword,
    role,
    avatar : req.file.filename
     })

     //gerate token
     const token =await genrateJWT({email: newUser.email, id : newUser.id,role : newUser.role});
    newUser.token = token;

     await newUser.save();
       return res.json({ status: httpStatusTest.SUCCESS, data: { newUser } });
      

});

const login =asyncWrapper(async (req,res,next) => {
  const {email, password} = req.body;
  if(!email && !password){
    const error = appError('Please provide email and password', 400, httpStatusTest.FAIL)
    return  next(error);
  }
  const user = await User.findOne({email: email});
  if(!user){
    const error = appError('User not found', 400, httpStatusTest.FAIL)
    return  next(error);  
   
  }
  const matchPassword =await bcrypt.compare(password, user.password);


  if(user && matchPassword){
    const token = await genrateJWT({email: user.email, id : user.id, role : user.role})
    return res.json({status: httpStatusTest.SUCCESS, data: {token}});
  }else {
    const error = appError('Invalid email or password', 401, httpStatusTest.FAIL)
    return  next(error);   
  }
  });

module.exports ={
    getAllUsers,
    register,
    login,
};