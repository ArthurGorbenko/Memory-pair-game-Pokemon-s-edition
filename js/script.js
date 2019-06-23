const CLASSES_ADD_IMAGES = [
  "slowbro",
  "tangela",
  "weeppinbell",
  "snorlax",
  "joltenon",
  "pinsir",
  "pidgeot",
  "beedrill"
];

let cards = document.getElementsByClassName("card");

generateCardsStructure(cards);

function generateCardsStructure(arrOfCards){
  for (let i = 0; i < arrOfCards.length; i++) {
    addElements(arrOfCards[i], i);
  }
};

function addElements(element, i) {
  let flipper = document.createElement("div");
  flipper.className = "flipper";
  element.appendChild(flipper);

  let front = document.createElement("div");
  front.className = "front";
  flipper.appendChild(front);

  let back = document.createElement("div");
  back.className = "back";
  back.dataset.numberOfElement = i;
  flipper.appendChild(back);
}

let backs = document.querySelectorAll(".back");

generateBackGrn(backs, CLASSES_ADD_IMAGES);

function generateBackGrn(elements, arrrayOfClasses) {
  let arrayOfElements = Array.from(elements);
  arrayOfElements.sort(function() {
    return 0.5 - Math.random();
  });
  arrayOfElements.forEach((element, index) => {
    if (index >= arrrayOfClasses.length) {
      element.classList.add(arrrayOfClasses[index - arrrayOfClasses.length]);
    } else {
      element.classList.add(arrrayOfClasses[index]);
    }
  });
}
let arrayOfFlipCards = [];
let boardLock = false;
let countForMatches = 0;
const CONTAINER = document.querySelector(".container");
const FIRST_OPENED_CARD = 0;
const SECOND_OPENED_CARD = 1;
const CLASS_FOR_IMAGE = 1;

const flip = ({ target }) => {
  if (boardLock) {
    return null;
  }

  while (target != CONTAINER) {
    if (
      target.className === "flipper flipped" &&
      arrayOfFlipCards.length === 1 &&
      arrayOfFlipCards[FIRST_OPENED_CARD].lastChild.dataset.numberOfElement ===
        this.lastChild.dataset.numberOfElement
    ) {
      arrayOfFlipCards = [];
      return null;
    }
    toggleCard(target);
    if (target.className === "flipper flipped") {
      arrayOfFlipCards.push(target);
    }
    target = target.parentNode;
  }

  if (arrayOfFlipCards.length === 2) {
    boardLock = true;
    console.log(arrayOfFlipCards);
    checkIfSamePictures(arrayOfFlipCards);
    arrayOfFlipCards = [];
  }
};

CONTAINER.addEventListener("click", flip);

function toggleCard(element) {
  element.classList.toggle("flipped");
}

function checkIfSamePictures(flippedCards) {
  if (
    flippedCards[FIRST_OPENED_CARD].lastChild.classList[CLASS_FOR_IMAGE] ===
      flippedCards[SECOND_OPENED_CARD].lastChild.classList[CLASS_FOR_IMAGE] &&
    flippedCards[FIRST_OPENED_CARD].lastChild.dataset.numberOfElement !==
      flippedCards[SECOND_OPENED_CARD].lastChild.dataset.numberOfElement
  ) {
    countForMatches += 2;
    if (countForMatches === 16) {
      setTimeout(() => {
        reloadPageifWon();
      }, 750);
    }
    setTimeout(() => {
      doIfFindSame(flippedCards);
      boardLock = false;
    }, 750);
  } else {
    setTimeout(() => {
      togleBoth(flippedCards);
      boardLock = false;
    }, 750);
  }
}

function doIfFindSame(arrayOfCards) {
  arrayOfCards.forEach(el => el.remove());
}
function togleBoth(arr) {
  arr.forEach(el => toggleCard(el));
}
function reloadPageifWon() {
  alert("You won!");
  document.location.reload(true);
}
