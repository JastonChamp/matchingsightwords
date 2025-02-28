document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Sight Words Sets (simplified to 5 words per set for young kids)
  const sightWordsSets = [
    ['cat', 'dog', 'run', 'sun', 'big'],  // Jungle Words
    ['fish', 'boat', 'see', 'blue', 'up'], // Ocean Words
    ['cow', 'pig', 'eat', 'red', 'go'],    // Farm Words
    ['star', 'moon', 'fly', 'yes', 'no'],  // Space Words
    ['hat', 'box', 'me', 'you', 'play'],   // Magic Words
  ];

  // DOM Elements
  const cardContainer = document.querySelector('.card-row');
  const startButton = document.getElementById('start-button');
  const setSelect = document.getElementById('set-select');
  const scoreDisplay = document.getElementById('score-display');
  const mascotMessage = document.getElementById('mascot-message');
  const soundToggle = document.getElementById('sound-toggle');
  const modal = document.getElementById('reward-modal');
  const finalScore = document.getElementById('final-score');
  const playAgainButton = document.getElementById('play-again-button');

  // Game State
  let flippedCards = [];
  let matchedCards = [];
  let currentSet = null;
  let flippingAllowed = true;
  let score = 0;
  let soundOn = true;

  // Audio
  const correctSound = new Audio('sounds/cheer.mp3');
  const incorrectSound = new Audio('sounds/whoops.mp3');
  const bgMusic = new Audio('sounds/adventure.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.3;

  // Shuffle Array
  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create Cards
  const createCards = () => {
    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];

    const words = sightWordsSets[currentSet];
    const cardWords = shuffleArray(words.concat(words));

    cardWords.forEach((word, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.dataset.word = word;

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');

      const frontFace = document.createElement('div');
      frontFace.classList.add('card-face', 'card-front');
      frontFace.innerHTML = `<img src="card-front.png" alt="Card front" />`;

      const backFace = document.createElement('div');
      backFace.classList.add('card-face', 'card-back');
      backFace.textContent = word;

      cardInner.append(frontFace, backFace);
      card.appendChild(cardInner);

      card.addEventListener('click', () => flipCard(card));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') flipCard(card);
      });

      cardContainer.appendChild(card);
    });
  };

  // Flip Card
  const flipCard = (card) => {
    if (!flippingAllowed || flippedCards.includes(card) || matchedCards.includes(card)) return;

    card.classList.add('flipped');
    flippedCards.push(card);
    speakWord(card.dataset.word);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  };

  // Check Match
  const checkForMatch = () => {
    flippingAllowed = false;
    const [card1, card2] = flippedCards;

    if (card1.dataset.word === card2.dataset.word) {
      matchedCards.push(card1, card2);
      score += 10;
      updateScore();
      playSound('correct');
      card1.classList.add('matched');
      card2.classList.add('matched');
      mascotMessage.textContent = 'Yay! A match!';
      flippedCards = [];
      flippingAllowed = true;

      if (matchedCards.length === sightWordsSets[currentSet].length * 2) {
        showReward();
      }
    } else {
      playSound('incorrect');
      mascotMessage.textContent = 'Oops, try again!';
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
        flippingAllowed = true;
        mascotMessage.textContent = 'Flip a card!';
      }, 1000);
    }
  };

  // Speak Word
  const speakWord = (word) => {
    if (!soundOn) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.pitch = 1.2; // Higher pitch for kids
    utterance.rate = 0.8; // Slower for clarity
    speechSynthesis.speak(utterance);
  };

  // Play Sound
  const playSound = (type) => {
    if (!soundOn) return;
    if (type === 'correct') {
      correctSound.currentTime = 0;
      correctSound.play();
    } else {
      incorrectSound.currentTime = 0;
      incorrectSound.play();
    }
  };

  // Update Score
  const updateScore = () => {
    scoreDisplay.textContent = `Stars: ${score}`;
  };

  // Start Game
  const startGame = () => {
    if (!setSelect.value) {
      mascotMessage.textContent = 'Pick an adventure first!';
      return;
    }
    currentSet = parseInt(setSelect.value, 10);
    startButton.disabled = true;
    setSelect.disabled = true;
    score = 0;
    updateScore();
    mascotMessage.textContent = 'Flip a card!';
    flippingAllowed = true;
    createCards();
    if (soundOn) bgMusic.play();
  };

  // Show Reward
  const showReward = () => {
    finalScore.textContent = score;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    if (soundOn) bgMusic.pause();
    playSound('correct');
  };

  // Reset Game
  const resetGame = () => {
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    startButton.disabled = false;
    setSelect.disabled = false;
    score = 0;
    updateScore();
    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    currentSet = null;
    setSelect.value = '';
    mascotMessage.textContent = 'Hi, friend! Let’s play with words!';
    if (soundOn) bgMusic.play();
  };

  // Toggle Sound
  const toggleSound = () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? '🔊' : '🔇';
    if (!soundOn) bgMusic.pause();
    else bgMusic.play();
  };

  // Event Listeners
  startButton.addEventListener('click', startGame);
  soundToggle.addEventListener('click', toggleSound);
  playAgainButton.addEventListener('click', resetGame);
});
