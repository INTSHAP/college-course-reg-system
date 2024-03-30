const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createStudent = {
  body: Joi.object().keys({
    department: Joi.string().custom(objectId),
    level: Joi.number().required(),
    faculty: Joi.string().custom(objectId).required(),
    semester: Joi.number().required(),
  }),
};

const getStudents = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      department: Joi.string().custom(objectId),
      level: Joi.number().required(),
      faculty: Joi.string().custom(objectId).required(),
      semester: Joi.number().required(),
    })
    .min(1),
};

const deleteStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStudent,
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
