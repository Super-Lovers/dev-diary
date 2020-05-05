$(document).ready(function () {
    // Get a random fortune
    let fortunesText = $.get('/fortunes/compiledFortunes.json', (data) => {
        let fortunes = JSON.parse(data);
        let randomSmallFortune = fortunes.small[Math.floor(Math.random(0, 1) * fortunes.small.length)].text;
        
        $('.fortune-text').html(randomSmallFortune);
    }, 'text');
});