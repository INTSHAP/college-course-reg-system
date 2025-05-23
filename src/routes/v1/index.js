const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const facultyRoute = require('./faculty.route');
const courseRoute = require('./course.route');
const departmentRoute = require('./department.route');
const studentRoute = require('./student.route');
const courseRegistrationRoute = require('./courseRegistration.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/faculties',
    route: facultyRoute,
  },
  {
    path: '/departments',
    route: departmentRoute,
  },
  {
    path: '/course-registrations',
    route: courseRegistrationRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development' || config.env === 'production') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
