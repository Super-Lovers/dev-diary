/* eslint-disable no-undef */

console.log(
	'\n\n,gggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwww=\n]$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$lllllllllllllllllllL\n]$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$lllllllllllllllllllllL\n]$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$l$$lllllllllllllllllllllllL\n|$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$lllllllllllllllllllllllllllllllL\n|$$$$$$$$$$$$$$$$$$$$$$$$$$&$llllllllllllllllllllllllllllllllllllllllL\n|$$$$$$$$$$$Ml$*MT|||TT|||||||||"|\'|i||\'\'"i&lllllllllllllllllllllll||L\n|%%$$$$lllW|||||||||||ll@WWy@l|lll|||||lllL|,||*llYlT|lllT***|lll\'lM`L\n||||l|||W|||||l|||l&lllllll||||||||||||||||| `||||||||||LL|||||\'\',kg"L\n]$@il|llllll|llll|llMlllLlll||l|||||||||||||||||||||||||||||||||j@g@M{\n]llllllllllllllllllllillllllL||LLlL|||l||||||lL||\'|||||||,|||||j@@@@@[\n|llllllL|l|||||llllllllllllLlllllllllL||||||||||||||||||||||gg@@@@@@@[\n||l|||l|||||||||l||||||||||||||||ll|lllLll||;|||||||||||,@@@@@@@@@@@@[\n|gL||||llll||||||iM$lllllllWWllllllMlllll|||||||||||,gg@@@@@@@@@@@@@@[\n]@@@@$@@@$$$$$@@%@@@@@@@$$$$$$$$@Ww|||||||||,,|,ygg@@@@@@@@@@@@@@@@@@[\n]@@@@@$$@@@@@@@@@@@$$@@@@@@@WW$ijl$llllll@@@$@@@@@@@@@@@@@@@@@@@@@@@@[\n]@@@@@@@@%@@@NNN%%NNNM%MMM$$$$%w$$lggg@@ggg@@@@@@@@@@@@@@@@@@@@@@@@@@[\n]@@@@@@@%%@@@@$$@@@@@@@@$$$$$$$$$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@[\n]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$@@@@@@@@@@@@@@@@@@@@@@@@@[\n]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@[\n]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@[\n\'""""""""""""""""""""""""""""""""""*****"***"""""^""""""""""""""""""*"\n\n\n\t\t\t\t\t\t\tC C  1 ( L C ,\n\t\t\t\t\t\t\t/\\\'mE r K. /\\\n\n\n'
);

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
for (let i = 0; i < code_blocks.length; i++) {
	const element = code_blocks[i];
	const text = element.innerHTML;
	const new_text = text.replace(/ /g, '<span class="empty-character">·</span>');
	element.innerHTML = new_text;
}