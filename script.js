document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Sight Words Sets (each set appears twice in the game)
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

  // Game state variables
  let flippedCards = [];
  let matchedCards = [];
  let currentSet = null;
  let flippingAllowed = true;
  let score = 0;

  // Audio feedback
  const correctSound = new Audio('sounds/correct.mp3');
  const incorrectSound = new Audio('sounds/incorrect.mp3');

  // Shuffle array using the Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create and display cards for the selected word set
  const createCards = () => {
    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    const words = sightWordsSets[currentSet];
    // Duplicate words so each appears twice, then shuffle
    const cardWords = shuffleArray(words.concat(words));

    cardWords.forEach((word, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.dataset.word = word;
      card.dataset.index = index;

      // Front face shows a number
      const frontFace = document.createElement('div');
      frontFace.classList.add('front-face', 'card-content');
      frontFace.textContent = index + 1;

      // Back face displays the word
      const backFace = document.createElement('div');
      backFace.classList.add('back-face', 'card-content');
      backFace.textContent = word;

      card.append(frontFace, backFace);

      // Click and keyboard event listeners for flipping
      card.addEventListener('click', () => flipCard(card));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          flipCard(card);
        }
      });

      cardContainer.appendChild(card);
    });
  };

  // Handle card flip
  const flipCard = (card) => {
    if (!flippingAllowed || flippedCards.includes(card) || matchedCards.includes(card)) return;
    card.classList.add('flipped');
    flippedCards.push(card);
    speakWord(card.dataset.word);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  };

  // Check if the two flipped cards match
  const checkForMatch = () => {
    flippingAllowed = false;
    const [card1, card2] = flippedCards;

    if (card1.dataset.word === card2.dataset.word) {
      matchedCards.push(card1, card2);
      incrementScore(10);
      playSound('correct');

      // Mark cards as matched (CSS will update their appearance)
      card1.classList.add('matched');
      card2.classList.add('matched');

      flippedCards = [];
      flippingAllowed = true;

      // If all cards are matched, the set is complete
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
  };

  // Pronounce the word using SpeechSynthesis with special cases for "the" and "a"
  const speakWord = (word) => {
    speechSynthesis.cancel(); // Stop any ongoing speech
    let utteranceText = word;
    if (word === 'the') {
      utteranceText = 'thuh';
    } else if (word === 'a') {
      utteranceText = 'uh';
    }
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.lang = 'en-GB';
    speechSynthesis.speak(utterance);
  };

  // Play feedback sounds
  const playSound = (type) => {
    if (type === 'correct') {
      correctSound.currentTime = 0;
      correctSound.play();
    } else if (type === 'incorrect') {
      incorrectSound.currentTime = 0;
      incorrectSound.play();
    }
  };

  // Update the score display
  const updateScore = () => {
    scoreDisplay.textContent = `Score: ${score}`;
  };

  const incrementScore = (points) => {
    score += points;
    updateScore();
  };

  // Display a message to the user
  const displayMessage = (msg) => {
    messageDisplay.textContent = msg;
  };

  // Start a new game
  const startGame = () => {
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
    displayMessage('');
    flippingAllowed = true;
    createCards();
  };

  // Reset the game to its initial state
  const resetGame = () => {
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
  };

  // Event Listeners
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);
});
