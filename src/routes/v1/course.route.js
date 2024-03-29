const express = require('express');
const courseController = require('../../controllers/course.controller');
const courseValidation = require('../../validations/course.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(validate(courseValidation.getCourses), courseController.getAllCourses)
  .post(auth(), validate(courseValidation.createCourse), courseController.createCourse);

router
  .route('/:courseId')
  .get(validate(courseValidation.getCourse), courseController.getSingleCourse)
  .patch(auth('manageCourses'), validate(courseValidation.updateCourse), courseController.updateCourse)
  .delete(auth('manageCourse'), validate(courseValidation.deleteCourse), courseController.deleteCourse);

module.exports = router;
