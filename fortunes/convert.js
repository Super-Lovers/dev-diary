const fsExtra = require('fs-extra');
let contents = fsExtra.readFileSync('./fortunes.txt', 'utf8');
let fortunes = {
    small: [],
    medium: [],
    large: []
};

contents = contents.split('\n%\n');
for (let i = 0; i < contents.length; i++) {
    let fortuneObj = {
        length: '',
        text: contents[i]
    }

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

fsExtra.writeFileSync('compiledFortunes.json', JSON.stringify(fortunes));