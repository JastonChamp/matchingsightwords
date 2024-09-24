const sightWordsSets = [
    ['a', 'about', 'above', 'again', 'all'],
    ['also', 'are', 'be', 'came', 'day'],
    ['do', 'does', 'for', 'go', 'he'],
    ['her', 'his', 'how', 'I', 'in'],
    ['into', 'is', 'it', 'know', 'many'],
    ['name', 'not', 'now', 'of', 'on'],
    ['one', 'over', 'said', 'she', 'so'],
    ['some', 'story', 'the', 'their', 'then'],
    ['there', 'this', 'to', 'too', 'want'],
    ['was', 'were', 'what', 'when', 'white']
];

const cardContainer = document.querySelector('.card-row');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score-display');
let flippedCards = [];
let matchedCards = [];
let currentSet = 0;
let flippingAllowed = true;
let score = 0; // Initialize score

// Shuffle array
function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create and display cards with numbers before flipping
function createCards() {
    cardContainer.innerHTML = ''; // Clear the container
    const currentWordSet = shuffleArray(sightWordsSets[currentSet].concat(sightWordsSets[currentSet]));
    currentWordSet.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.textContent = index + 1; // Show card number initially
        card.style.visibility = 'visible'; // Ensure card is visible
        card.addEventListener('click', () => flipCard(card, index + 1)); // Pass the number
        cardContainer.appendChild(card);
    });
}

// Flip card logic with number replacement
function flipCard(card, cardNumber) {
    if (!flippingAllowed || flippedCards.includes(card)) return;

    if (flippedCards.length < 2) {
        card.textContent = card.dataset.word; // Replace number with word on flip
        card.classList.add('flipped');
        flippedCards.push(card);
        speakWord(card.dataset.word);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check for match
function checkForMatch() {
    flippingAllowed = false;

    const [card1, card2] = flippedCards;
    if (card1.dataset.word === card2.dataset.word) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        card1.classList.add('matched');
        card2.classList.add('matched');
        updateScore();

        flippingAllowed = true;
        if (matchedCards.length === sightWordsSets[currentSet].length * 2) {
            matchedCards = [];
            currentSet++;
            if (currentSet < sightWordsSets.length) {
                setTimeout(() => createCards(), 1000);
            } else {
                startButton.textContent = 'Game Over';
                startButton.disabled = true;
            }
        }
    } else {
        setTimeout(() => {
            card1.textContent = card1.dataset.index;  // Restore the number
            card2.textContent = card2.dataset.index;
            flippedCards = [];
            flippingAllowed = true;
        }, 1000);
    }
}

// Speak the word
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word === 'a' ? 'uh' : word);
    utterance.lang = 'en-GB';
    speechSynthesis.speak(utterance);
}

// Update score
function updateScore() {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Start game
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    createCards(); // Ensure cards are created when the game starts
});

// Initialize game on page load
createCards();


const cardContainer = document.querySelector('.card-row');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score-display');
let flippedCards = [];
let matchedCards = [];
let currentSet = 0;
let flippingAllowed = true;
let score = 0; // Initialize score

// Shuffle array
function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create and display cards
function createCards() {
    cardContainer.innerHTML = ''; // Clear the container
    const currentWordSet = shuffleArray(sightWordsSets[currentSet].concat(sightWordsSets[currentSet]));
    console.log('Current word set:', currentWordSet); // Debugging output
    for (let word of currentWordSet) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.textContent = ''; // Initially blank
        card.style.visibility = 'visible'; // Ensure card is visible
        card.addEventListener('click', () => flipCard(card));
        cardContainer.appendChild(card);
    }
}

// Flip card logic
function flipCard(card) {
    if (!flippingAllowed || flippedCards.includes(card)) return;

    if (flippedCards.length < 2) {
        card.textContent = card.dataset.word; // Show word on flip
        card.classList.add('flipped');
        flippedCards.push(card);
        speakWord(card.dataset.word);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check for match
function checkForMatch() {
    flippingAllowed = false;

    const [card1, card2] = flippedCards;
    if (card1.dataset.word === card2.dataset.word) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        card1.classList.add('matched');
        card2.classList.add('matched');
        updateScore();

        flippingAllowed = true;
        if (matchedCards.length === sightWordsSets[currentSet].length * 2) {
            matchedCards = [];
            currentSet++;
            if (currentSet < sightWordsSets.length) {
                setTimeout(() => createCards(), 1000);
            } else {
                startButton.textContent = 'Game Over';
                startButton.disabled = true;
            }
        }
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
            flippingAllowed = true;
        }, 1000);
    }
}

// Speak the word
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word === 'a' ? 'uh' : word);
    utterance.lang = 'en-GB';
    speechSynthesis.speak(utterance);
}

// Update score
function updateScore() {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Start game
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    createCards(); // Ensure cards are created when the game starts
});

// Initialize game on page load
createCards();
