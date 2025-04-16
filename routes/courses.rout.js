const express = require('express');
const { body} = require('express-validator');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');
const verifyToken = require('../middleware/vertifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');
// CRUD ==> Create, read, update and delete
//get all courses  

router.route('/')
    .get(coursesController.getAllCourses)
    .post([
        body('name')
        .notEmpty()
        .withMessage('name course is required')
        ],coursesController.addCourse);


router.route('/:courseId')
    .get( coursesController.getCourse)
    .patch( coursesController.updateCourse)
    .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER) ,coursesController.deleteCourse);


module.exports = router;