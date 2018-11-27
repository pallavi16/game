import React from 'react';
import PropTypes from 'prop-types';

function Timer({ seconds }) {
  let minutes = Math.floor(seconds / 60);
  let formattedSeconds = seconds - minutes * 60 || 0;

  if (formattedSeconds < 10) {
    formattedSeconds = `0${formattedSeconds}`;
  }

  return <span className="timer">{minutes}:{formattedSeconds}</span>;
}

Timer.defaultProps = {
  seconds: 0
};

Timer.propTypes = {
  seconds: PropTypes.number
};

export default Timer;
