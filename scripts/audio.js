/* eslint-disable no-undef */
const audio = document.getElementById('audioPlayer');
audio.volume = 0.001;

const session = window.sessionStorage;
let timeOfMusic = session.getItem('timeOfMusic');

if (timeOfMusic == null) {
	session.setItem('timeOfMusic', 0);
	audio.play();
	// console.log('Started ' + timeOfMusic);
} else {
	audio.currentTime = timeOfMusic + 1;
	audio.play();
}

const songDuration = audio.duration;
setInterval(() => {
	if (audio.paused == false) {
		timeOfMusic = audio.currentTime;

		if (timeOfMusic == songDuration) {
			timeOfMusic = 0;
		}

		// console.log("Current music time: " + timeOfMusic);
		session.setItem('timeOfMusic', timeOfMusic);
	}
}, 1000);