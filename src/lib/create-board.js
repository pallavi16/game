import { fromJS, List, Record } from 'immutable';

//Creating the board using cells and its different values

export const Cell = Record({
  rowIndex: -1,
  columnIndex: -1,
  hasMine: false,
  hasFlag: false,
  isOpened: false,
  neighbors: List(),
  neighborMineCount: 0
});

function fillArray(length, fn) {
  return Array.apply(null, new Array(length)).map(fn);
}

/* Creates an immutable 2d grid containing Cell instances */
export default ({ columns, rows }) => {
  const boardJS = fillArray(rows, (_row, rowIndex) => {
    return fillArray(columns, (_column, columnIndex) => {
      return Cell({
        rowIndex,
        columnIndex
      });
    });
  });

  return fromJS(boardJS);
};
