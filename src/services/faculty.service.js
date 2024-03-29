const httpStatus = require('http-status');
const { Faculty } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create faculty
 * @param {Object} facultyBody
 * @returns {Promise<Faculty>}
 */
const createFaculty = async (facultyBody) => {
  // create faculty instance
  const existingFaculty = await Faculty.findOne({ code: facultyBody.name });
  if (existingFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty already exist');
  }
  const faculty = await Faculty.create({ ...facultyBody });
  return faculty;
};

/**
 * Add departments
 * @param {Object} departmentNameList
 * @returns {Promise<[string]>}
 */
const addFacultyDepartments = async (departmentNameList, facultyId) => {
  // add departments names to faculty
  const existingFaculty = await Faculty.findOne({ _id: facultyId });
  if (!existingFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty does already exist');
  }
  const addedDepartments = existingFaculty.departments.addToSet(...departmentNameList);
  await existingFaculty.save();
  return addedDepartments;
};

const clearFacultyDepartments = async (facultyId) => {
  const existingFaculty = await Faculty.findOne({ _id: facultyId });
  if (!existingFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty does already exist');
  }
  const { departments } = existingFaculty;
  existingFaculty.departments = [];
  await existingFaculty.save();
  return departments;
};

/**
 * Update faculty
 * @param {Object} facultyBody
 * @returns {Promise<Faculty>}
 */
const updateFaculty = async (facultyBody, facultyId) => {
  // update faculty with a given ID
  const existingFaculty = await Faculty.findOne({ _id: facultyId });
  if (!existingFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Faculty with ${facultyId} ID not found`);
  }

  existingFaculty.name = facultyBody.name;
  await existingFaculty.save();
  return existingFaculty;
};

/**
 * Delete faculty
 * @param {ObjectID} facultyID
 * @returns {Promise<Faculty>}
 */
const deleleFaculty = async (facultyId) => {
  // delete  with a given ID
  const existingFaculty = await Faculty.findOne({ _id: facultyId });
  if (!existingFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Faculty with ${facultyId} ID not found`);
  }

  await existingFaculty.remove();
  return existingFaculty;
};

/**
 * Get single faculty
 * @param {ObjectID} facultyID
 * @returns {Promise<Faculty>}
 */
const getSingleFaculty = async (facultyId) => {
  // Get faculty with a given ID
  const faculty = await Faculty.findOne({ _id: facultyId });
  return faculty;
};

/**
 * Get all faculties
 * @returns {Promise<Faculty[]>}
 */
const getFaculties = async (options) => {
  // Get list of paginated faculties
  const faculties = await Faculty.find({})
    .limit(options.limit)
    .skip((options.page - 1) * options.limit);
  const count = await Faculty.count();
  return { faculties, totalPages: Math.ceil(count / options.limit), currentPage: options.page };
};

module.exports = {
  createFaculty,
  updateFaculty,
  deleleFaculty,
  getSingleFaculty,
  getFaculties,
  addFacultyDepartments,
  clearFacultyDepartments,
};
