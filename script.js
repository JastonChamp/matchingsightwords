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
    card.textContent = word; // Set the sight word as the text content
    card.addEventListener('click', flipCard);
    cardContainer.appendChild(card);
  }
}

// Handle card click event
function flipCard(event) {
  const card = event.target;
  card.classList.add('flipped');
  card.removeEventListener('click', flipCard);
}

// Handle start button click event
startButton.addEventListener('click', () => {
  // Shuffle the sight words
  shuffledWords = shuffleArray(sightWords);
  createCards();
});

// ... (rest of the code)
