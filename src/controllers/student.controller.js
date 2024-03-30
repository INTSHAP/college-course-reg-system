const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');
const pick = require('../utils/pick');

const createStudent = catchAsync(async (req, res) => {
  // add student service
  const student = await studentService.createStudent(req.user._id, req.body);
  res.status(httpStatus.OK).json({ student, message: 'student registered' });
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.updateStudent(req.body, req.user._id);
  res.status(httpStatus.OK).json({ student, message: 'student updated' });
});

const deleteStudent = catchAsync(async (req, res) => {
  const student = await studentService.deleteStudent(req.params.studentId);
  res.status(httpStatus.OK).json({ student, message: 'student deleted' });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const student = await studentService.getSingleStudent(req.params.studentId);
  res.status(httpStatus.OK).json({ student });
});

const getAllStudents = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page']);
  const result = await studentService.getAllStudents(options);
  res.status(httpStatus.OK).json({ ...result });
});

module.exports = {
  createStudent,
  deleteStudent,
  updateStudent,
  getAllStudents,
  getSingleStudent,
};
