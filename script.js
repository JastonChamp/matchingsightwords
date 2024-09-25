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
const body = document.querySelector('body');
const progressBar = document.createElement('div'); // Create a progress bar element
let flippedCards = [];
let matchedCards = [];
let currentSet = null; // No set selected initially
let flippingAllowed = true;
let score = 0; // Initialize score

// Initialize progress bar
progressBar.id = 'progress-bar';
progressBar.style.width = '0%';
progressBar.style.height = '20px';
progressBar.style.backgroundColor = '#32cd32';
progressBar.style.margin = '20px 0';
document.querySelector('.game-container').appendChild(progressBar);

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
    currentWordSet.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.dataset.index = index + 1; // Store card index for resetting numbers
        card.innerHTML = `<div class="card-inner"><div class="card-front">${index + 1}</div><div class="card-back">${word}</div></div>`;
        card.addEventListener('click', () => flipCard(card)); // Pass the card
        cardContainer.appendChild(card);
    });
}

// Flip card logic with animation and number replacement
function flipCard(card) {
    if (!flippingAllowed || flippedCards.includes(card)) return;

    if (flippedCards.length < 2) {
        card.querySelector('.card-inner').classList.add('is-flipped'); // Add flip animation class
        flippedCards.push(card);
        speakWord(card.dataset.word);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check for match and update the progress bar
function checkForMatch() {
    flippingAllowed = false;

    const [card1, card2] = flippedCards;
    if (card1.dataset.word === card2.dataset.word) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        updateScore();

        flippingAllowed = true;
        updateProgressBar();

        if (matchedCards.length === sightWordsSets[currentSet].length * 2) {
            matchedCards = [];
            alert('Great job! You completed the set!');
            startButton.disabled = false; // Enable the start button for replay
            changeBackground(); // Change background after completion
        }
    } else {
        setTimeout(() => {
            card1.querySelector('.card-inner').classList.remove('is-flipped');
            card2.querySelector('.card-inner').classList.remove('is-flipped');
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

// Update the progress bar based on matched cards
function updateProgressBar() {
    const totalCards = sightWordsSets[currentSet].length * 2;
    const progressPercentage = (matchedCards.length / totalCards) * 100;
    progressBar.style.width = `${progressPercentage}%`;
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
    progressBar.style.width = '0%'; // Reset progress bar
    createCards(); // Create the cards only when the game starts
});

// Change the background after completing a set
function changeBackground() {
    const backgrounds = ['#FFB6C1', '#ADD8E6', '#98FB98', '#FFD700']; // Example background colors
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    body.style.backgroundColor = randomBackground;
}
