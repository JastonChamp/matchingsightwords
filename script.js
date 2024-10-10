// Encapsulate the game logic
const MemoryGame = (() => {
    // Sight Words Sets
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

    // DOM Elements
    const cardContainer = document.querySelector('.card-row');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const setSelect = document.getElementById('set-select');
    const scoreDisplay = document.getElementById('score-display');
    const messageDisplay = document.getElementById('message-display');

    // Game Variables
    let flippedCards = [];
    let matchedCards = [];
    let currentSet = null;
    let flippingAllowed = true;
    let score = 0;

    // Sounds
    const correctSound = new Audio('sounds/correct.mp3');
    const incorrectSound = new Audio('sounds/incorrect.mp3');

    // Shuffle array using Fisher-Yates algorithm
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
        // Clear existing cards and listeners
        cardContainer.innerHTML = '';
        flippedCards = [];
        matchedCards = [];

        const currentWords = sightWordsSets[currentSet];
        const currentWordSet = shuffleArray(currentWords.concat(currentWords));

        currentWordSet.forEach((word, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.dataset.word = word;
            card.dataset.index = index + 1;

            // Front face (number)
            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face', 'card-content');
            frontFace.textContent = index + 1;

            // Back face (word)
            const backFace = document.createElement('div');
            backFace.classList.add('back-face', 'card-content');
            backFace.textContent = word;

            card.appendChild(frontFace);
            card.appendChild(backFace);

            // Event Listeners
            card.addEventListener('click', () => flipCard(card));
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    flipCard(card);
                }
            });

            cardContainer.appendChild(card);
        });
    }

    // Flip card logic
    function flipCard(card) {
        if (!flippingAllowed || flippedCards.includes(card) || matchedCards.includes(card)) return;

        card.classList.add('flipped');
        flippedCards.push(card);
        speakWord(card.dataset.word);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    // Check for a match
    function checkForMatch() {
        flippingAllowed = false;

        const [card1, card2] = flippedCards;
        if (card1.dataset.word === card2.dataset.word) {
            matchedCards.push(card1, card2);
            updateScore();
            playSound('correct');

            // Apply green background color
            card1.style.backgroundColor = 'green';
            card2.style.backgroundColor = 'green';

            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            flippingAllowed = true;

            if (matchedCards.length === sightWordsSets[currentSet].length * 2) {
                displayMessage('Great job! You completed the set!');
                startButton.disabled = false;
                setSelect.disabled = false;
            }
        } else {
            playSound('incorrect');
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                flippingAllowed = true;
            }, 1000);
        }
    }

    // Speak the word with special pronunciation for "the" and "a"
    function speakWord(word) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();

        let utterance;
        if (word === 'the') {
            utterance = new SpeechSynthesisUtterance('thuh');
        } else if (word === 'a') {
            utterance = new SpeechSynthesisUtterance('uh');
        } else {
            utterance = new SpeechSynthesisUtterance(word);
        }

        utterance.lang = 'en-GB';
        speechSynthesis.speak(utterance);
    }

    // Play sound for correct or incorrect matches
    function playSound(type) {
        if (type === 'correct') {
            correctSound.currentTime = 0;
            correctSound.play();
        } else if (type === 'incorrect') {
            incorrectSound.currentTime = 0;
            incorrectSound.play();
        }
    }

    // Update score display
    function updateScore() {
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    // Display messages to the user
    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    // Start game
    function startGame() {
        const selectedSet = setSelect.value;
        if (selectedSet === "") {
            displayMessage('Please select a word set to start the game!');
            return;
        }

        currentSet = parseInt(selectedSet, 10);
        startButton.disabled = true;
        setSelect.disabled = true;
        resetButton.disabled = false;
        score = 0;
        updateScore();
        flippedCards = [];
        matchedCards = [];
        flippingAllowed = true;
        displayMessage('');
        createCards();
    }

    // Reset game
    function resetGame() {
        startButton.disabled = false;
        setSelect.disabled = false;
        resetButton.disabled = true;
        score = 0;
        updateScore();
        cardContainer.innerHTML = '';
        displayMessage('');
        flippedCards = [];
        matchedCards = [];
        currentSet = null;
        setSelect.value = '';
    }

    // Event Listeners
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    // Disable reset button initially
    resetButton.disabled = true;
})();
