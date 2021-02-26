const path = require('path');

const ENV_FILE = {
  development: ".env.development",
  production: ".env.production",
  staging: ".env.staging"
};

require("dotenv").config({
  path: path.resolve(__dirname, '.env')
});
require("dotenv").config({
  path: path.resolve(__dirname, ENV_FILE[process.env.NODE_ENV || 'development'])
});
