/*
 * Create a list that holds all of your cards
 */
let icons = ['fa-diamond','fa-diamond',
                'fa-paper-plane-o','fa-paper-plane-o',
                'fa-anchor','fa-anchor',
                'fa-bolt','fa-bolt',
                'fa-cube','fa-cube',
                'fa-leaf','fa-leaf',
                'fa-bicycle','fa-bicycle',
                'fa-bomb','fa-bomb'];

// ${icons} is actually a Template Literal helped to create the card structure in JS
function cardSetup(icons) {
  return `<li class="card" data-card ="${icons}"><i class="fa ${icons}"></i></li>`;
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



 // To Initialize the Game
function initGame() {
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(icons).map(function(cards){
    return cardSetup(cards);

  });


  deck.innerHTML = cardHTML.join('');
}

initGame();

// This is a variable which represents all of the cards

//This stores cards in a structure
let openCards =[];
//We need to initialize the moves as being zero
let moveCounter = document.querySelector('.moves');
let moves = 0;

// let matchMaker= document.getElementsByClassName("match");
//This is the array ill be putting cards that have a class of match.
let matchCards=[];

function cardsListener() {
	const wholeCardSet = document.querySelectorAll('.card');
  wholeCardSet.forEach(function (cards) {
    // The functions name is called cards .
    // The function called cards represents what happens for all cards on an indivual level.
    //An event listener for each card : when clicked should opened.
     cards.addEventListener('click', function (cardsCharacteristics) {
       //In the event that a card has a class of open or show we dont want it to
       //open again thats why we needed to create the if and nest the info below it.
       if(!cards.classList.contains('open') && !cards.classList.contains('show') && !cards.classList.contains('match') && openCards.length <= 1 ){
         // openCards.length <= 1  I ONLY WANT TWO CARDS TO FLIP
         // so I had to set it to less than or equal to 1 because an array is a  array is zero indexed (starts at 0),
         // the length will still be counting from 1. So with items[0] and [1], the length will equal 2. and this works perfect!
         //This pushes current card into the openCards array when you open a card
         openCards.push(cards);
         //This line helped to flip the card open and also to show the icons by using the functions name .
         cards.classList.add('open' , 'show');

         // The timer will begin when the openCards array has one item in it.
         //Timer is activated by this if statement
         if(openCards.length == 1) {
           beginTimer();
         }

         if(openCards.length ==2) {
           moveformula();
           if (openCards[0].dataset.card == openCards[1].dataset.card) {
             openCards[0].classList.add('match');
             openCards[0].classList.add('open');
             openCards[0].classList.add('show');

             openCards[1].classList.add('match');
             openCards[1].classList.add('open');
             openCards[1].classList.add('show');

            openCards = [];

            matchCards.push(cards);
            timerPause();
            congratsModal();

           } else {
             // The setTimeout is the delay which makes the card dispear.
             setTimeout(function(){
               openCards.forEach(function(cards){
                 cards.classList.remove('open' , 'show');
               });
               // the openCards array emptys out the cards that we just flipped.
               openCards =[];
             }, 1000);
           }
         }
       }
     });
  });
}

// This is the move counter formula
// This is the source I followed to help me https://www.w3schools.com/js/tryit.asp?filename=tryjs_function_counter3
function moveformula() {
  moves++;
  moveCounter.innerHTML = moves;
  starRating();

};

// Reset moves
function resetMoves(){
  moves=0;
  moveCounter.innerHTML = moves;
}

let score;

// STAR RATINGS
function starRating(){
  let starOne = document.querySelector('.one');
  let starTwo = document.querySelector('.two');
  let starThree = document.querySelector('.three');
  if (moves <= 15){
    // Three Stars till 15 moves
    // This is also being used for when you press the rest button all the stars will light up
    starOne.style.visibility="visible";
    starTwo.style.visibility="visible";
    starThree.style.visibility="visible";
    score = 3;
  } else if (moves <= 16 && moves<= 19 ) {
    // Two Stars if its between 16 and 19 moves
    starOne.style.visibility="visible";
    starTwo.style.visibility="visible";
    starThree.style.visibility="hidden";
    score = 2;
  } else if (moves >= 20){
    // One star if it is at least 20 and beyond
    starOne.style.visibility="visible";
    starTwo.style.visibility="hidden";
    starThree.style.visibility="hidden";
    score = 1;
  }
};


// Timer
let seconds = 0;
let minute = 0;
let clock;
// having the clock off by default allows us to turn it on when we need to
let clockOn = false;


let timePassed = document.querySelector('.timer');


function beginTimer(){
  if (clockOn == false){
    clock= setInterval(timerSetup,1000);
    clockOn = true;
  } else {
    return;
  }

};

function pauseTimer() {
clearInterval(clock);
};

function resetTimer() {
  clearInterval(clock);
  seconds = 0;
  minute = 0;
  timePassed.innerHTML = 'Time: 00:00';
  clockOn = false;
  // here we need to switch the clock off

};


function timerSetup(){
  seconds++;

  if (seconds <= 1 || seconds <= 9){
     seconds = `0${seconds}`;
     }

    if(seconds === 60){
        minute++;
        seconds="00"
    }

  // this is to display the time and attach it to the HTML
  timePassed.innerHTML = 'Time: ' + minute + ':' + seconds;
};


function timerPause() {

  if(matchCards.length === 8){
    pauseTimer();

  }

};

//Reset Cards
//.deck should not have a class of .open .show or .match

function resetDeck(){
  let deck = document.querySelector('.deck');
  while (deck.hasChildNodes()) {
  	deck.removeChild(deck.lastChild)
  }
  // initGame shuffles the cards as seen above
 	initGame()
	cardsListener()
};

// Reset Button
let resetButton = document.querySelector('.restart');

resetButton.addEventListener('click', resetActions);

function resetActions() {
  resetTimer();
  resetMoves();
  starRating(); // Reseting the cards is built in the forumla so less than 15 moves will always be 3 visible stars
  resetDeck();
  matchCards=[];
  openCards =[];
  console.log("click");

};

// The modal
// Calling the modalFooter
let modal = document.querySelector('.modal');
// modal modalHeader
let modalHeader = document.querySelector('.modalHeader');
// modal modalContent
let modalContent = document.querySelector('.modalContent');
// modal moves
let modalMoves = document.querySelector('.modalMoves');
// modal Time
let modalTime = document.querySelector('.modalTime');
// modal moves
let modalScore = document.querySelector('.modalScore');

// modal modalFooter
let modalFooter = document.querySelector('.modalFooter');



function removehide() {
    let hideClass = document.getElementById('modal');
    hideClass.classList.remove('hide');
}
function addhide() {
    let hideClass = document.getElementById('modal');
    hideClass.classList.add('hide');
}

function movesModal(){
  modalMoves.innerHTML= `Moves: ${moves}`;
}

function timeModal(){
  modalTime.innerHTML= `Time: ${minute + ':' + seconds}`;
}

function scoreModal(){
  modalScore.innerHTML= `Score: ${score} star out of 3 stars`;
}


// play again button
let playAgain = document.querySelector('.playAgain');

playAgain.addEventListener('click', function(playAgainReset){
  resetTimer();
  resetMoves();
  starRating(); // Reseting the cards is built in the forumla so less than 15 moves will always be 3 visible stars
  resetDeck();
  addhide();
  matchCards=[];
  openCards =[];
  // initGame();
  // cardsListener();
  // congratsModal();
});
//cancel Button
let modalCancelBtn = document.querySelector('.cancel');

modalCancelBtn.addEventListener('click',function(cancelBtn){
  let hideClass = document.getElementById('modal');
  hideClass.classList.add('hide');
});

//Close button on the top right of modal
let xButton = document.querySelector('.modalCloseBtn');

xButton.addEventListener('click',function(closeButton){
  let hideClass = document.getElementById('modal');
  hideClass.classList.add('hide');
});


function congratsModal(){
  if(matchCards.length === 8){
    removehide();
    movesModal();
    timeModal();
    scoreModal();

  }
};

cardsListener();
