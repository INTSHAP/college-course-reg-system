const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const courseService = require('../services/course.service');
const pick = require('../utils/pick');

const createCourse = catchAsync(async (req, res) => {
  // add course service
  const course = await courseService.createCourse(req.body);
  res.status(httpStatus.OK).json({ course, message: 'Course created' });
});

const updateCourse = catchAsync(async (req, res) => {
  const course = await courseService.updateCourse(req.params.courseId, req.body);
  res.status(httpStatus.OK).json({ course, message: 'Course updated' });
});

const deleteCourse = catchAsync(async (req, res) => {
  const course = await courseService.deleleCourse(req.params.courseId);
  res.status(httpStatus.OK).json({ course, message: 'Course deleted' });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const course = await courseService.getSingleCourse(req.params.courseId);
  res.status(httpStatus.OK).json({ course });
});

const getAllCourses = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page']);
  const result = await courseService.getAllCourses(options);
  res.status(httpStatus.OK).json({ ...result });
});

module.exports = {
  createCourse,
  deleteCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
};
