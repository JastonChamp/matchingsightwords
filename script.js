// JavaScript code
const words = [
  'a', 'about', 'above', 'again', 'all', 'also', 'are', 'be', 'came', 'day',
  'do', 'does', 'for', 'go', 'he', 'her', 'his', 'how', 'I', 'in', 'into',
  'is', 'it', 'know', 'many', 'name', 'not', 'now', 'of', 'on', 'one', 'over',
  'said', 'she', 'so', 'some', 'story', 'the', 'their', 'then', 'there', 'this',
  'to', 'too', 'want', 'was', 'were', 'what', 'when', 'white'
];

const shuffledWords = shuffleArray([...words, ...words]); // Duplicate words for matching
const cardContainer = document.querySelector('.card-row');
const startButton = document.getElementById('start-button');

let cardsFlipped = 0;
let firstCard, secondCard;
let lockBoard = false;

// Shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create and append cards to the DOM
function createCards() {
  cardContainer.innerHTML = '';
  for (let word of shuffledWords) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.word = word;
    card.textContent = 'Click to reveal';
    card.addEventListener('click', flipCard);
    cardContainer.appendChild(card);
  }
}

// Flip a card to reveal its word
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check if two flipped cards match
function checkForMatch() {
  if (firstCard.dataset.word === secondCard.dataset.word) {
    disableCards();
    cardsFlipped += 2;
    if (cardsFlipped === shuffledWords.length) {
      alert('Congratulations! You matched all the cards.');
    }
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

// Reset the board for the next turn
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Add click event listener to the start button to create cards
startButton.addEventListener('click', () => {
  createCards();
  startButton.style.display = 'none'; // Hide the start button
});

// Initialize the game
createCards();
