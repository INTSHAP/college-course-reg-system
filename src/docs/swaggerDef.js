const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'college-course-reg-system API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/INTSHAP/college-course-reg-system',
    },
  },
  servers: [
    {
      url:
        config.env === 'production'
          ? 'https://college-course-reg-system.onrender.com/v1'
          : `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
