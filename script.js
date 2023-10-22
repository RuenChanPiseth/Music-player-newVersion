const showSongButton = document.querySelector(".show-more-song");
const header = document.querySelector("header");
const musicListContainer = document.querySelector(".music-list-container");
const range = document.querySelector("input[type='range']");
const allDuration = document.querySelectorAll(".range-container>p");
const allFuncButton = document.querySelectorAll(".next-prev>i");
const file = document.querySelector("input[type='file']");
const img = document.querySelector("img");
let counter = 0;
const audio = document.querySelector("audio");
const songTitle = document.querySelector(".song-title");
const moreFunction = document.querySelectorAll(".more-function>i");
let playAgain = 0;
const inputFile = document.querySelector("input[type='file']");
const addSongButton = document.querySelector("button.add-song");
const arraySong = [
  {
    title: "Ghost - Mary On A Cross",
    musicSrc: "/audio/Ghost - Mary On A Cross (1).mp3",
    imgSrc: "/img/download.jpeg",
  },
  {
    title: "Lil Nas X - Old Town Road ",
    musicSrc:
      "/audio/Lil Nas X - Old Town Road (Official Video) ft. Billy Ray Cyrus (1).mp3",
    imgSrc: "/img/Old-Town-Road-Video-GQ-2019-051719.webp",
  },
  {
    title: " 7 Years ",
    musicSrc: "/audio/Lukas Graham - 7 Years [Official Music Video].mp3",
    imgSrc: "/img/hqdefault.jpg",
  },
  {
    title: "Fire On Fire",
    musicSrc: "/audio/Sam Smith - Fire On Fire (From 'Watership Down').mp3",
    imgSrc: "/img/44e46-sam-smith-fire-on-fire-review.jpg",
  },
  {
    title: "Until I Found You",
    musicSrc:
      "/audio/Stephen Sanchez, Em Beihold - Until I Found You (Lyrics).mp3",
    imgSrc: "/img/df55dd551fbc956ba1b22856ab655b7e.1000x1000x1.jpg",
  },
  {
    title: "videoplayback.mp3",
    musicSrc: "/audio/videoplayback.mp3",
    imgSrc: "/img/maxresdefault.jpg",
  },
];
let musicListContainerChildren = [];

addSongButton.onclick = () => {
  inputFile.click();
};

function showSongToList() {
  let value = -1;
  musicListContainer.innerHTML = arraySong
    .map((song) => {
      if (song.title.length > 30) {
        song.title = song.title.slice(0, 35) + "...";
      }
      value++;
      return `<article>
        <p data-value='${value}'>${song.title}</p>
      </article>`;
    })
    .join("");
  songVariable();
  clickToPlay();
}
showSongToList();

function songVariable() {
  musicListContainerChildren = document.querySelectorAll(
    ".music-list-container>article"
  );
}

const addSong = () => {
  const musicAddedObject = inputFile.files;
  for (let x of musicAddedObject) {
    const musicURL = URL.createObjectURL(x);
    const songObject = {
      title: `${x.name}`,
      musicSrc: `${musicURL}`,
    };
    arraySong.unshift(songObject);
  }
  showSongToList();
  counter = parseInt(counter) + musicAddedObject.length;
  activeSong(counter);
};

inputFile.addEventListener("input", addSong);
function playMusic(counter) {
  activeSong(counter);
  audio.src = arraySong[counter].musicSrc;
  songTitle.textContent = arraySong[counter].title;
  img.src = arraySong[counter].imgSrc;
  if (img.src.split("/").slice(-1)[0] == "undefined") {
    img.src = "/img/7841176.jpg";
  }
  audio.currentTime = range.value;
  audio.play();
  updateRange();
  allFuncButton[2].classList.add("hide");
  allFuncButton[1].classList.remove("hide");
}

function pushTheSong() {
  audio.pause();
  allFuncButton[2].classList.remove("hide");
  allFuncButton[1].classList.add("hide");
}
function nextSong() {
  reset();
  counter++;
  if (counter > arraySong.length - 1) {
    counter = 0;
  }
  playMusic(counter);
}

function prevSong() {
  reset();
  counter--;
  if (counter < 0) {
    counter = arraySong.length - 1;
  }
  playMusic(counter);
}
function updateRange() {
  audio.addEventListener("loadedmetadata", () => {
    range.max = audio.duration;
    const interval = setInterval(() => {
      range.value = audio.currentTime;
      updateTIme();
      if (audio.currentTime == audio.duration) {
        nextSong();
        clearInterval(interval);
      }
    }, 1000);
  });
}
function updateTIme() {
  let currentMin;
  let currentSec;
  let maxMin;
  let maxSec;

  currentMin = Math.floor(audio.currentTime / 60)
    .toString()
    .padStart(2, "0");
  currentSec = Math.floor(audio.currentTime % 60)
    .toString()
    .padStart(2, "0");
  allDuration[0].textContent = `${currentMin}:${currentSec}`;

  maxMin = Math.floor(audio.duration / 60)
    .toString()
    .padStart(2, "0");
  maxSec = Math.floor(audio.duration % 60)
    .toString()
    .padStart(2, "0");
  allDuration[1].textContent = `${maxMin}:${maxSec}`;
}
function currentPlay() {
  audio.currentTime = range.value;
  playMusic(counter);
}
function reset() {
  range.value = 0;
}
function playCurrentTime() {
  playMusic(counter);
}

showSongButton.addEventListener("click", () => {
  showSongButton.classList.toggle("bar-animating");
  if (showSongButton.classList.contains("bar-animating")) {
    header.style.animation = "toRight .5s forwards";
  } else {
    header.style.animation = "toLeft .7s forwards";
  }
});

function clickToPlay() {
  musicListContainerChildren.forEach((music) => {
    music.addEventListener("click", (e) => {
      counter = e.currentTarget.children[0].dataset.value;
      reset();
      playMusic(counter);
    });
  });
}
function activeSong(index) {
  musicListContainerChildren.forEach((musicList) => {
    musicList.classList.remove("active");
  });
  musicListContainerChildren[index].classList.add("active");
}

allFuncButton[0].addEventListener("click", prevSong);
allFuncButton[3].addEventListener("click", nextSong);
allFuncButton[1].addEventListener("click", pushTheSong);
allFuncButton[2].addEventListener("click", currentPlay);
range.addEventListener("input", playCurrentTime);
