// let { courses } =require('../data/courses');
const { validationResult } = require('express-validator');
const Course = require('../models/course.model');
const httpStatusTest = require('../utils/httpStatusTest');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError'); // Now appError is a function
const mongoose = require('mongoose');


const getAllCourses =asyncWrapper( async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page ||1;
  const skip = (page-1) * limit;
  const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status: httpStatusTest.SUCCESS, data:{courses}});
});

const getCourse = asyncWrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
      return next(appError('Invalid course ID', 400, httpStatusTest.ERROR));
  }
  const course = await Course.findById(req.params.courseId);
  if (!course) {
      return next(appError('Course not found', 404, httpStatusTest.ERROR));
  }
  return res.json({ status: httpStatusTest.SUCCESS, data: { course } });
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return next(appError('Validation failed', 400, httpStatusTest.FAIL));
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json({ status: httpStatusTest.SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return next(appError('Invalid course ID', 400, httpStatusTest.ERROR));
  }
  const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: { ...req.body } },
      { new: true, runValidators: true } 
  );
  if (!updatedCourse) {
      return next(appError('Course not found', 404, httpStatusTest.ERROR));
  }
  return res.status(200).json({ status: httpStatusTest.SUCCESS, data: { course: updatedCourse } });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;

  // Ensure valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return next(appError('Invalid course ID', 400, httpStatusTest.ERROR));
  }

  const result = await Course.deleteOne({ _id: courseId });

  if (result.deletedCount === 0) {
      return next(appError('Course not found', 404, httpStatusTest.ERROR));
  }

  res.status(200).json({ status: httpStatusTest.SUCCESS, message: "Course deleted successfully", data: null });
});

  module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
  }

// const express = require('express'); 