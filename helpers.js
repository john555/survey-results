function formatData(questionNumber, question, responses) {
  const responsesArray = [];
  for (let key in responses) {
    responsesArray.push({
      group: key,
      responses: responseToArray(responses[key])
    });
  }

  return {
    questionNumber,
    question,
    responses: responsesArray
  };
}

function responseToArray(response) {
  const result = [];
  for (let key in response) {
    result.push({
      label: key,
      value: response[key]
    })
  }
  return result;
}

module.exports = {
  formatData,
};
