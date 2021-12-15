/* Game rules 
----------------
There will be only two players. One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.*/

// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

/* second part (after scenario 4)
1. need to set a game logic for computer to determine whether draw one more card 
if sum of number <= 16 -> draw 
2. if sum of number >=17 --> stand 
*/

/*third part 
player decides whether to hit or stand 

1. if hit (game mode changes to deal another card), calculate sum of cards 
2. if stand (game mode remains), calculate sum of cards and decide who is the winner
*/

/* to check sum of cards- need a helper function*/

//1. to make a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
//To get a deck of shuffled decks
var deckOfCards = makeDeck();
var shuffledDeck = shuffleCards(deckOfCards);

// to assign value to deck of cards from 2 to j,q,k
var assignValueToCards = function (rankOfCards) {
  var valueOfCard = 0;
  //face value of cards
  if (rankOfCards >= 2 && rankOfCards <= 10) {
    valueOfCard = rankOfCards;
  }
  if (rankOfCards >= 11 && rankOfCards <= 13) {
    valueOfCard = 10;
  }
  return valueOfCard;
};

var toCheckIfBlackJack = function (playersHand, computersHand) {
  var outputMsg = `Player's Hand is ${playersHand[0].name} of ${playersHand[0].suit} and ${playersHand[1].name} of ${playersHand[1].suit} . Dealer's Hand is ${computersHand[0].name} of ${computersHand[0].suit} and ${computersHand[1].name} of ${computersHand[1].suit}`;
  if (
    playersHand[0].rank + playersHand[1].rank == 21 &&
    computersHand[0].rank + computersHand[1].rank == 21
  ) {
    return `BlackJack!! ${outputMsg}`;
  }
  if (playersHand[0].rank + playersHand[1].rank == 21) {
    return `Player has BlackJack!! Player wins. ${outputMsg}`;
  }
  if (computersHand[0].rank + computersHand[1].rank == 21) {
    return `Dealer has BlackJack!! Dealer wins. ${outputMsg}`;
  }
};

var main = function (input) {
  //to get 2 cards for each player and computer
  var playerCards = deckOfCards.splice(0, 2);
  var computerCards = deckOfCards.splice(0, 2);

  console.log(playerCards);
  console.log(computerCards);

  return toCheckIfBlackJack(playerCards, computerCards);
};

//test
console.log(main());
