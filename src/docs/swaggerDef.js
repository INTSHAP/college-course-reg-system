const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'college-course-reg-system API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/Timilehin-bello/college-course-reg-system',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
