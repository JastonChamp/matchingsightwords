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
let flippedCards = [];
let matchedCards = [];
let currentSet = null;
let flippingAllowed = true;
let score = 0;

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
    if (currentSet === null) {
        alert('Please select a word set to start the game!');
        return;
    }

    cardContainer.innerHTML = '';
    const currentWordSet = shuffleArray(sightWordsSets[currentSet].concat(sightWordsSets[currentSet]));
    currentWordSet.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.dataset.index = index + 1;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${index + 1}</div>
                <div class="card-back">${word}</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card));
        cardContainer.appendChild(card);
    });
}

// Flip card logic
function flipCard(card) {
    if (!flippingAllowed || flippedCards.includes(card) || card.classList.contains('matched')) return;

    const cardInner = card.querySelector('.card-inner');
    cardInner.classList.add('is-flipped');
    flippedCards.push(card);

    speakWord(card.dataset.word); // Call the Web Speech API here

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check for match
function checkForMatch() {
    flippingAllowed = false;

    const [card1, card2] = flippedCards;
    if (card1.dataset.word === card2.dataset.word) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        updateScore();
        resetFlipState(true);
    } else {
        setTimeout(() => {
            card1.querySelector('.card-inner').classList.remove('is-flipped');
            card2.querySelector('.card-inner').classList.remove('is-flipped');
            resetFlipState(false);
        }, 1000);
    }
}

// Reset flipping state
function resetFlipState(isMatch) {
    flippedCards = [];
    flippingAllowed = true;

    if (isMatch && matchedCards.length === sightWordsSets[currentSet].length * 2) {
        alert('Great job! You completed the set!');
        matchedCards = []; // Clear matched cards after completion
        startButton.disabled = false; // Enable the start button for replay
    }
}

// Speak the word with special pronunciation for "the"
function speakWord(word) {
    let utterance = new SpeechSynthesisUtterance();

    if (word === 'the') {
        utterance.text = 'thuh';
    } else if (word === 'a') {
        utterance.text = 'uh';
    } else {
        utterance.text = word;
    }

    utterance.lang = 'en-GB'; // Set the language to British English
    speechSynthesis.speak(utterance);
}

// Update score
function updateScore() {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
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
    flippingAllowed = true;
    createCards();
});
