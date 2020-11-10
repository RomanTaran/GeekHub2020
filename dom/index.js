jQuery('input').on('paste', function (e) {
	e.preventDefault();

	var text = e.originalEvent.clipboardData.getData('text/plain');
	var input = e.currentTarget;
	var headersLetters = ['C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var arr = text.split('\n');
	var inputString = [];
	for (let i = 0; i < arr.length; i++) {
		inputString[i]=arr[i].split(';');
	}
	var numberColumns;
	var numberRows;
	if(input.name === 'a1' || input.name === 'b1') numberRows = arr.length-2;
	else numberRows = arr.length-1;
	if (input.name === 'a1' || input.name === 'a2') numberColumns = inputString[0].length-2;
	else numberColumns = inputString[0].length-1;
	for (let i = 0; i < numberRows; i++) {
		$('tbody').append('<tr><td>'+Number(i+3)+'</td><td><input type=\"text\" name=\"a'+Number(i+3)+'\"' +
		' value=\"0\"/></td><td><input type=\"text\" name=\"b'+Number(i+3)+'\" value=\"0\"/></td></tr>');
	}
	for (let i = 0; i < numberColumns; i++) {
		$('thead>tr').append('<th>'+headersLetters[i]+'</th>');
		$('tbody>tr').append(function(j) {
			return '<td><input  type=\"text\" name=\"'+headersLetters[i].toLowerCase()+Number(j+1)+'\" value=\"0\"/></td>';
		});
	}
	var inputs = $('input');
	var indexStart;
	for (let i = 0; i < $('input').length; i++) {
		if (inputs[i].name == input.name) indexStart = i;
	}
	var k;
	for (let i = 0; i < inputString.length; i++) {
		for (let j = 0; j < inputString[i].length; j++) {
			inputs[indexStart++].value=inputString[i][j];
		}
	}

});

var currentColumn;

jQuery('thead th').on('contextmenu', function (e) {
	e.preventDefault();

	currentColumn = e.currentTarget;
	if(currentColumn.innerHTML !== '&nbsp;') {
		var menu = jQuery('#column-menu');
		menu.removeClass('d-block');
		menu.addClass('d-block');
		menu.css({
			left: e.clientX,
			top: e.clientY
		});
	}
});

jQuery('#column-menu [data-action]').on('click', function (e) {
	e.preventDefault();

	var action = e.currentTarget.getAttribute('data-action');

	switch (action) {
		case 'add-left':

			break;

		case 'add-right':

			break;

		case 'remove':

			break;
	}

	jQuery('#column-menu').removeClass('d-block');
});
