$(document).ready(function () {
    // Get a random fortune
    let fortunesText = $.get('/fortunes/compiledFortunes.json', (data) => {
        let fortunes = JSON.parse(data);
        let dice = Math.floor((Math.random() * 2 )+ 1);
        let randomFortune;

        if (dice > 1) {
            randomFortune = fortunes.small[Math.floor(Math.random() * fortunes.small.length)].text;
        } else if (dice == 1) {
            randomFortune = fortunes.medium[Math.floor(Math.random() * fortunes.small.length)].text;
        }
        
        $('.fortune-text').html(randomFortune);
    }, 'text');
});