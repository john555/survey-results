const fs = require('fs');
const path = require('path');

const {
  formatData,
} = require('./helpers');

const questions = require('./survey-data/survey_questions.json');
const responses = require('./survey-data/survey_responses.json');


const skiptFile = './survey-data/skipt.txt';
const blacklist = fs.readFileSync(skiptFile, { encoding: 'utf8' }).split('\n');

const surveyData = [];
const outputFile = path.resolve(__dirname, 'survey-data', 'survey-data.json')

for (let key in responses) {
  if (!responses.hasOwnProperty(key) || blacklist.indexOf(key) > -1) {
    continue;
  }

  const d = formatData(questions[key], responses[key]);
  surveyData.push(d);
}

fs.writeFileSync(outputFile, JSON.stringify(surveyData), {encoding: 'utf8'});

// Defn: surveyData
//
// [{
//   question: '',
//   responses: [{
//     group: '',
//     response: [{
//        group: '',
//        responses: [
//          {
//            label: ''
//            value: 0,
//          }
//        ],
//     }]
//   }]
// }]
