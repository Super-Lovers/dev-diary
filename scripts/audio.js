let vid = document.getElementById("audioPlayer");
vid.volume = 0.001;

let session = window.sessionStorage;
let timeOfMusic = session.getItem('timeOfMusic');

if (timeOfMusic == null) {
    session.setItem('timeOfMusic', 0);
    vid.play();
    // console.log('Started ' + timeOfMusic);
} else {
    vid.currentTime = timeOfMusic + 1;
    vid.play();
}

let songDuration = vid.duration;
setInterval(() => {
    timeOfMusic = vid.currentTime;

    if (timeOfMusic == songDuration) {
        timeOfMusic = 0;
    }
    
    // console.log("Current music time: " + timeOfMusic);
    session.setItem('timeOfMusic', timeOfMusic);
}, 1000);