import React from 'react';

const QuestionPlaceholder = () => (
  <div className="questionPlaceholder">
    <div className="questionPlaceholder__title">
      <span className="questionPlaceholder__numberWrapper pulseX"></span>
      <span className="questionPlaceholder__titleText pulseX" />
    </div>
    <div className="questionPlaceholder__answers">
      <div className="answer">
        <span className="questionPlaceholder__titleText pulseX" />
      </div>
      <div className="answer">
        <span className="questionPlaceholder__titleText pulseX" />
      </div>
    </div>
  </div>
);

export default QuestionPlaceholder;
