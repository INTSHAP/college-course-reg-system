const httpStatus = require('http-status');
const { Course, Student } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 */
const createCourse = async (courseBody) => {
  // create course instance
  const existingCourse = await Course.findOne({ code: courseBody.code });
  if (existingCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course already exist');
  }
  const course = await Course.create({ ...courseBody });
  return course;
};

/**
 * Update course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 */
const updateCourse = async (courseBody, courseId) => {
  // update course with a given ID
  const existingCourse = await Course.findOne({ _id: courseId });
  if (!existingCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Course with ${courseId} ID not found`);
  }

  existingCourse.title = courseBody.title;
  existingCourse.code = courseBody.code;
  existingCourse.department = courseBody.department;
  existingCourse.faculty = courseBody.faculty;
  existingCourse.creditUnit = courseBody.creditUnit;
  await existingCourse.save();
  return existingCourse;
};

/**
 * Update course
 * @param {ObjectID} courseID
 * @returns {Promise<Course>}
 */
const deleteCourse = async (courseId) => {
  // delete course with a given ID
  const existingCourse = await Course.findOne({ _id: courseId });
  if (!existingCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Course with ${courseId} ID not found`);
  }

  await existingCourse.remove();
  return existingCourse;
};

/**
 * Get single course course
 * @param {ObjectID} courseID
 * @returns {Promise<Course>}
 */
const getSingleCourse = async (courseId) => {
  // Get course with a given ID
  const course = await Course.findOne({ _id: courseId });
  return course;
};

/**
 * Get all course course
 * @returns {Promise<Course[]>}
 */
const getAllCourses = async (options) => {
  // Get list of paginated courses
  const courses = await Course.find({})
    .limit(options.limit)
    .skip((options.page - 1) * options.limit);
  const count = Course.countDocuments();
  return { courses, totalPages: Math.ceil(count / options.limit), currentPage: options.page };
};

/**
 * Get all courses belong to a semester in a given
 * @returns {Promise<Course[]>}
 */
const getLevelSemesterCourses = async (user) => {
  // Get list of paginated courses
  const studentRegistration = await Student.findOne({ user: user._id });
  if (!studentRegistration) {
    throw new ApiError('Student not registered yet');
  }
  const courses = await Course.find({ semester: studentRegistration.semester, level: studentRegistration.level });
  return courses;
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getSingleCourse,
  getAllCourses,
  getLevelSemesterCourses,
};
