import * as types from '../constants/action-types';

//It sets the board configuration for easy, medium and hard difficulty levels.
//Also provides actions for new game, end game, increment time.

export function updateBoardDimensions(difficulty) {
  let rows, columns, mineCount;

  switch (difficulty.toLowerCase()) {
    case 'easy':
      rows = 9;
      columns = 9;
      mineCount = 10;
      break;
    case 'hard':
      rows = 16;
      columns = 30;
      mineCount = 99;
      break;
    default:
      rows = 16;
      columns = 16;
      mineCount = 40;
  }

  return {
    type: types.SET_BOARD_DIMENSIONS,
    rows,
    columns,
    mineCount
  };
}

export function newGame() {
  return (dispatch, getState) => {
    const state = getState();

    if (state.get('gameCount') === 0) {
      dispatch(updateBoardDimensions(state.get('difficulty')));
    }

    dispatch(newGameAction());
  }
}

export function updateDifficulty(difficulty) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CHANGE_DIFFICULTY,
      difficulty: difficulty
    });

    dispatch(updateBoardDimensions(difficulty))
    dispatch(newGameAction());
  };
}

function newGameAction() {
  return {
    type: types.CONFIGURE_ROUND
  }
}

export function incrementTime() {
  return {
    type: types.INCREMENT_TIME
  };
}

export function endGame() {
  return {
    type: types.STOP_ROUND
  };
}
