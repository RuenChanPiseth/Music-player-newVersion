// import
// end
const functionButton = document.querySelector("button.function-button");
export const header = document.querySelector("header");
export const displayFuntion = document.querySelector(".function-display");
export const allFuncButton = document.querySelectorAll(".next-prev>i");
export const range = document.querySelector("input[type='range']");
export const audio = document.querySelector("audio");
export const allDuration = document.querySelectorAll(".range-container>p");
export let playAgain = 0;
export const showSongButton = document.querySelector(".show-more-song");
export const optionButtons = document.querySelectorAll("button.option-button");
const Interface = document.querySelector("div.interface");
const InterfaceButtons = document.querySelectorAll("div.interface>button");
const backgroundColor = document.querySelector(".background-color");
const xmark = document.getElementById("xmark");
const inputColor = document.getElementById("input-color");
const container = document.querySelector("div.container");
const backgroundImg = document.querySelector(".background-img");
const backgroundImgButtons = document.querySelectorAll(
  ".background-img>button"
);
const linearGrandien = document.querySelector(".linear-gradien");
const backgroundImgInput = document.querySelectorAll(".background-img>input");
const inputColorLinear = document.querySelectorAll(".linear-gradien>input");
let Left = 0,
  Top = 0;
export const arraySong = [
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

export function pushTheSong() {
  audio.pause();
  allFuncButton[2].classList.remove("hide");
  allFuncButton[1].classList.add("hide");
}
export function updateTIme() {
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

export function reset() {
  range.value = 0;
}

function toggleClass(element, classes) {
  element.classList.toggle(classes);
}
functionButton.onclick = () => {
  toggleClass(displayFuntion, "hide");
  Interface.classList.add("hide");
  backgroundImg.classList.add("hide");
  container.style.opacity = "1";
};
showSongButton.onclick = () => {
  displayFuntion.classList.add("hide");
  Interface.classList.add("hide");
  backgroundImg.classList.add("hide");
  container.style.opacity = "1";
};

// for each button
optionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayFuntion.classList.add("hide");
  });
});
InterfaceButtons.forEach((interfaceButton) => {
  interfaceButton.addEventListener("click", () => {
    Interface.classList.add("hide");
  });
});
backgroundImgButtons.forEach((imgButton) => {
  imgButton.addEventListener("click", () => {
    backgroundImg.classList.add("hide");
    container.style.opacity = "1";
  });
});
// end of button
optionButtons[1].addEventListener("click", () => {
  Interface.classList.remove("hide");
});
InterfaceButtons[0].addEventListener("click", () => {
  backgroundColor.classList.remove("hide");
  container.style.opacity = ".5";
});
xmark.onclick = () => {
  backgroundColor.classList.add("hide");
  container.style.opacity = "1";
};

function showBackgroundImg() {
  backgroundImg.classList.remove("hide");
  container.style.opacity = ".5";
}
function changeBackgroundColor() {
  container.style.background = inputColor.value;
}

function imgURlFun(ele) {
  const file = backgroundImgInput[0].files[0];
  const imgUrl = URL.createObjectURL(file);
  ele.style.background = `url(${imgUrl})`;
}
// add eventListenner
backgroundImgButtons[0].addEventListener("click", () => {
  backgroundImgInput[0].click();
});
backgroundImgInput[0].oninput = () => {
  imgURlFun(container);
};
backgroundImgButtons[1].addEventListener("click", () => {
  linearGrandien.classList.remove("hide");
  showSongButton.classList.toggle("bar-animating");
  header.style.animation = "toLeft .7s forwards";
});
linearGrandien.children[2].addEventListener("click", () => {
  linearGrandien.classList.add("hide");
});
inputColorLinear.forEach((color) => {
  color.addEventListener("input", () => {
    container.style.background = `linear-gradient(to right, ${inputColorLinear[0].value},${inputColorLinear[1].value} )`;
  });
});
inputColor.addEventListener("input", changeBackgroundColor);
InterfaceButtons[1].addEventListener("click", showBackgroundImg);
