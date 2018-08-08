const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const { formatData } = require('./helpers');
const questions = require('./survey-data/survey_questions.json');
const responses = require('./survey-data/survey_responses.json');
const summary = require('./survey-data/summary.json');

const skiptFile = './survey-data/skipt.txt';
const margedFile = './survey-data/merge.txt';
const blacklist = fs.readFileSync(skiptFile, { encoding: 'utf8' }).split('\n');
const merges = fs.readFileSync(margedFile, { encoding: 'utf8' }).split('\n');
const outputFile = path.resolve(__dirname, 'survey-data', 'survey-data.json');

let surveyData = [];

surveyData.push(summary);

// merge some answers that are related
let mergedOutput = {};

for (const key in merges) { // ['1 75 ', '']

  const merge = merges[key].split(' ');

  // empty line
  if (merge.length == 1 && merge.indexOf('') > -1) { 
    continue;
  }

  for(const skey in merge) { // '1', '75']
    const value = merge[skey];

    // remove empty strings
    if (value.trim() === '') {
      continue;
    }
    mergedOutput = _.merge(mergedOutput, responses[value]);
  }
  // console.log(mergedOutput);
  // add merged data to output
  const qtnNumber = merge[0];
  const qtn = questions[qtnNumber].split(':')[1];
  const mergedData = formatData(qtnNumber, qtn, mergedOutput);

  surveyData.push(mergedData)
}

for (let key in responses) {
  if (!responses.hasOwnProperty(key) || blacklist.indexOf(key) > -1) {
    continue;
  }

  const d = formatData(key, questions[key], responses[key]);
  surveyData.push(d);
}

// Sort the data in ascending order of question number
surveyData = surveyData.sort((a, b) => +a.questionNumber - +b.questionNumber);

fs.writeFileSync(outputFile, JSON.stringify(surveyData), {encoding: 'utf8'});

// Defn: surveyData
//
// [{
//   questionNumber: 0,
//   question: '',
//   responses: {
//        group: '',
//        responses: [
//          {
//            label: ''
//            value: 0,
//          }
//        ],
//   }]
// }]
