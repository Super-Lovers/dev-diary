/* eslint-disable no-undef */
const themeToggleButton = document.getElementById('themeToggle');

let currentTheme = localStorage.getItem('currentTheme');

if (currentTheme != true && currentTheme != 'dark') {
	currentTheme = localStorage.setItem('currentTheme', 'light');
	currentTheme = 'light';
}

themeToggleButton.addEventListener('click', () => {
	changeTheme();
});

// ****************************************
// COLORS LEGEND
// ****************************************

// Light theme
const light_background = '#ffffff';

const light_h1 = '#2f4f4f';
const light_h3 = '#2f4f4f';
const light_h4 = '#2f4f4f';
const light_h5 = '#2f4f4f';
const light_h6 = '#2f4f4f';

const light_p = '#000000';

const light_li = '#000000';
const light_a = '#708090';
const light_icon = '#708090';

const light_hr = '-webkit-linear-gradient(left,#fff,#bcbcbc,#fff)';

const light_pre = '#F8F9FA';
const light_code = '#000000';

const light_card = '#ffffff';
const light_btn_background = '#f8f9fa';

// const light_status_background_color = '#d4edda';
// const light_status_border_color = '#c3e6cb';
// const light_status_text_color = '#155724';

// Dark Theme
const dark_background = '#181A1B';

const dark_h1 = '#B8D4D4';
const dark_h3 = '#B8D4D4';
const dark_h4 = '#B8D4D4';
const dark_h5 = '#B8D4D4';
const dark_h6 = '#B7B2A7';

const dark_p = '#DAD7D2';

const dark_li = '#DAD7D2';
const dark_a = '#B7B2A7';
const dark_icon = '#B8D4D4';

const dark_hr = '-webkit-linear-gradient(left, rgb(24, 26, 27), rgb(43, 46, 48), rgb(24, 26, 27))';

const dark_pre = '#1D1F20';
const dark_code = '#ffffff';

const dark_card = '#1D1F20';
const dark_btn_background = '#181A1B';

// const dark_status_color = '#ffd700';
// const dark_status_background_color = 'transparent';
const status_bar = document.getElementsByClassName('status-bar')[0];

// ****************************************

loadTheme();

function changeTheme() {
	let newIcon;
	let newText;

	if (currentTheme == 'light') {
		currentTheme = 'dark';
		newText = 'Switch to light theme';
		newIcon = 'lightbulb';
	} else {
		currentTheme = 'light';
		newText = 'Switch to dark theme';
		newIcon = 'moon';
	}

	localStorage.setItem('currentTheme', currentTheme);
	const code = '<h6><b><em><i class="fas fa-' + newIcon + '"></i> ' + newText + ' <i></i></em></b></h6>';

	themeToggleButton.innerHTML = code;

	updateVisuals();
}

function loadTheme() {
	let newIcon;
	let newText;

	if (currentTheme == 'light') {
		newText = 'Switch to dark theme';
		newIcon = 'moon';
	} else {
		newText = 'Switch to light theme';
		newIcon = 'lightbulb';
	}

	localStorage.setItem('currentTheme', currentTheme);
	const code = '<h6><b><em><i class="fas fa-' + newIcon + '"></i> ' + newText + ' <i></i></em></b></h6>';

	themeToggleButton.innerHTML = code;

	updateVisuals();
}

function updateElementColorTo(element, color) {
	const elements = document.getElementsByTagName(element);
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.color = color;
	}
}

function toggleElementByClassName(element, toggle) {
	const elements = document.getElementsByClassName(element)[0];
	if (toggle) {
		elements.style.display = 'block';
	} else {
		elements.style.display = 'none';
	}
}

function updateElementBackgroundTo(element, background) {
	const elements = document.getElementsByTagName(element);
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.backgroundColor = background;
	}
}

function updateElementClassBackgroundTo(element, background) {
	const elements = document.getElementsByClassName(element);
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.backgroundColor = background;
	}
}

function updateElementClassColorTo(element, color) {
	const elements = document.getElementsByClassName(element);
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.color = color;
	}
}

// function updateElementClassBorderColorTo(element, color) {
// 	const elements = document.getElementsByClassName(element);
// 	for (let i = 0; i < elements.length; i++) {
// 		elements[i].style.borderColor = color;
// 	}
// }

