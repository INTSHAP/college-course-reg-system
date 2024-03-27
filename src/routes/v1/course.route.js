const express = require('express');
const courseController = require('../../controllers/course.controller');
const courseValidation = require('../../validations/course.validation');

const router = express.Router();

router
  .route('/')
  .get(courseValidation.getCourses, courseController.getAllCourses)
  .post(courseValidation.createCourse, courseController.createCourse);

router
  .route('/:courseId')
  .get(courseValidation.getCourse, courseController.getSingleCourse)
  .patch(courseValidation.updateCourse, courseController.updateCourse)
  .delete(courseValidation.deleteCourse, courseController.deleteCourse);

module.exports = router;
