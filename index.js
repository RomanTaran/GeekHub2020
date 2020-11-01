document.querySelector('#user-form').addEventListener('submit', function (e) {
	e.preventDefault();
	var rule1 = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/;
	var rule2 = /^[\w\-][\w\-\.]+[\w\-]+@[\w\-][\w\-\.]+\.[\w\-\.]+[\w\-]$/;
	var rule3 = /(?=^.{8,}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
	if (rule1.test(e.target.elements["full_name"].value.trim())){
		e.target.elements["full_name"].style.backgroundColor = '#C2E0C6';
	} else {
		e.target.elements["full_name"].style.backgroundColor = '#F9D0C4';
	};
	if (rule2.test(e.target.elements["email"].value.trim())){
		e.target.elements["email"].style.backgroundColor = '#C2E0C6';
	} else {
		e.target.elements["email"].style.backgroundColor = '#F9D0C4';
	};
	if (rule3.test(e.target.elements["password"].value)){
		e.target.elements["password"].style.backgroundColor = '#C2E0C6';
	} else {
		e.target.elements["password"].style.backgroundColor = '#F9D0C4';
	};
});

document.querySelectorAll('[data-show]').forEach(function (button) {
	button.addEventListener('click', function (e) {
		document.querySelector('#description').classList.add('d-none');
		document.querySelector('#preview').classList.add('d-none');

		document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
	});
});