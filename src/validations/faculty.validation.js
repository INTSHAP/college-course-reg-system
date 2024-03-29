const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFaculty = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const addFacultyDepartments = {
  body: Joi.object().keys({
    names: Joi.array().items(Joi.string()).required(),
  }),
};

const clearFacultyDepartments = {
  params: Joi.object().keys({
    facultyId: Joi.string().custom(objectId),
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
  addFacultyDepartments,
  clearFacultyDepartments,
};
