import { expect } from 'chai';
import thunk from 'redux-thunk';
import { Map, List } from 'immutable';
import configureMockStore from 'redux-mock-store';
import * as boardActions from './board';
import * as types from '../constants/action-types';
import createBoard from '../../lib/create-board';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('board actions', () => {
  it('should start new game when cell is clicked or when game is over', () => {
    console.log('Starts new game when cell is clicked or when game is over');
    const store = mockStore(
      Map({
        board: List(),
        isGameOver: true
      })
    );

    const cell = Map({
      isOpened: false
    });

    store.dispatch(boardActions.openCell(cell));

    expect(store.getActions()).to.deep.equal([
      {
        type: types.CONFIGURE_ROUND
      }
    ]);
  });

  it('should end the game when a mined cell is clicked', () => {
    console.log('Ends the game when a mined cell is clicked');
    const store = mockStore(
      Map({
        board: List(),
        isGameOver: false
      })
    );

    const cell = Map({
      rowIndex: 0,
      columnIndex: 0,
      hasFlag: false,
      hasMine: true
    });

    store.dispatch(boardActions.openCell(cell));
    const result = store.getActions(cell);

    expect(result.length).to.equal(2);

    expect(result[0]).to.deep.equal({
      type: types.OPEN_CELL,
      cell: cell
    });

    expect(result[1]).to.deep.equal({
      type: types.STOP_ROUND
    });
  });

  it('should plant mines after the first cell is opened exclusive of cell from mine plant', () => {
console.log('Plants mine when first square clicked');
    const store = mockStore(
      Map({
        board: createBoard({
          rows: 9,
          columns: 9
        }),
        isGameOver: false,
        openCount: 0
      })
    );

    store.dispatch(
      boardActions.openCell(
        Map({
          rowIndex: 0,
          columnIndex: 0,
          hasFlag: false,
          hasMine: false
        })
      )
    );

    expect(store.getActions()[0]).to.deep.equal({
      type: types.PLANT_MINES,
      exclusions: ['0,0']
    });
  });

  it('should add flag', () => {
    console.log('Adds a flag!');
    const cell = Map({
      hasFlag: false
    });

    const store = mockStore(
      Map({
        isGameOver: false
      })
    );

    store.dispatch(boardActions.flagCell(cell));

    expect(store.getActions()).to.deep.equal([
      {
        type: types.ADD_FLAG,
        cell
      }
    ]);
  });

  it('should not be able to add/remove flag when game is over', () => {
    console.log('Adds/ Removes flag when the game is over');
    const store = mockStore(
      Map({
        isGameOver: true
      })
    );

    store.dispatch(
      boardActions.flagCell(
        Map({
          hasFlag: false
        })
      )
    );

    store.dispatch(
      boardActions.flagCell(
        Map({
          hasFlag: true
        })
      )
    );

    expect(store.getActions()).to.deep.equal([]);
  });

  it('should remove flag if flag exists on cell', () => {
    console.log('Removes flag since flag already exists!');
    const cell = Map({
      hasFlag: true
    });

    const store = mockStore(
      Map({
        isGameOver: false
      })
    );

    store.dispatch(boardActions.flagCell(cell));

    expect(store.getActions()).to.deep.equal([
      {
        type: types.REMOVE_FLAG,
        cell
      }
    ]);
  });
});
