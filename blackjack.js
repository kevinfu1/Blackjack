const DECK = [];
const HAND = [];
var suitVal = ["spade", "heart", "diamond", "club"];

function card(number, suit) {
  return number + suitVal[suit];
}
function createDeck() {
  const cardCt = 0;
  for (var i = 0; i <= 3; i++) {
    for (var j = 1; j <= 13; j++) {
      DECK[cardCt] = new card(j, i);
      cardCt++;
    }
  }
}
function start() {
    createDeck();
    addCard(HAND);
    addCard(HAND);

}
function addCard(cardArr) {
    var index;
    const rand = getRandomInt(DECK.length);
    cardArr.push(DECK[rand]); 
    index = cardArr.length-1;
    DECK.splice(rand, 1);
    document.getElementById("card" + index).src = "./cards/" + cardArr[index] + ".png";
}
function getRandomInt(max) {
    Math.floor(Math.random()*max);
}

var cardEl = document.getElementById("card" + "1");
function tester() {
  cardEl.src = "./cards/6diamond.png";
  console.log(cardEl.src);
}
