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
const scoreDisplay = document.getElementById('score-display'); // Add a score display
let flippedCards = [];
let matchedCards = [];
let currentSet = 0;
let flippingAllowed = true;
let score = 0; // Initialize score

// Shuffle an array
function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create and display cards for the current set
function createCards() {
    cardContainer.innerHTML = '';
    const currentWordSet = shuffleArray(sightWordsSets[currentSet].concat(sightWordsSets[currentSet])); // Duplicate the words for matching pairs
    for (let word of currentWordSet) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.textContent = 'Click to reveal';
        card.addEventListener('click', () => flipCard(card));
        cardContainer.appendChild(card);
    }
}

// Use the Web Speech API to speak the word aloud in British English
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance();

    if (word === 'a') {
        utterance.text = 'uh';  // Schwa sound for "a"
    } else {
        utterance.text = word;
    }

    utterance.lang = 'en-GB';  // Set to British English
    speechSynthesis.speak(utterance);
}

// Flip card and check for a match
function flipCard(card) {
    if (!flippingAllowed || flippedCards.includes(card)) return;

    // Allow flipping only 2 cards at a time
    if (flippedCards.length < 2) {
        card.textContent = card.dataset.word;
        flippedCards.push(card);
        speakWord(card.dataset.word); // Speak the word after flipping

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if the two flipped cards match
function checkForMatch() {
    flippingAllowed = false;  // Disable further flipping until match is checked

    const [card1, card2] = flippedCards;
    if (card1.dataset.word === card2.dataset.word) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        card1.classList.add('matched');
        card2.classList.add('matched');
        updateScore();  // Update the score after a match
        flippingAllowed = true;

        // Check if all cards are matched to move to the next set
        if (matchedCards.length === sightWordsSets[currentSet].length * 2) {
            matchedCards = [];
            currentSet++;
            if (currentSet < sightWordsSets.length) {
                setTimeout(() => {
                    createCards(); // Load the next set
                }, 1000);
            } else {
                startButton.textContent = 'Game Over';
                startButton.disabled = true;
            }
        }
    } else {
        // If cards don't match, flip them back after a short delay
        setTimeout(() => {
            card1.textContent = 'Click to reveal';
            card2.textContent = 'Click to reveal';
            flippedCards = [];
            flippingAllowed = true;
        }, 1000);
    }
}

// Update the score when a match is made
function updateScore() {
    score += 10; // Add 10 points for each match
    scoreDisplay.textContent = `Score: ${score}`; // Update score on the display
}

// Start the game with the first set
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    score = 0;  // Reset score when game restarts
    scoreDisplay.textContent = `Score: ${score}`;  // Reset score display
    createCards();
});

// Initialize the game with the first set
createCards();
