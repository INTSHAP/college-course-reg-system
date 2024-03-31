const Joi = require('joi');
const { objectId } = require('./custom.validation');

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
  courseRegistration,
  getStudentCourses,
  unregisterCourse,
};
