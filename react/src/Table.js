import React from 'react';

export default function Table(props) {
  let {columns, rows, cell, data} = props;
  const alpha = 'abcdefghijklmnopqrstuvwxyz';

  function addHeader(cols) {
    const headers = [];
    for (let i = 0; i < cols; i++) {
      headers.push(<td>{alpha[i].toUpperCase()}</td>);
    }
    return headers;
  }

  function addRows() {
    const row = [];
    for (let i = 0; i < rows; i++) {
      row.push(<tr>
        <td>{i + 1}</td>
        {addCells(i, props.columns)}</tr>);
    }
    return row;
  }

  function addCells(rowNum, cols) {
    const cells = [];
    for (let i = 0; i < cols; i++) {
      cells.push(<td><input type='text' name={alpha[i] + (rowNum + 1)} value={insertValue(rowNum, i)}/></td>)
    }
    return cells;
  }

  function insertValue(rowIndex, colIndex) {
    if (props.data === undefined || props.cell === undefined) {return ;}
    if (rowIndex < props.cell[1] - 1 || colIndex < alpha.indexOf(props.cell[0])) {return;}
    return props.data[rowIndex - props.cell[1] + 1][colIndex - alpha.indexOf(props.cell[0])];
  }

  return (
    <table>
      <thead>
      <tr>
        <td>&nbsp;</td>
        {addHeader(props.columns)}
      </tr>
      </thead>
      <tbody>
      {addRows()}
      </tbody>
    </table>
  );
};