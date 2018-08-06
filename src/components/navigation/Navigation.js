import React from 'react';
import PropTypes from 'prop-types';

const Navigation = props => (
  <div className="navigation">
    <button
      onClick={props.disablePreviousButton? () => {} : props.previousButtonClick}
      className={`navigation__button ${props.disablePreviousButton? 'navigation__button--inactive' : ''}`}
    >
      <svg className="navigation__icon" viewBox="0 0 10 20">
        <path d="M9,1 L1,10, L9,19" />
      </svg>
    </button>
    <button
      onClick={props.disableNextButton ? () => {} : props.nextButtonClick}
     className={`navigation__button ${props.disableNextButton? 'navigation__button--inactive' : ''}`}
    >
      <svg className="navigation__icon" viewBox="0 0 10 20">
        <path d="M1,1 L9,10, L1,19" />
      </svg>
    </button>
  </div>
);

Navigation.defaultProps = {
  disablePreviousButton: false,
  disableNextButton: false,
};

Navigation.propTypes = {
  disablePreviousButton: PropTypes.bool,
  disableNextButton: PropTypes.bool,
  nextButtonClick: PropTypes.func.isRequired,
  previousButtonClick: PropTypes.func.isRequired,
};

export default Navigation;
