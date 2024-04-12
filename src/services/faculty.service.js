const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Department, Faculty } = require('../models');

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
 * Add department
 * @param {Object} departmentId
 * @returns {Promise<departmentId>}
 */
const addFacultyDepartment = async (departmentId, facultyId) => {
  // add departments names to faculty
  const existingFaculty = await Faculty.findOne({ _id: facultyId });
  if (!existingFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty not found');
  }

  const existingDepartment = await Department.findOne({ _id: departmentId });
  if (!existingDepartment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department not found');
  }
  const addedDepartment = existingFaculty.departments.addToSet(departmentId);
  await existingFaculty.save();
  return addedDepartment[0];
};

/**
 * Remove department from a faculty
 * @param {Object} departmentId
 * @returns {Promise<departmentId>}
 */
const deleteFacultyDepartment = async (departmentId, facultyId) => {
  const existingFaculty = await Faculty.findOne({ _id: facultyId });
  if (!existingFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty does not already exist');
  }

  const existingDepartment = await Department.findOne({ _id: departmentId });
  if (!existingDepartment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department does not already exist');
  }

  existingFaculty.departments.pop(departmentId);
  await existingFaculty.save();
  return departmentId;
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
  const faculty = await Faculty.findOne({ _id: facultyId }).populate('departments');
  return faculty;
};

/**
 * Get all faculties
 * @returns {Promise<Faculty[]>}
 */
const getFaculties = async (options) => {
  // Get list of paginated faculties
  const faculties = await Faculty.find({})
    .populate('departments')
    .limit(options.limit)
    .skip((options.page - 1) * options.limit);
  const count = await Faculty.countDocuments();
  return { faculties, totalPages: Math.ceil(count / options.limit), currentPage: options.page };
};

module.exports = {
  createFaculty,
  updateFaculty,
  deleleFaculty,
  getSingleFaculty,
  getFaculties,
  addFacultyDepartment,
  deleteFacultyDepartment,
};
