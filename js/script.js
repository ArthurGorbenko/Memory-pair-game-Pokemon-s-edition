const valuesOfBackPos = [
  "20px 0px",
  "20px -180px",
  "20px -350px",
  "20px -525px",
  "-190px 0px",
  "-390px 0px",
  "-600px 0px",
  "-810px 0px"
];

let cards = document.getElementsByClassName("card");
const container = document.querySelector(".container");

for (let i = 0; i < cards.length; i++) {
  addElements(cards[i], i);
}

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

generateBackGrn(backs, valuesOfBackPos);

function generateBackGrn(elements, arrayOfBackGrnds) {
  let arrayOfElements = Array.from(elements);
  arrayOfElements.sort(function() {
    return 0.5 - Math.random();
  });
  arrayOfElements.forEach((element, index) => {
    if (index >= arrayOfBackGrnds.length) {
      element.style.backgroundPosition =
        arrayOfBackGrnds[index - arrayOfBackGrnds.length];
    } else {
      element.style.backgroundPosition = arrayOfBackGrnds[index];
    }
  });
}
let arrayOfFlipCards = [];

container.addEventListener("click", flip);

function flip(event) {
  let target = event.target;
  while (target != container) {
    toggleCard(target);
    if (target.className === "flipper flipped") {
      arrayOfFlipCards.push(target);
    }
    target = target.parentNode;
  }
  if (arrayOfFlipCards.length === 2) {
    checkIfSamePicture(arrayOfFlipCards);
    arrayOfFlipCards = [];
  }
}

function toggleCard(element) {
  element.classList.toggle("flipped");
}

function checkIfSamePicture(flippedCards) {
  const firstOpenedCard = 0;
  const secondOpenedCard = 1;
  if (
    flippedCards[firstOpenedCard].lastChild.style.cssText ===
      flippedCards[secondOpenedCard].lastChild.style.cssText &&
    flippedCards[firstOpenedCard].lastChild.dataset.numberOfElement !==
      flippedCards[secondOpenedCard].lastChild.dataset.numberOfElement
  ) {
    setTimeout(() => {
      doIfFindSame(flippedCards);
    }, 750);
  } else {
    setTimeout(() => {
      togleBoth(flippedCards);
    }, 750);
  }
}

function doIfFindSame(arrayOfCards) {
  arrayOfCards.forEach(el => el.remove());
}
function togleBoth(arr) {
  arr.forEach(el => toggleCard(el));
}
