// script.js
const sightWords = [
  'a', 'about', 'above', 'again', 'all', 'also', 'are', 'be', 'came', 'day', 'do',
  'does', 'for', 'go', 'he', 'her', 'his', 'how', 'I', 'in', 'into', 'is', 'it',
  'know', 'many', 'name', 'not', 'now', 'of', 'on', 'one', 'over', 'said', 'she',
  'so', 'some', 'story', 'the', 'their', 'then', 'there', 'this', 'to', 'too',
  'want', 'was', 'were', 'what', 'when', 'white'
];

const cardsContainer = document.getElementById('cards-container');
const startButton = document.getElementById('start-button');

let cards = [];
let flippedCards = [];
let matchedWords = [];

function createCard(word) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.word = word;
  card.addEventListener('click', () => flipCard(card));
  return card;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard(card) {
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedWords.includes(card.dataset.word)) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.dataset.word === card2.dataset.word) {
        matchedWords.push(card1.dataset.word);
        flippedCards = [];

        if (matchedWords.length === sightWords.length) {
          alert('Congratulations! You matched all the words.');
          startButton.disabled = false;
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  }
}

function startGame() {
  startButton.disabled = true;
  cardsContainer.innerHTML = '';
  matchedWords = [];
  flippedCards = [];
  cards = [];

  shuffleArray(sightWords.slice(0, 5)); // Take 5 random words
  sightWords.slice(0, 5).forEach(word => {
    cards.push(createCard(word));
    cards.push(createCard(word));
  });

  shuffleArray(cards);

  cards.forEach(card => cardsContainer.appendChild(card));
}

startButton.addEventListener('click', startGame);
