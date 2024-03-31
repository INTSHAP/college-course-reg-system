const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    code: Joi.string().required(),
    creditUnit: Joi.number().required(),
    faculty: Joi.string().custom(objectId).required(),
    department: Joi.string().required(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    courseId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      code: Joi.string().required(),
      creditUnit: Joi.string().required(),
      faculty: Joi.string().custom(objectId).required(),
      department: Joi.string().required(),
    })
    .min(1),
};

const deleteCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

const courseRegistration = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
    studentId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    fee: Joi.number().required(),
  }),
};

const getStudentCourses = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const unregisterCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
    studentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCourse,
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  courseRegistration,
  getStudentCourses,
  unregisterCourse,
};
