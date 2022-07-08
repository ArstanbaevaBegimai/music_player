const musicContainer = document.querySelector(".music-container");
const cover = document.querySelector("#cover");
const title = document.querySelector("#title");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector("#progress");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");

// Song titles
const songs = ["Moda", "Trendy", "Picnic"];

let songIndex = 2;

// Initial song load
loadSong(songs[songIndex]);

// Song details
function loadSong(song) {
  audio.src = `music/${song}.mp3`;
  title.innerText = song;
  cover.src = `images/${song}.jpg`;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const togglePlay = musicContainer.classList.toggle("play");
  if (musicContainer.classList.contains("play")) {
    playBtn.innerHTML = `<img src="./images/pause.svg" alt="pause" />`;
    audio.play();
  } else {
    playBtn.innerHTML = `<img src="./images/play.svg" alt="play" />`;
    audio.pause();
  }
});

// Change songs
prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  audio.play();
});

nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  audio.play();
});

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
});

progressContainer.addEventListener("click", function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});
