import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Table from './Table';

const alpha = 'abcdefghijklmnopqrstuvwxyz';
let rowsNumber = 0;
let columnsNumber = 0;

ReactDom.render(
	<Table columns={2} rows={2}/>,
	document.querySelector('#root')
);

$('body').on('paste', 'input', function (e) {
	e.preventDefault();

	let text = e.originalEvent.clipboardData.getData('text/plain');
	let input = e.currentTarget;
	let data = text.split("\n").map(line => line.split(';'));
	let column = input.parentNode.cellIndex - 1;
	let row = input.parentNode.parentNode.sectionRowIndex;
	rowsNumber=Math.max(rowsNumber,row + data.length);
	columnsNumber=Math.max(columnsNumber,column + data[0].length);
	console.log(row + data.length,column + data[0].length);
//	let rowsNumber = row + data.length;
//	let columnsNumber = column + data[0].length;

	ReactDom.render(
		<Table
			columns={columnsNumber}
			rows={rowsNumber}
			cell={getCellName(row, column)}
			data={data}
		/>,
		document.querySelector('#root')
	);
});

function getCellName(row, column) {
	return alpha.charAt(column) + (row + 1);
}