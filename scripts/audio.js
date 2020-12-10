/* eslint-disable no-undef */
const player = new Plyr('#audio-player', {
	settings: [],
	autoplay: false
});

const session = window.sessionStorage;
let isPlaying;
let timeOfMusic;
let songDuration;
let isPlayerOn;

player.on('ready', () => {
	timeOfMusic = session.getItem('timeOfMusic');
	isPlaying = session.getItem('isPlaying');

	if (isPlaying == 'true') { player.play(); }
	else { player.stop(); }

	if (timeOfMusic == null) {
		session.setItem('timeOfMusic', 0);
	} else {
		player.currentTime = parseFloat(timeOfMusic);
	}

	songDuration = player.duration;
	isPlayerOn = true;
});

player.on('pause', () => { session.setItem('isPlaying', false); });
player.on('play', () => { session.setItem('isPlaying', true); });

setInterval(() => {
	if (isPlayerOn && player.paused == false) {
		timeOfMusic = player.currentTime;

		if (timeOfMusic == songDuration) {
			timeOfMusic = 0;
		}

		session.setItem('timeOfMusic', timeOfMusic);
	}
}, 500);