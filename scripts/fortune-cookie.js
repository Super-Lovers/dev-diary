/* eslint-disable no-undef */
$(document).ready(() => {
	// Get a random fortune
	$.get('/fortunes/compiledFortunes.json', (data) => {
		const fortunes = JSON.parse(data);
		const dice = Math.floor((Math.random() * 2) + 1);
		let randomFortune;

		if (dice > 1 || fortunes.medium.length == 0) {
			randomFortune = fortunes.small[Math.floor(Math.random() * fortunes.small.length)].text;
		} else if (dice == 1 && fortunes.medium.length > 0) {
			randomFortune = fortunes.medium[Math.floor(Math.random() * fortunes.medium.length)].text;
		}

		$('.fortune-text').html(randomFortune);
	}, 'text');
});