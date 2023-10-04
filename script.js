// JavaScript code
const sightWordsSets = [
    ['a', 'about', 'above', 'again', 'all'],
    ['also', 'are', 'be', 'came', 'day'],
    ['do', 'does', 'for', 'go', 'he'],
    ['her', 'his', 'how', 'I', 'in'],
    ['into', 'is', 'it', 'know', 'many'],
    ['name', 'not', 'now', 'of', 'on'],
    ['one', 'over', 'said', 'it', 'know'],
    ['many', 'name', 'not', 'now', 'of'],
    ['on', 'one', 'over', 'said', 'she'],
    ['so', 'some', 'story', 'the', 'their'],
    ['then', 'there', 'this', 'to', 'too'],
    ['want', 'was', 'were', 'what', 'when', 'white']
];

const cardContainer = document.querySelector('.card-row');
const startButton = document.getElementById('start-button');
let flippedCards = [];
let matchedCards = [];
let currentSet = 0;
let currentWordIndex = 0;
let currentWordSet = [];

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
    currentWordSet = shuffleArray(sightWordsSets[currentSet].concat(sightWordsSets[currentSet])); // Add two of each word
    for (let word of currentWordSet) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.textContent = 'Click to reveal';
        card.addEventListener('click', () => flipCard(card));
        cardContainer.appendChild(card);
    }
}

// Handle card click event
function flipCard(card) {
    if (!flippedCards.includes(card)) {
        card.textContent = card.dataset.word;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.dataset.word === card2.dataset.word) {
                matchedCards.push(card1, card2);
                flippedCards = [];
                // Indicate correct match with background color
                card1.classList.add('matched');
                card2.classList.add('matched');
            } else {
                setTimeout(() => {
                    card1.textContent = 'Click to reveal';
                    card2.textContent = 'Click to reveal';
                    flippedCards = [];
                }, 1000);
            }
        }

        if (matchedCards.length === currentWordSet.length) {
            // All cards are matched, go to the next set of words
            matchedCards = [];
            currentSet++;
            currentWordIndex = 0;
            if (currentSet < sightWordsSets.length) {
                createCards();
                startButton.disabled = false;
            } else {
                startButton.textContent = 'Game Over';
                startButton.disabled = true;
            }
        }
    }
}

// Handle start button click event
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    createCards();
});

// Initialize the game
createCards();
