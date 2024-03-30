const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { departmentService } = require('../services');
const pick = require('../utils/pick');

const createDepartment = catchAsync(async (req, res) => {
  // add department service
  const department = await departmentService.createDepartment(req.body);
  res.status(httpStatus.OK).json({ department, message: 'Department created' });
});

const updateDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.updateDepartment(req.params.departmentId, req.body);
  res.status(httpStatus.OK).json({ department, message: 'Department updated' });
});

const deleteDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.deleleDepartment(req.params.departmentId);
  res.status(httpStatus.OK).json({ department, message: 'Department deleted' });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.getSingleDepartment(req.params.departmentId);
  res.status(httpStatus.OK).json({ department });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page']);
  const result = await departmentService.getAllDepartments(options);
  res.status(httpStatus.OK).json({ ...result });
});

module.exports = {
  createDepartment,
  updateDepartment,
  getAllDepartments,
  getSingleDepartment,
  deleteDepartment,
};
