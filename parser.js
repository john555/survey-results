const fs = require('fs');

const questions = require('./survey-data/survey_questions.json');
const responses = require('./survey-data/survey_responses.json');

const skiptFile = './survey-data/skipt.txt';
const blacklist = fs.readFileSync(skiptFile, { encoding: 'utf8' }).split('\n');

for (let key in responses) {
  if (!responses.hasOwnProperty(key) || blacklist.indexOf(key) > -1) {
    continue;
  }
  console.log( `Question ${key}: ${questions[key]}`, '\n', responses[key]);
  // break;
}
