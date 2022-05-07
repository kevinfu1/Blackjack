const DECK = new Array(52);
const suitVal = ["spade", "heart", "diamond", "club"];
let index;
let currPos = 0;
let playerSum = 0;
let dealerSum = 0;
let addCardCt = 0;

//card object
class Card {
  constructor(number, suit) {
    this.number = number;
    this.suit = suit;
  }
}

//creates deck
let cardCt = 0;
for (let i = 0; i <= 3; i++) {
  for (let j = 1; j <= 13; j++) {
    DECK[cardCt] = new Card(j, suitVal[i]);
    cardCt++;
  }
}

const container = document.getElementById("container");
const dealBtn = document.getElementById("deal");
const hitBtn = document.getElementById("hit");
const standBtn = document.getElementById("stand");
const restartBtn = document.getElementById("restart");

function createCard(number, suit) {
  const cardEl = document.createElement("div");

  cardEl.classList.add("card");

  cardEl.innerHTML = `
    <div class="card__inner">
      <div class="card__face card__face--front">
        <img class="playercard" src = "cards/${number}${suit}.png" alt="" />
      </div>
      <div class="card__face card__face--back">
        <img class="playercard" src = "cards/back.png" alt="" />
      </div>
    </div>
  `;

  container.appendChild(cardEl);
}

//Fisher-Yates shuffle
function shuffle(cards) {
  for (let i = 0; i < cards.length; i++) {
    const rnd = (Math.random() * i) | 0;
    const tmp = cards[i];
    cards[i] = cards[rnd];
    cards[rnd] = tmp;
  }
}

function start() {
  window.location.href = "./blackjack.html";
}

shuffle(DECK);

for (let i = 0; i < DECK.length; i++) {
  createCard(DECK[i].number, DECK[i].suit);
}

let cards = document.querySelectorAll(".card");

for (let i = 0; i < cards.length; i++) {
  cards[i].style.top = 5 - i / 20 + "%";
  cards[i].style.left = 20 - i / 100 + "%";
  //cards[i].style.transform = "rotateX(30deg)";
}

dealBtn.addEventListener("click", () => {
  cards[0].style.left = "45%";
  cards[0].style.top = "60%";
  setTimeout(
    () => cards[0].querySelector(".card__inner").classList.toggle("is-flipped"),
    250
  );
  playerSum += DECK[0].number;
  setTimeout(() => {
    cards[1].style.left = "45%";
    cards[1].style.top = "10%";
  }, 500);
  setTimeout(
    () => cards[1].querySelector(".card__inner").classList.toggle("is-flipped"),
    750
  );
  dealerSum += DECK[1].number;
  setTimeout(() => {
    cards[2].style.left = "47%";
    cards[2].style.top = "60%";
  }, 1000);
  setTimeout(
    () => cards[2].querySelector(".card__inner").classList.toggle("is-flipped"),
    1250
  );
  playerSum += DECK[2].number;
  setTimeout(() => {
    cards[3].style.left = "47%";
    cards[3].style.top = "10%";
  }, 1500);

  document.getElementById("deal").style.visibility = "hidden";
  setTimeout(() => {
    document.getElementById("playerSum").style.visibility = "visible";
    document.getElementById("dealerSum").style.visibility = "visible";
    document.getElementById("playerSum").textContent = playerSum;
    document.getElementById("dealerSum").textContent = dealerSum;
  }, 2500);
  setTimeout(bustChecker, 3500);
  currPos = 4;
});

hitBtn.addEventListener("click", () => {
  addCard("player");
});

standBtn.addEventListener("click", () => {
  cards[3].querySelector(".card__inner").classList.toggle("is-flipped");
  // setTimeout(
  //   () => cards[3].querySelector(".card__inner").classList.toggle("is-flipped"),
  //   250
  // );
  dealerSum += DECK[3].number;
  document.getElementById("dealerSum").textContent = dealerSum;
  let loopCt = 0;
  while (dealerSum < 17) {
    loopCt++;
    setTimeout(addCard("dealer"), 500 * loopCt);
  }
  setTimeout(() => {
    if (dealerSum > 21) {
      winner("player");
    } else if ((playerSum == 21 && dealerSum != 21) || playerSum > dealerSum) {
      winner("player");
    } else if (
      dealerSum == 21 ||
      dealerSum > playerSum ||
      dealerSum == playerSum
    ) {
      winner("dealer");
    }
  }, 1000);
});

function addCard(player) {
  let cardEl = cards[currPos];
  if (player == "player") {
    addCardCt++;
    cardEl.style.left = 47 + (currPos - 3) * 2 + "%";
    cardEl.style.top = "60%";

    setTimeout(
      () => cardEl.querySelector(".card__inner").classList.toggle("is-flipped"),
      500
    );
    playerSum += DECK[currPos].number;
    document.getElementById("playerSum").textContent = playerSum;
  } else {
    cardEl.style.left = 47 + (currPos - 3 - addCardCt) * 2 + "%";
    cardEl.style.top = "10%";
    setTimeout(
      () => cardEl.querySelector(".card__inner").classList.toggle("is-flipped"),
      500
    );
    dealerSum += DECK[currPos].number;
    document.getElementById("dealerSum").textContent = dealerSum;
  }
  currPos++;
  bustChecker();
}