function updateElementClassBackgroundImageTo(element, value) {
	const elements = document.getElementsByClassName(element);
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.background = value;
	}
}

function updateVisuals() {
	if (currentTheme == 'dark') {
		toggleElementByClassName('portrait-video-day', false);
		toggleElementByClassName('portrait-video-night', true);
		status_bar.classList.remove('alert-success');
		status_bar.classList.add('alert-primary');
		status_bar.classList.remove('border-success');
		status_bar.classList.add('border-primary');

		updateElementColorTo('h1', dark_h1);
		updateElementColorTo('h3', dark_h3);
		updateElementColorTo('h4', dark_h4);
		updateElementColorTo('h5', dark_h5);
		updateElementColorTo('h6', dark_h6);

		updateElementColorTo('p', dark_p);

		updateElementColorTo('li', dark_li);
		updateElementColorTo('a', dark_a);
		updateElementClassColorTo('archive-link', dark_a);
		updateElementColorTo('i', dark_icon);

		updateElementBackgroundTo('body', dark_background);

		updateElementClassBackgroundImageTo('style14', dark_hr);

		updateElementClassBackgroundTo('code-block', dark_pre);
		updateElementColorTo('code', dark_code);

		// Game pages
		updateElementClassBackgroundTo('card', dark_card);
		updateElementClassBackgroundTo('btn-light', dark_btn_background);
		updateElementClassColorTo('btn-light', dark_h1);

		updateElementClassBackgroundTo('pageNumber', dark_card);

		updateElementClassColorTo('platform-icon', dark_a);
		updateElementClassBackgroundTo('platform-icon', dark_background);

		updateElementClassColorTo('profession-icon', dark_a);
		updateElementClassBackgroundTo('profession-icon', dark_background);

		// updateElementClassColorTo('status-bar', dark_status_color);
		// updateElementClassBackgroundTo('status-bar', dark_status_background_color);
		// updateElementClassBorderColorTo('status-bar', dark_status_color);

	} else if (currentTheme == 'light') {
		toggleElementByClassName('portrait-video-day', true);
		toggleElementByClassName('portrait-video-night', false);
		status_bar.classList.remove('alert-primary');
		status_bar.classList.add('alert-success');
		status_bar.classList.remove('border-primary');
		status_bar.classList.add('border-success');

		updateElementColorTo('h1', light_h1);
		updateElementColorTo('h3', light_h3);
		updateElementColorTo('h4', light_h4);
		updateElementColorTo('h5', light_h5);
		updateElementColorTo('h6', light_h6);

		updateElementColorTo('p', light_p);

		updateElementColorTo('li', light_li);
		updateElementColorTo('a', light_a);
		updateElementClassColorTo('archive-link', light_a);
		updateElementColorTo('i', light_icon);

		updateElementBackgroundTo('body', light_background);

		updateElementClassBackgroundImageTo('style14', light_hr);

		updateElementClassBackgroundTo('code-block', light_pre);
		updateElementColorTo('code', light_code);

		// Game pages
		updateElementClassBackgroundTo('card', light_card);
		updateElementClassBackgroundTo('btn-light', light_btn_background);
		updateElementClassColorTo('btn-light', light_h1);

		updateElementClassBackgroundTo('pageNumber', light_card);

		updateElementClassColorTo('platform-icon', light_a);
		updateElementClassBackgroundTo('platform-icon', light_background);

		updateElementClassColorTo('profession-icon', light_a);
		updateElementClassBackgroundTo('profession-icon', light_background);

		// updateElementClassColorTo('status-bar', light_status_text_color);
		// updateElementClassBackgroundTo('status-bar', light_status_background_color);
		// updateElementClassBorderColorTo('status-bar', light_status_border_color);
	}

	updateElementClassColorTo('pageNumber', '#808080');
	updateElementClassColorTo('portrait-description', '#ffffff');
	setGrayscaleFooterIcons(currentTheme);
}

function setGrayscaleFooterIcons(theme) {
	const icons = document.getElementsByClassName('footer-icon');
	for (let i = 0; i < icons.length; i++) {
		if (theme == 'light') {
			icons[i].style.filter = 'grayscale(0%)';
		} else if (theme == 'dark') {
			icons[i].style.filter = 'grayscale(100%)';
		}
	}
}

updateVisuals();