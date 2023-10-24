// import
import {
  range,
  audio,
  playAgain,
  allDuration,
  header,
  showSongButton,
} from "./function.js";
import { arraySong } from "./function.js";
import { pushTheSong } from "./function.js";
import { allFuncButton, updateTIme, reset } from "./function.js";
// end
// ​declearation
const musicListContainer = document.querySelector(".music-list-container");
const file = document.querySelector("input[type='file']");
const img = document.querySelector("img");
let counter = 0;
const sortButton = document.getElementById("sortButton");
const songTitle = document.querySelector(".song-title");
const moreFunction = document.querySelectorAll(".more-function>i");
const inputFile = document.querySelector("input[type='file']");
const addSongButton = document.querySelector("button.add-song");

let musicListContainerChildren = [];
//  end of declearation

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

function sortItem(item) {
  item.sort((a, b) => {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    return 0;
  });
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

function currentPlay() {
  audio.currentTime = range.value;
  playMusic(counter);
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

sortButton.addEventListener("click", () => {
  sortItem(arraySong);
  showSongToList();
});
allFuncButton[0].addEventListener("click", prevSong);
allFuncButton[3].addEventListener("click", nextSong);
allFuncButton[1].addEventListener("click", pushTheSong);
allFuncButton[2].addEventListener("click", currentPlay);
range.addEventListener("input", playCurrentTime);

window.addEventListener("keypress", (e) => {
  if (e.keyCode == 32) {
    if (audio.paused) {
      playCurrentTime();
    } else {
      pushTheSong();
    }
  }
});
