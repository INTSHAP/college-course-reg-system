const express = require('express');
const { departmentController } = require('../../controllers');
const { departmentValidation } = require('../../validations');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(validate(departmentValidation.getDepartment), departmentController.getAllDepartments)
  .post(auth(), validate(departmentValidation.createDepartment), departmentController.createDepartment);

router
  .route('/:departmentId')
  .get(validate(departmentValidation.getDepartment), departmentController.getSingleDepartment)
  .patch(auth(''), validate(departmentValidation.updateDepartment), departmentController.updateDepartment)
  .delete(auth(''), validate(departmentValidation.deleteDepartment), departmentController.deleteDepartment);

module.exports = router;
