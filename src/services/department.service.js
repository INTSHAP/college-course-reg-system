const httpStatus = require('http-status');
const Department = require('../models/department.model');
const ApiError = require('../utils/ApiError');

/**
 * Create Department
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const createDepartment = async (departmentBody) => {
  // create Department instance
  const existingDepartment = await Department.find({ name: departmentBody.name });

  if (existingDepartment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department already exist');
  }
  const department = await Department.create({ ...departmentBody });
  return department;
};

/**
 * Update Department
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const updateDepartment = async (departmentBody, departmentId) => {
  // update Department with a given ID
  const existingDepartment = await Department.findOne({ _id: departmentId });
  if (!existingDepartment) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Department with ${departmentId} ID not found`);
  }

  existingDepartment.title = departmentBody.name;
  existingDepartment.faculty = departmentBody.faculty;
  await existingDepartment.save();
  return existingDepartment;
};

/**
 * Update Department
 * @param {ObjectID} departmentID
 * @returns {Promise<Department>}
 */
const deleleDepartment = async (departmentId) => {
  // delete Department with a given ID
  const existingDepartment = await Department.findOne({ _id: departmentId });
  if (!existingDepartment) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Department with ${departmentId} ID not found`);
  }

  await existingDepartment.remove();
  return existingDepartment;
};

/**
 * Get single Department Department
 * @param {ObjectID} DepartmentID
 * @returns {Promise<Department>}
 */
const getSingleDepartment = async (departmentId) => {
  // Get Department with a given ID
  const department = await Department.findOne({ _id: departmentId });
  return department;
};

/**
 * Get all Department Department
 * @returns {Promise<Department[]>}
 */
const getAllDepartments = async (options) => {
  // Get list of paginated Departments
  const Departments = await Department.find({})
    .limit(options.limit)
    .skip((options.page - 1) * options.limit);
  const count = Department.count();
  return { Departments, totalPages: Math.ceil(count / options.limit), currentPage: options.page };
};

module.exports = {
  createDepartment,
  updateDepartment,
  deleleDepartment,
  getSingleDepartment,
  getAllDepartments,
};