function bustChecker() {
  if (playerSum == 21) {
    winner("player");
    //reveals dealer's hidden card
    setTimeout(
      () =>
        cards[3].querySelector(".card__inner").classList.toggle("is-flipped"),
      250
    );
  }
  if (playerSum > 21) {
    winner("dealer");
    //reveals dealer's hidden card
    setTimeout(
      () =>
        cards[3].querySelector(".card__inner").classList.toggle("is-flipped"),
      250
    );
  }
}
function winner(player) {
  if (player == "player") {
    document.getElementById("winner").textContent = "You Win!";
  } else if (player == "dealer") {
    document.getElementById("winner").textContent = "Dealer Wins!";
  }

  setTimeout(function () {
    document.querySelector(".display").style.visibility = "visible";

    //win animation
    let id = null;
    const elem = document.getElementById("winner");
    elem.style.visibility = "visible";
    let font = 50;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
      if (font == 120) {
        clearInterval(id);
      } else {
        font++;
        elem.style.fontSize = font + "px";
      }
    }

    //dim background
    let node = document.querySelector(".background");
    node.style.filter = "brightness(50%)";
    node = document.querySelectorAll(".card");
    node.forEach((cardEl) => {
      cardEl.style.filter = "brightness(50%)";
    });
    node = document.querySelector(".actions");
    node.style.filter = "brightness(50%)";
    node = document.querySelector(".sums");
    node.style.filter = "brightness(50%)";

    document.getElementById("dealerSum").textContent = dealerSum;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
  }, 500);
}

restartBtn.addEventListener("click", () => {
  cards.forEach((elem) => {
    elem.remove();
  });
  shuffle(DECK);

  for (let i = 0; i < DECK.length; i++) {
    createCard(DECK[i].number, DECK[i].suit);
  }

  cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.top = 5 - i / 20 + "%";
    cards[i].style.left = 20 - i / 100 + "%";
    //cards[i].style.transform = "rotateX(30deg)";
  }

  let elem = document.querySelector(".background");
  elem.style.filter = "brightness(100%)";
  elem = document.querySelector(".actions");
  elem.style.filter = "brightness(100%)";
  elem = document.querySelector(".sums");
  elem.style.filter = "brightness(100%)";

  currPos = 0;
  playerSum = 0;
  dealerSum = 0;
  addCardCt = 0;
  document.getElementById("playerSum").style.visibility = "hidden";
  document.getElementById("dealerSum").style.visibility = "hidden";
  document.getElementById("deal").style.visibility = "visible";
  elem = document.querySelector(".display");
  elem.style.visibility = "hidden";
  document.getElementById("winner").style.visibility = "hidden";
  document.getElementById("winner").style.fontSize = "50px";
  document.getElementById("hit").disabled = false;
  document.getElementById("stand").disabled = false;
});

// let rand = getRandomInt(DECK.length);
// cardArr.push(DECK[rand]);
// index = cardArr.length - 1;
// DECK.splice(rand, 1);
// let cardEl = document.getElementById(player + "card" + (index + 1));
// cardEl.src =
//   "./cards/" + cardArr[index].number + cardArr[index].suit + ".png";
// cardEl.style.visibility = "visible";
// document.getElementById("playerSum").style.visibility = "visible";
// document.getElementById("dealerSum").style.visibility = "visible";

// function deal() {
//   alert(cards[51].textContent);
//   addCard(HAND, "player");
//   addCard(DEALER, "dealer");
//   document.getElementById("blank").style.visibility = "visible";
//   addCard(HAND, "player");
//   addCard(DEALER, "dealer");
//   document.getElementById("dealerSum").innerText = DEALER[1].number;
//   document.getElementById("dealercard1").style.visibility = "hidden";
//
// }

// function revCard() {
//   let id = null;
//   const elem = document.getElementById("blank");
//   let deg = 0;
//   clearInterval(id);
//   id = setInterval(frame, 20);
//   function frame() {
//     if (deg == 270) {
//       clearInterval(id);
//       document.getElementById("dealercard1").style.zIndex = 1;
//       document.getElementById("dealercard1").style.visibility = "visible";
//     } else {
//       deg += 15;
//       elem.style.transform = rotateY(deg + "deg");
//     }
//   }
// }
// function cardAnimP(cardEl) {
//   let id = null;
//   const elem = cardEl;
//   let computedStyle = getComputedStyle(cardEl);
//   let curposx = computedStyle.left;
//   console.log(Number(curposx));
//   let posx = curposx + 200;
//   // let posy = -200;
//   clearInterval(id);
//   id = setInterval(frame, 5);
//   function frame() {
//     if (posx == Number(curposx)) {
//       clearInterval(id);
//     } else {
//       posx -= 2;
//       //posy += 2.5;
//       //elem.style.top = posy + "%";
//       elem.style.left = posx + "%";
//     }
//   }
// }
// function cardAnimD(cardEl) {
//   let id = null;
//   const elem = cardEl;
//   let posx = screen.width;
//   let posy = 0;
//   clearInterval(id);
//   id = setInterval(frame, 5);
//   function frame() {
//     if (posy == 160) {
//       clearInterval(id);
//     } else {
//       posx -= 8;
//       posy += 4;
//       elem.style.top = posy + "px";
//       elem.style.left = posx + "px";
//     }
//   }
// }
