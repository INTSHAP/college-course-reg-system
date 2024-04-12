const httpStatus = require('http-status');
const { CourseRegistration } = require('../models');
const ApiError = require('../utils/ApiError');

const courseRegistration = async (data) => {
  const course = await CourseRegistration.find({ student: data.student, course: data.course });

  if (!course) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course Already Registered');
  }

  const courseRegistered = await CourseRegistration.create({ ...data });

  return courseRegistered;
};

const getStudentCourses = async (studentId) => {
  const studentCourses = await CourseRegistration.find({ student: studentId }).populate('course');

  return studentCourses;
};
const getStudentCourse = async (studentId, courseId) => {
  const studentCourses = await CourseRegistration.findOne({ student: studentId, course: courseId }).populate('course');

  return studentCourses;
};

const unregisterStudentCourse = async (data) => {
  const unRegisterCourse = await CourseRegistration.findOneAndRemove({ student: data.student, course: data.course });

  if (!unRegisterCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course Not Registered');
  }

  return unRegisterCourse;
};

module.exports = {
  courseRegistration,
  getStudentCourses,
  unregisterStudentCourse,
  getStudentCourse,
};
