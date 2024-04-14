const httpStatus = require('http-status');
const { CourseRegistration, Student } = require('../models');
const ApiError = require('../utils/ApiError');

const courseRegistration = async (req, data) => {
  const studentRegistration = await Student.findOne({ user: req.user._id });
  if (!studentRegistration) {
    throw new ApiError('Student is not registered yet');
  }
  const { semester, level, _id } = studentRegistration;
  const courseRegistered = await CourseRegistration.create({ ...data, semester, level, student: _id });
  return courseRegistered;
};

const getStudentCourses = async (studentId) => {
  const studentCourses = await CourseRegistration.find({ student: studentId }).populate('courses');
  return studentCourses;
};
const getStudentCourse = async (studentId, courseId) => {
  const studentCourses = await CourseRegistration.findOne({ student: studentId, course: courseId }).populate('courses');

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
