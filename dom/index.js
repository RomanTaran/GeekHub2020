jQuery('input').on('paste', function (e) {
	e.preventDefault();

	var text = e.originalEvent.clipboardData.getData('text/plain');
	var input = e.currentTarget;
	var headersLetters = ['C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var arr = text.trim().split('\n');
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
		$('tbody').append('<tr><th>'+Number(i+3)+'</th><td><input type=\"text\" name=\"a'+Number(i+3)+'\"' +
		' value=\"\"/></td><td><input type=\"text\" name=\"b'+Number(i+3)+'\" value=\"\"/></td></tr>');
	}
	for (let i = 0; i < numberColumns; i++) {
		$('thead>tr').append('<th>'+headersLetters[i]+'</th>');
		$('tbody>tr').append(function(j) {
			return '<td><input  type=\"text\" name=\"'+headersLetters[i].toLowerCase()+Number(j+1)+'\" value=\"\"/></td>';
		});
	}
	var inputs = $('input');
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].value = "";
	}
	var indexStart;
	for (let i = 0; i < $('input').length; i++) {
		if (inputs[i].name == input.name) indexStart = i;
	}
	for (let i = 0; i < inputString.length; i++) {
		for (let j = 0; j < inputString[i].length; j++) {
			inputs[indexStart++].value=inputString[i][j];
		}
		if (input.name[0] == 'b'){
			indexStart++;
		}
	}
});

var currentColumn;
// Добавление и удаление столбцов
jQuery('thead th').on('contextmenu', function (e) {
	e.preventDefault();

	currentColumn = e.currentTarget;

	var menu = jQuery('#column-menu');
	if(currentColumn.innerHTML !== '&nbsp;') {
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
			currentColumn.parentElement.insertBefore(currentColumn.cloneNode(),currentColumn);
			$('input').each(function () {
				if(this.name[0]==currentColumn.innerHTML.toLowerCase())
					this.parentElement.parentElement.insertBefore(this.parentElement.cloneNode(true),this.parentElement);
			});
			break;

		case 'add-right':
			currentColumn.parentElement.insertBefore(currentColumn.cloneNode(),currentColumn.nextElementSibling);
			$('input').each(function () {
				if(this.name[0]==currentColumn.innerHTML.toLowerCase())
					this.parentElement.parentElement.insertBefore(this.parentElement.cloneNode(true),this.parentElement.nextElementSibling);
			});
			break;

		case 'remove':
			currentColumn.remove();
			$('input').each(function () {
				if(this.name[0]==currentColumn.innerHTML.toLowerCase())
					this.parentElement.remove();
			});
			break;
	}
	jQuery('#column-menu').removeClass('d-block');
});

var currentRow;
// Добавление и улаление строк
jQuery('tbody th').on('contextmenu', function (e) {
	e.preventDefault();

	currentRow = e.currentTarget;

	var menu = jQuery('#row-menu');
	if(currentRow.innerHTML !== '&nbsp;') {
		menu.addClass('d-block');

		menu.css({
			left: e.clientX,
			top: e.clientY
		});
	}
});

jQuery('#row-menu [data-action]').on('click', function (e) {
	e.preventDefault();

	var action = e.currentTarget.getAttribute('data-action');
	switch (action) {
		case 'add-above':
			currentRow.parentElement.parentElement.insertBefore(currentRow.parentElement.cloneNode(true),currentRow.parentElement);
			break;

		case 'add-under':
			currentRow.parentElement.parentElement.insertBefore(currentRow.parentElement.cloneNode(true),currentRow.parentElement.nextElementSibling);
			break;

		case 'remove':
			currentRow.remove();
			$('input').each(function () {
				if(this.name[1]==currentRow.innerHTML) this.parentElement.remove();
			});
			break;
	}
	jQuery('#row-menu').removeClass('d-block');
});
