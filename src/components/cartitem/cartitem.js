(() => {
	const recalculateTotal = () => {
		const elements = document.getElementsByClassName('pricing__value');
		if (elements.length < 4) return;
		const subtotal = elements[0];
		const total = elements[3];
		const sum = [].slice
			.call(document.getElementsByClassName('cart-item'))
			.reduce((_sum, element) => {
				return _sum + element.dataset.price * element.dataset.count;
			}, 0);
		subtotal.innerHTML = '$&nbsp;' + sum;
		total.innerHTML = '$&nbsp;' + (sum + 250).toString();
	};

	const countButtonClick = event => {
		const button = event.currentTarget;
		const cartItem = button.parentNode.parentNode.parentNode.parentNode;
		const label = button.parentNode.querySelector('.cart-item__count-value');
		const price = button.parentNode.parentNode.querySelector('.cart-item__price');
		if (button.classList.contains('_minus')) {
			if (cartItem.dataset.count > 1) cartItem.dataset.count--;
		} else {
			cartItem.dataset.count++;
		}
		label.innerHTML = cartItem.dataset.count;
		price.innerHTML = '$&nbsp;' + cartItem.dataset.price * cartItem.dataset.count;
		recalculateTotal();
	};

	[].slice.call(document.getElementsByClassName('cart-item__count-button')).forEach(element => {
		element.addEventListener('click', countButtonClick);
	});

	const closeButtonClick = event => {
		const cartItem = event.currentTarget.parentNode.parentNode;
		cartItem.parentNode.removeChild(cartItem);
		recalculateTotal();
	};

	[].slice.call(document.getElementsByClassName('cart-item__remove')).forEach(button => {
		button.addEventListener('click', closeButtonClick);
	});

	if (module.hot) {
		module.hot.dispose(() => {
			[].slice.call(document.getElementsByClassName('cart-item__remove')).forEach(button => {
				button.removeEventListener('click', closeButtonClick);
			});
			[].slice.call(document.getElementsByClassName('cart-item__count-button')).forEach(element => {
				element.removeEventListener('click', countButtonClick);
			});
		});
	}
})();
