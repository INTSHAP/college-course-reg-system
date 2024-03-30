const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { facultyService } = require('../services');
const pick = require('../utils/pick');

const createFaculty = catchAsync(async (req, res) => {
  // add service to create faculty
  const faculty = await facultyService.createFaculty(req.body);
  res.status(httpStatus.CREATED).json({ faculty, message: 'Faculty created' });
});

const updateFaculty = catchAsync(async (req, res) => {
  // add service to update faculty with a given ID
  const faculty = await facultyService.updateFaculty(req.body, req.params.facultyId);
  res.status(httpStatus.OK).json({ faculty, message: 'Faculty updated' });
});

const deleteFaculty = catchAsync(async (req, res) => {
  // add service to delete faculty with a given ID
  const faculty = await facultyService.deleleFaculty(req.params.facultyId);
  res.status(httpStatus.OK).json({ faculty, message: 'Faculty deleted' });
});

const getFaculty = catchAsync(async (req, res) => {
  // add service to get faculty with a given ID
  const faculty = await facultyService.getSingleFaculty(req.params.facultyId);
  res.status(httpStatus.OK).json({ faculty });
});

const getFaculties = catchAsync(async (req, res) => {
  // add service to get all faculties
  const options = pick(req.query, ['limit', 'page']);
  const result = await facultyService.getFaculties(options);
  res.status(httpStatus.OK).json({ ...result });
});

const addDepartment = catchAsync(async (req, res) => {
  // Add departments to a faculty
  const addedDepartment = await facultyService.addFacultyDepartment(req.body.department, req.params.facultyId);
  res.status(httpStatus.OK).json({ addedDepartment });
});

const deleteDepartment = catchAsync(async (req, res) => {
  // clear departments from a faculty
  const deletedDepartment = await facultyService.deleteFacultyDepartment(req.body.department, req.params.facultyId);
  res.status(httpStatus.OK).json({ deletedDepartment });
});

module.exports = {
  createFaculty,
  deleteFaculty,
  updateFaculty,
  getFaculties,
  getFaculty,
  addDepartment,
  deleteDepartment,
};
