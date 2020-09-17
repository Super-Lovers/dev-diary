const fsExtra = require('fs-extra');
let contents = fsExtra.readFileSync('./fortunes.txt', 'utf8');
const fortunes = {
	small: [],
	medium: [],
	large: [],
};

contents = contents.split('%');
for (let i = 0; i < contents.length; i++) {
	const fortuneObj = {
		length: '',
		text: contents[i],
	};

	if (fortuneObj.text.length <= 76) {
		fortuneObj.length = 'small (<= 76)';
		fortunes.small.push(fortuneObj);
	} else if (fortuneObj.text.length > 76 && fortuneObj.text.length <= 114) {
		fortuneObj.length = 'medium (> 76 && <= 114)';
		fortunes.medium.push(fortuneObj);
	} else {
		fortuneObj.length = 'large (> 114)';
		fortunes.large.push(fortuneObj);
	}
}

console.log(fortunes.small.length);
console.log(fortunes.medium.length);
console.log(fortunes.large.length);

const sum_of_fortunes = fortunes.small.length + fortunes.medium.length + fortunes.large.length;

console.log(fortunes.small.length + ' + ' + fortunes.medium.length + ' + ' + fortunes.large.length + ' = ' + sum_of_fortunes);

fsExtra.writeFileSync('compiledFortunes.json', JSON.stringify(fortunes));
