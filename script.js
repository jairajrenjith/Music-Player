let shuffle_icon = document.getElementById('shuffleIcon');
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/eminem.jpg',
        name : 'Eminem',
        artist : 'Eminem',
        music : 'music/eminem.mp3'
    },
    {
        img : 'images/shapeofyou.jpg',
        name : 'Shape of You',
        artist : 'Ed Sheeran',
        music : 'music/shapeofyou.mp3'
    },
    {
        img : 'images/infinity.jpg',
        name : 'Infinity',
        artist : 'Jaymes Young',
        music : 'music/infinity.mp3'
    },
    {
        img : 'images/levitating.jpg',
        name : 'Levitating',
        artist : 'Dua Lipa',
        music : 'music/levitating.mp3'
    }
];

loadTrack(track_index);

function loadTrack(index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[index].music;
    curr_track.load();

    track_art.style.backgroundImage = `url(${music_list[index].img})`;
    track_name.textContent = music_list[index].name;
    track_artist.textContent = music_list[index].artist;
    now_playing.textContent = `Playing music ${index + 1} of ${music_list.length}`;

    curr_track.addEventListener("loadedmetadata", () => {
        total_duration.textContent = formatTime(curr_track.duration);
    });

    updateTimer = setInterval(setUpdate, 500);
    curr_track.addEventListener('ended', nextTrack);

    random_bg_color();
}

function random_bg_color(){
    let hex = '0123456789abcdef';
    function randColor(){
        let c = '#';
        for(let i=0; i<6; i++) c += hex[Math.floor(Math.random()*16)];
        return c;
    }
    document.body.style.background = `linear-gradient(to right, ${randColor()}, ${randColor()})`;
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    loadTrack(track_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
    if(isRandom){
        let random_index;
        do {
            random_index = Math.floor(Math.random() * music_list.length);
        } while(random_index === track_index);

        track_index = random_index;
    } else {
        track_index = (track_index + 1) % music_list.length;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    track_index = track_index > 0 ? track_index - 1 : music_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

seek_slider.addEventListener("input", seekTo);
volume_slider.addEventListener("input", setVolume);

function setUpdate(){
    if(!isNaN(curr_track.duration)){
        seek_slider.value = (curr_track.currentTime / curr_track.duration) * 100;
        curr_time.textContent = formatTime(curr_track.currentTime);
    }
}

function formatTime(sec){
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    return `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
}

function toggleIconColor() {
    shuffle_icon.classList.toggle('blue-color');
}