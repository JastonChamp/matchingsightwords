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
const setSelect = document.getElementById('set-select');
const scoreDisplay = document.getElementById('score-display');
const progressBar = document.getElementById('progress-bar');
let flippedCards = [];
let matchedCards = [];
let currentSet = null;  // No set selected initially
let flippingAllowed = true;
let score = 0; // Initialize score
let totalCardsInSet = 0; // Track total cards in the set for the progress bar

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
    if (currentSet === null) {
        alert('Please select a word set to start the game!');
        return;
    }

    cardContainer.innerHTML = ''; // Clear the container
    const currentWordSet = shuffleArray(sightWordsSets[currentSet].concat(sightWordsSets[currentSet]));
    totalCardsInSet = currentWordSet.length; // Update total cards
    currentWordSet.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.dataset.index = index + 1; // Store card index for resetting numbers
        card.textContent = index + 1; // Show card number initially
        card.style.visibility = 'visible'; // Ensure card is visible
        card.addEventListener('click', () => flipCard(card)); // Pass the card
        cardContainer.appendChild(card);
    });
    updateProgressBar(); // Reset progress bar at the start of the game
}

// Flip card logic with number replacement
function flipCard(card) {
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
        updateProgressBar();

        flippingAllowed = true;
        if (matchedCards.length === sightWordsSets[currentSet].length * 2) {
            matchedCards = [];
            setTimeout(() => alert('Great job! You completed the set!'), 300); // Delayed for smoother experience
            startButton.disabled = false; // Enable the start button for replay
        }
    } else {
        setTimeout(() => {
            card1.textContent = card1.dataset.index;  // Restore the number
            card2.textContent = card2.dataset.index;  // Restore the number
            flippedCards = [];
            flippingAllowed = true;
        }, 1000);
    }
}

// Speak the word with special pronunciation for "the" with the schwa sound /ðə/
function speakWord(word) {
    let utterance;

    // Special pronunciation for "the" with schwa sound /ðə/
    if (word === 'the') {
        utterance = new SpeechSynthesisUtterance('thuh'); // Mimicking the schwa sound for "the"
    } else if (word === 'a') {
        utterance = new SpeechSynthesisUtterance('uh'); // Mimicking the schwa sound for "a"
    } else {
        utterance = new SpeechSynthesisUtterance(word);
    }

    utterance.lang = 'en-GB'; // UK English pronunciation
    speechSynthesis.speak(utterance);
}

// Update score
function updateScore() {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Update the progress bar
function updateProgressBar() {
    const progress = (matchedCards.length / totalCardsInSet) * 100;
    progressBar.style.width = `${progress}%`;
}

// Start game logic
startButton.addEventListener('click', () => {
    const selectedSet = setSelect.value;
    if (selectedSet === "") {
        alert('Please select a word set to start the game.');
        return;
    }

    currentSet = parseInt(selectedSet, 10);
    startButton.disabled = true; // Disable the start button after the game starts
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    flippedCards = [];
    matchedCards = [];
    flippingAllowed = true; // Allow flipping cards again
    createCards(); // Create the cards only when the game starts
});
