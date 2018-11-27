import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as appActionCreators from '../../store/actions/app';
import Toolbar from '../../components/toolbar';
import BoardContainer from '../board';
import './styles.css';

const TASK = Symbol();

//Heart of the game lies here.
//This renders the view of toolbar, board and the text displayed on the page
//Brings in various containers and renders them.

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpening: false
    };

    this.tick = this.tick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleCellBlur = this.handleCellBlur.bind(this);
    this.handleCellFocus = this.handleCellFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isTicking && nextProps.isTicking) {
      clearInterval(this[TASK]);
      this[TASK] = setInterval(this.tick, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this[TASK]);
  }

  handleCellFocus(_event) {
    this.setState({ isOpening: true });
  }

  handleCellBlur(_event) {
    this.setState({ isOpening: false });
  }

  handleReset() {
    if (this.props.isTicking) {
      this.props.appActions.endGame();
    }

    this.props.appActions.newGame();
  }

  tick() {
    if (!this.props.isTicking) {
      return;
    }

    this.props.appActions.incrementTime();
  }

  render() {
    const {
      isGameOver,
      isTicking,
      hasWon,
      mineCount,
      minesLeft,
      timeSpent
    } = this.props;
    const { isOpening } = this.state;
    const className = classNames({
      app: true,
      app__is_ticking: isTicking
    });
    let status = <span className="status"></span>
    if (isGameOver) {
          status = <span id="gameover" className="status">Oops! Gameover. Click on the smiley above to start again!</span>
        }
    return (
      <div className={className}>
        <Toolbar
          hasWon={hasWon}
          isOpening={isOpening}
          isTicking={isTicking}
          mineCount={mineCount}
          minesLeft={minesLeft}
          timeSpent={timeSpent}
          onReset={this.handleReset}
        />

        <h1>Minesweeper</h1>

        {status}
        <div className="app__container">

          <BoardContainer
            mineCount={mineCount}
            isTicking={isTicking}
            isGameOver={isGameOver}
            onMouseUp={this.handleCellBlur}
            onMouseDown={this.handleCellFocus}
          />

        <br/>
            <span style={{ fontSize: 25, color:'white', fontWeight: 'bold'}}>HOW TO PLAY</span><br />
            <span style={{ fontSize: 20, color: 'coral', fontWeight:'bold'}}>KeyTerms:</span>
            <ul id ="key_list">
              <li><strong>Flag: </strong>If you think there is a (possible) mine! </li>
              <li><strong>Mine: </strong>Makes you lose the game!</li>
              <li><strong>Smiley:</strong>If you want to reset the game!</li>
            </ul>
            <span style={{ fontSize: 16 }}>Click one a square to open a cell.</span><br />
            <span style={{ fontSize: 16 }}>Right Click: Flag the cell.</span><br />
            <span style={{ fontSize: 16 }}>You lose if you open a mine and game is over!
            </span><br /><br />
          <span style={{ color: 'coral', fontSize: 18 }}>** To change the difficulty of the game, click Settings on the top right corner of the page.
                    </span>

          <hr />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  hasWon: PropTypes.bool,
  isTicking: PropTypes.bool,
  isGameOver: PropTypes.bool,
  mineCount: PropTypes.number,
  minesLeft: PropTypes.number,
  timeSpent: PropTypes.number,
  appActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    hasWon: state.get('hasWon'),
    timeSpent: state.get('timeSpent'),
    mineCount: state.get('mineCount'),
    isTicking: state.get('isTicking'),
    minesLeft: state.get('minesLeft'),
    isGameOver: state.get('isGameOver')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
