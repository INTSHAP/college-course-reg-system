const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const courseRegistrationService = require('../services/courseRegistration.service');

const courseRegistration = catchAsync(async (req, res) => {
  const data = req.body;
  const courseRegistered = await courseRegistrationService.courseRegistration(req, data);
  res.status(httpStatus.OK).json({ courseRegistered, message: 'Course Registered' });
});

const getStudentCourses = catchAsync(async (req, res) => {
  const registeredCourses = await courseRegistrationService.getStudentCourses(req.params.studentId);
  res.status(httpStatus.OK).json({ registeredCourses });
});

const getStudentCourse = catchAsync(async (req, res) => {
  const studentCourses = await courseRegistrationService.getStudentCourse(req.params.studentId, req.params.courseId);
  res.status(httpStatus.OK).json(studentCourses);
});

const unregisterCourse = catchAsync(async (req, res) => {
  const data = {
    course: req.params.courseId,
    student: req.params.studentId,
  };
  await courseRegistrationService.unregisterStudentCourse(data);
  res.status(httpStatus.OK).json({ message: 'Course Unregistered' });
});

module.exports = {
  courseRegistration,
  getStudentCourses,
  getStudentCourse,
  unregisterCourse,
};
