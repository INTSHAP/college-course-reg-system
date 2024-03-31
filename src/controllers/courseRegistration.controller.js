const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const courseRegistrationService = require('../services/courseRegistration.service');

const courseRegistration = catchAsync(async (req, res) => {
  const data = {
    course: req.params.courseId,
    student: req.params.studentId,
    fee: req.body.fee,
  };

  const courseRegistered = await courseRegistrationService.courseRegistration(data);
  res.status(httpStatus.OK).json({ courseRegistered, message: 'Course Registered' });
});

const getStudentCourses = catchAsync(async (req, res) => {
  const studentCourses = await courseRegistrationService.getStudentCourses(req.params.studentId);

  res.status(httpStatus.OK).json({ studentCourses });
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
  unregisterCourse,
};
