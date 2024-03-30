const httpStatus = require('http-status');
const { Student, Department, Faculty } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create student
 * @param {Object} studentBody, userId
 * @returns {Promise<Student>}
 */
const createStudent = async (userId, studentBody) => {
  // create student instance

  const existingStudent = await Student.findOne({ _id: studentBody.student });
  if (existingStudent) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'student already exists');
  }

  const existingFaculty = await Faculty.findOne({ _id: studentBody.faculty });
  if (!existingFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty does not exist');
  }

  const existingDepartment = await Department.findOne({ _id: studentBody.department });
  if (!existingDepartment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department does not exist');
  }

  const student = await Student.create({ ...studentBody, user: userId });
  return student;
};

/**
 * Update student
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const updateStudent = async (studentBody, studentId) => {
  // update student with a given ID
  const existingStudent = await Student.findOne({ _id: studentId });
  if (!existingStudent) {
    throw new ApiError(httpStatus.BAD_REQUEST, `student with ${studentId} Id not found`);
  }
  const { faculty, semester, department, level } = studentBody;
  existingStudent.faculty = faculty;
  existingStudent.level = level;
  existingStudent.department = department;
  existingStudent.semester = semester;
  await existingStudent.save();
  return existingStudent;
};

/**
 * Update student
 * @param {ObjectID} studentID
 * @returns {Promise<Student>}
 */
const deleteStudent = async (studentId) => {
  // delete student with a given ID
  const existingStudent = await Student.findOne({ _id: studentId });
  if (!existingStudent) {
    throw new ApiError(httpStatus.BAD_REQUEST, `student with ${studentId} ID not found`);
  }

  await existingStudent.remove();
  return existingStudent;
};

/**
 * Get single student student
 * @param {ObjectID} studentID
 * @returns {Promise<Student>}
 */
const getSingleStudent = async (studentId) => {
  // Get student with a given ID
  const student = await Student.findOne({ _id: studentId });
  return student;
};

/**
 * Get all student student
 * @returns {Promise<Student[]>}
 */
const getAllStudents = async (options) => {
  // Get list of paginated students
  const students = await Student.find({})
    .limit(options.limit)
    .skip((options.page - 1) * options.limit);
  const count = Student.count();
  return { students, totalPages: Math.ceil(count / options.limit), currentPage: options.page };
};

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getSingleStudent,
  getAllStudents,
};
