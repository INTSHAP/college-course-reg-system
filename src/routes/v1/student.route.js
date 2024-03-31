const express = require('express');
const { studentController } = require('../../controllers');
const { studentValidation } = require('../../validations');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth('manageStudents'), validate(studentValidation.getStudents), studentController.getAllStudents)
  .post(auth(), validate(studentValidation.createStudent), studentController.createStudent);

router
  .route('/:studentId')
  .get(validate(studentValidation.getStudent), studentController.getSingleStudent)
  .patch(auth(), validate(studentValidation.updateStudent), studentController.updateStudent)
  .delete(auth('manageStudents'), validate(studentValidation.deleteStudent), studentController.deleteStudent);

module.exports = router;
