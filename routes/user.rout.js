const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');
const vertifyToken = require('../middleware/vertifyToken');
const multer = require('multer');
const appError = require('../utils/appError');
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
}); 
const fileFilter = (req, file,cb) => {
    const ext = file.mimetype.split('/')[0];
    if(ext === 'image'){
       return cb(null, true);
    } else {
       return cb(appError('file must be image',400), false);
    }
    
}

const upload = multer({
     storage: diskStorage,
     fileFilter
    });

router.route('/')
    .get(vertifyToken, usersController.getAllUsers);

router.route('/register')
    .post(upload.single('avatar'), usersController.register);

router.route('/login')
    .post(usersController.login);

module.exports = router;
