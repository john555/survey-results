const path = require('path');

const env = process.env.NODE_ENV || 'production';
const secret = process.env.SECRET;
const passwordStorageFile = path.resolve(__dirname, 'survey-data', 'pwd-hash.json');
const port = process.env.PORT || 3001;

const config = {
  env,
  passwordStorageFile,
  secret,
  port,
  loginDuration: 3600,
};

module.exports = config;
