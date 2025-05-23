const express = require('express');
const facultyController = require('../../controllers/faculty.controller');
const facultyValidation = require('../../validations/faculty.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(validate(facultyValidation.getFaculties), facultyController.getFaculties)
  .post(auth('manageFaculties'), validate(facultyValidation.createFaculty), facultyController.createFaculty);

router
  .route('/:facultyId')
  .get(validate(facultyValidation.getFaculty), facultyController.getFaculty)
  .patch(auth('manageFaculties'), validate(facultyValidation.updateFaculty), facultyController.updateFaculty)
  .delete(auth('manageFaculties'), validate(facultyValidation.deleteFaculty), facultyController.deleteFaculty);

router
  .route('/:facultyId/departments')
  .patch(auth('manageFaculties'), validate(facultyValidation.deleteFacultyDepartment), facultyController.deleteDepartment)
  .post(auth('manageFaculties'), validate(facultyValidation.addFacultyDepartment), facultyController.addDepartment);

module.exports = router;
