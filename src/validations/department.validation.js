const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDepartment = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    faculty: Joi.string().custom(objectId).required(),
  }),
};

const getDepartments = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDepartment = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId),
  }),
};

const updateDepartment = {
  params: Joi.object().keys({
    departmentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      faculty: Joi.string().custom(objectId).required(),
    })
    .min(1),
};

const deleteDepartment = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
