import PropTypes from 'prop-types';
import React, { Component } from 'react';
import restingImage from '../images/resting.svg';
import openingImage from '../images/attempting.svg';
import './styles.css';

class Smiley extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick && this.props.onClick(event);
  }

  render() {
    let src;


   if (this.props.isOpening) {
      src = openingImage;
    } else {
      src = restingImage;
    }

    return (
      <button
        className={`avatar ${this.props.className}`}
        onClick={this.handleClick}
      >
        <img src={src} className="avatar__image" alt="icon" />
      </button>
    );
  }
}

Smiley.defaultProps = {
  className: '',
  hasWon: false,
  isOpening: false,
  isGameOver: false,
  onClick() {}
};

Smiley.propTypes = {
  className: PropTypes.string,
  hasWon: PropTypes.bool,
  isOpening: PropTypes.bool,
  isGameOver: PropTypes.bool,
  onClick: PropTypes.func
};

export default Smiley;
