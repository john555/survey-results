const path = require('path');

const outputFile = path.resolve(__dirname, 'survey-data', 'pwd-hash.json');

module.exports = {
  outputFile,
  loginDuration: 3600,
};
