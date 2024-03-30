const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFaculty = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const addFacultyDepartment = {
  params: Joi.object().keys({
    facultyId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    department: Joi.string().custom(objectId),
  }),
};

const deleteFacultyDepartment = {
  params: Joi.object().keys({
    facultyId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    department: Joi.string().custom(objectId),
  }),
};

const getFaculties = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFaculty = {
  params: Joi.object().keys({
    facultyId: Joi.string().custom(objectId),
  }),
};

const updateFaculty = {
  params: Joi.object().keys({
    facultyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
    })
    .min(1),
};

const deleteFaculty = {
  params: Joi.object().keys({
    facultyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
  addFacultyDepartment,
  deleteFacultyDepartment,
};
