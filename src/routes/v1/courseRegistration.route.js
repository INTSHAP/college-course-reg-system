const express = require('express');
const courseRegistrationController = require('../../controllers/courseRegistration.controller');
const courseRegistrationValidation = require('../../validations/course.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/:studentId/register/:courseId')
  .post(auth(), validate(courseRegistrationValidation.courseRegistration), courseRegistrationController.courseRegistration);

router
  .route('/:studentId/courses')
  .get(auth(), validate(courseRegistrationValidation.getStudentCourses), courseRegistrationController.getStudentCourses);

router
  .route('/:studentId/unregister/:courseId')
  .delete(
    auth('manageCourseRegistrations'),
    validate(courseRegistrationValidation.unregisterCourse),
    courseRegistrationController.unregisterCourse
  );

module.exports = router;
