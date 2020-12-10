/* eslint-disable no-undef */
const yearItems = document.getElementsByClassName('yearLabel');

for (let i = 0; i < yearItems.length; i++) {
	const item = yearItems[i];
	const itemIcon = item.firstChild;

	if (i > 2) {
		item.parentElement.lastChild.style.display = 'none';
		itemIcon.classList.add('fa-caret-right');
		itemIcon.classList.remove('fa-caret-down');
	} else {
		item.parentElement.lastChild.style.display = 'block';
		itemIcon.classList.remove('fa-caret-right');
		itemIcon.classList.add('fa-caret-down');
	}

	item.style.display = 'block';
	item.style.cursor = 'pointer';

	item.addEventListener('click', () => {
		const list = item.parentElement.lastChild;
		if (list.style.display == 'none') {
			list.style.display = 'block';
			itemIcon.classList.remove('fa-caret-right');
			itemIcon.classList.add('fa-caret-down');
		} else if (list.style.display == 'block') {
			list.style.display = 'none';
			itemIcon.classList.add('fa-caret-right');
			itemIcon.classList.remove('fa-caret-down');
		}
	});
}

// Replaces all whitespace in code blocks with different character
// for the sake of visibility
const code_blocks = document.getElementsByTagName('code');
// console.log(code_blocks);
for (let i = 0; i < code_blocks.length; i++) {
	let element = code_blocks[i];
	const text = element.innerHTML;
	const new_text = text.replace(/ /g, '<span class="empty-character">·</span>');
	element.innerHTML = new_text;
}