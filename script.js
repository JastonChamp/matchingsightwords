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
let matchedCards = [];

function createCard(word) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = word;
    card.addEventListener('click', () => flipCard(card, word));
    return card;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(card, word) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.classList.add('matched');
        card.textContent = word;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            if (flippedCards[0].textContent === flippedCards[1].textContent) {
                matchedCards.push(...flippedCards);
                flippedCards = [];
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => {
                        card.textContent = '';
                        card.classList.remove('matched');
                    });
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}

function startGame() {
    startButton.disabled = true;
    cardsContainer.innerHTML = '';
    matchedCards = [];
    flippedCards = [];
    cards = [];

    shuffleArray(sightWords);

    for (let i = 0; i < sightWords.length; i++) {
        const card = createCard(sightWords[i]);
        cardsContainer.appendChild(card);
    }
}

startButton.addEventListener('click', startGame);
