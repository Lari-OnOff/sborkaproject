(() => {
	const numbers = [0,1,2,3].map(index => {
		return document.querySelector('[id$="-num-' + index + '"]');
	});
	const expire = document.querySelector('[id$="-expire"]');
	const cvv = document.querySelector('[id$="-cvv"]');

	const numberInputChange = event => {
		const input = event.currentTarget;
		const index = input.id.split('-').pop() * 1;
		const next = index < 3 ? numbers[index + 1] : expire;
		input.value = input.value.replace(/[^0-9]/g, '');
		if (input.value.length === 4) next.focus();
	};

	const numberInputKey = event => {
		const input = event.currentTarget;
		const index = input.id.split('-').pop() * 1;
		const prev = numbers[index - 1];
		const key = event.which;
		if (key === 8 && input.value.length === 0) prev.focus();
	};

	const expireInputBlur = event => {
		const input = event.currentTarget;
		if (/[0-9]{4}/.test(input.value)) {
			input.value = input.value.substr(0, 2) + '/' + input.value.substr(2, 2);
		}
	};

	const cvvInputChange = event => {
		const input = event.currentTarget;
		input.value = input.value.replace(/[^0-9]/g, '');
	};

	numbers.forEach((number, index) => {
		number.addEventListener('input', numberInputChange);
		if (index > 0) number.addEventListener('keydown', numberInputKey);
	});

	expire.addEventListener('blur', expireInputBlur);
	expire.addEventListener('input', cvvInputChange);
	cvv.addEventListener('input', cvvInputChange);

	if (module.hot) {
		module.hot.dispose(() => {
			numbers.forEach((number, index) => {
				number.removeEventListener('input', numberInputChange);
				if (index > 0) number.removeEventListener('keydown', numberInputKey);
			});
			expire.removeEventListener('blur', expireInputBlur);
			expire.removeEventListener('input', cvvInputChange);
			cvv.removeEventListener('input', cvvInputChange);
		});
	}
})();
