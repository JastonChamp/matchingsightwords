// JavaScript code
const sightWords = [
  'a', 'about', 'above', 'again', 'all', 'also', 'are', 'be', 'came', 'day',
  'do', 'does', 'for', 'go', 'he', 'her', 'his', 'how', 'I', 'in', 'into', 'is',
  'it', 'know', 'many', 'name', 'not', 'now', 'of', 'on', 'one', 'over', 'said',
  'she', 'so', 'some', 'story', 'the', 'their', 'then', 'there', 'this', 'to',
  'too', 'want', 'was', 'were', 'what', 'when', 'white'
];

const cardContainer = document.querySelector('.card-row');
const startButton = document.getElementById('start-button');
let flippedCards = [];
let matchedCards = [];
let shuffledWords = [];

function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create and append cards to the DOM
function createCards() {
  cardContainer.innerHTML = '';
  for (let word of shuffledWords) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.word = word;
    card.textContent = 'Click to reveal';
    cardContainer.appendChild(card);
  }
}

// Handle card click event using event delegation
cardContainer.addEventListener('click', (event) => {
  const card = event.target;
  if (
    card.classList.contains('card') &&
    !card.classList.contains('flipped') &&
    flippedCards.length < 2
  ) {
    card.textContent = card.dataset.word;
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.dataset.word === card2.dataset.word) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === shuffledWords.length) {
          // All cards are matched, reset the game
          matchedCards = [];
          startButton.textContent = 'Next Set of Words';
          startButton.disabled = false;
        }
      } else {
        setTimeout(() => {
          card1.textContent = 'Click to reveal';
          card2.textContent = 'Click to reveal';
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  }
});

// Handle start button click event
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  // Shuffle the sight words
  shuffledWords = shuffleArray(sightWords.slice(0, 10)); // Take the first 10 words
  createCards();
});

// Initialize the game
createCards();
