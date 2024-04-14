const express = require('express');
const courseRegistrationController = require('../../controllers/courseRegistration.controller');
const courseRegistrationValidation = require('../../validations/courseRegistration.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/:studentId')
  .post(auth(), validate(courseRegistrationValidation.courseRegistration), courseRegistrationController.courseRegistration);

router
  .route('/:studentId')
  .get(auth(), validate(courseRegistrationValidation.getStudentCourses), courseRegistrationController.getStudentCourses);

router
  .route('/:studentId/course/:courseId')
  .get(auth(), validate(courseRegistrationValidation.getStudentCourse), courseRegistrationController.getStudentCourse);

router
  .route('/:studentId/unregister/:courseId')
  .delete(
    auth('manageCourseRegistrations'),
    validate(courseRegistrationValidation.unregisterCourse),
    courseRegistrationController.unregisterCourse
  );

module.exports = router;
