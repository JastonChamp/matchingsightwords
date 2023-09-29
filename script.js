// script.js
const words = [
  'a', 'about', 'above', 'again', 'all', 'also', 'are', 'be', 'came', 'day',
  'do', 'does', 'for', 'go', 'he', 'her', 'his', 'how', 'I', 'in', 'into',
  'is', 'it', 'know', 'many', 'name', 'not', 'now', 'of', 'on', 'one', 'over',
  'said', 'she', 'so', 'some', 'story', 'the', 'their', 'then', 'there', 'this',
  'to', 'too', 'want', 'was', 'were', 'what', 'when', 'white'
];

const shuffledWords = [...words, ...words].sort(() => 0.5 - Math.random());

const grid = document.querySelector('.grid');
let flippedCards = [];
let matchedWords = [];

function createCard(word) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.word = word;
  card.addEventListener('click', () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedWords.includes(card.dataset.word)) {
    card.classList.toggle('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.dataset.word === secondCard.dataset.word) {
        matchedWords.push(firstCard.dataset.word);
        if (matchedWords.length === words.length) {
          alert('Congratulations! You matched all the words!');
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
        }, 1000);
      }
      flippedCards = [];
    }
  }
}

shuffledWords.forEach((word) => {
  const card = createCard(word);
  grid.appendChild(card);
});
