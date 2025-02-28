document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Original Sight Words Sets (50 words, 5 per set)
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
  const bgMusic = new Audio('sounds/quest.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.2;

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
    const cardWords = shuffleArray(words.concat(words)).slice(0, 10); // Limit to 10 cards

    cardWords.forEach((word, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Flip card ${index + 1} with word ${word}`);
      card.dataset.word = word;

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');

      // Front face with tree image and number
      const frontFace = document.createElement('div');
      frontFace.classList.add('card-face', 'card-front');
      frontFace.innerHTML = `
        <img src="card-front.png" alt="Tree illustration" />
        <div class="card-number">${index + 1}</div>
      `;

      // Back face with sight word
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

    cardContainer.classList.add('pulse');
    setTimeout(() => cardContainer.classList.remove('pulse'), 5000); // 5s guidance
  };

  // Flip Card
  const flipCard = (card) => {
    if (!flippingAllowed || flippedCards.includes(card) || matchedCards.includes(card)) return;
    card.classList.add('flipped');
    flippedCards.push(card);
    speakWord(card.dataset.word);
    if (flippedCards.length === 2) checkForMatch();
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
      mascotMessage.textContent = 'Woohoo! You found a pair!';
      flippedCards = [];
      flippingAllowed = true;
      if (matchedCards.length === sightWordsSets[currentSet].length * 2) showReward();
    } else {
      playSound('incorrect');
      mascotMessage.textContent = 'Oh no! Try again!';
      card1.classList.add('mismatch');
      card2.classList.add('mismatch');
      setTimeout(() => {
        card1.classList.remove('flipped', 'mismatch');
        card2.classList.remove('flipped', 'mismatch');
        flippedCards = [];
        flippingAllowed = true;
        mascotMessage.textContent = 'Find a match!';
      }, 1000); // Faster feedback
    }
  };

  // Speak Word
  const speakWord = (word) => {
    if (!soundOn) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word === 'a' ? 'ay' : word);
    utterance.lang = 'en-US';
    utterance.pitch = 1.3;
    utterance.rate = 0.7;
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
    const totalPairs = sightWordsSets[currentSet].length;
    const matchedPairs = matchedCards.length / 2;
    scoreDisplay.textContent = `Stars: ${score} / Pairs: ${matchedPairs}/${totalPairs}`;
  };

  // Start Game
  const startGame = () => {
    if (!setSelect.value) {
      mascotMessage.textContent = 'Choose a quest first!';
      return;
    }
    currentSet = parseInt(setSelect.value, 10);
    startButton.disabled = true;
    setSelect.disabled = true;
    score = 0;
    updateScore();
    mascotMessage.textContent = 'Find a match!';
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
    mascotMessage.textContent = 'Hello, explorer! Let’s find words!';
    if (soundOn) bgMusic.play();
  };

  // Toggle Sound
  const toggleSound = () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? '🔊' : '🔇';
    if (!soundOn) bgMusic.pause();
    else bgMusic.play();
  };

  // Onboarding Guidance
  if (!localStorage.getItem('welcomeShown')) {
    mascotMessage.textContent = 'Tap a card to flip it and find matches!';
    setTimeout(() => {
      mascotMessage.textContent = 'Hello, explorer! Let’s find words!';
      localStorage.setItem('welcomeShown', 'true');
    }, 5000); // Extended onboarding
  }

  // Event Listeners
  startButton.addEventListener('click', startGame);
  soundToggle.addEventListener('click', toggleSound);
  playAgainButton.addEventListener('click', resetGame);
});
