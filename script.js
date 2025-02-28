document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Sight Words Sets for different modes
  const sightWordsSets = {
    easy: [
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
    ],
    medium: [
      ['the', 'said', 'was', 'one', 'two'],
      ['a', 'about', 'above', 'again', 'all'],
      ['also', 'are', 'be', 'came', 'day'],
      ['do', 'does', 'for', 'go', 'he'],
      ['her', 'his', 'how', 'I', 'in']
    ],
    hard: [
      ['you', 'they', 'where', 'there', 'this'],
      ['the', 'said', 'was', 'one', 'two'],
      ['a', 'about', 'above', 'again', 'all'],
      ['also', 'are', 'be', 'came', 'day'],
      ['do', 'does', 'for', 'go', 'he']
    ]
  };

  // DOM Elements
  const cardContainer = document.querySelector('.card-row');
  const startButton = document.getElementById('start-button');
  const setSelect = document.getElementById('set-select');
  const modeSelect = document.getElementById('mode-select');
  const scoreDisplay = document.getElementById('score-display');
  const mascotMessage = document.getElementById('mascot-message');
  const modal = document.getElementById('reward-modal');
  const finalScore = document.getElementById('final-score');
  const playAgainButton = document.getElementById('play-again-button');
  const howToPlay = document.getElementById('how-to-play');
  const closeHowToPlay = document.getElementById('close-how-to-play');
  const progressBar = document.getElementById('progress-bar');

  // Game State
  let flippedCards = [];
  let matchedCards = [];
  let currentSet = null;
  let currentMode = 'easy';
  let flippingAllowed = true;
  let score = 0;
  let soundOn = true;

  // Audio
  const correctSound = new Audio('sounds/cheer.mp3');
  correctSound.onerror = () => console.warn('Cheer sound failed to load');
  const incorrectSound = new Audio('sounds/whoops.mp3');
  incorrectSound.onerror = () => console.warn('Whoops sound failed to load');
  const bgMusic = new Audio('sounds/quest.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.2;
  bgMusic.onerror = () => console.warn('Quest music failed to load');

  // Shuffle Array
  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create Cards with Randomized Words
  const createCards = () => {
    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];

    const words = sightWordsSets[currentMode][currentSet];
    if (!words || words.length === 0) {
      console.error('No words found for current mode and set:', currentMode, currentSet);
      mascotMessage.textContent = 'Error loading words. Please try again!';
      return;
    }

    const cardWords = shuffleArray(words.concat(words)).slice(0, 10);
    console.log('Creating cards with words:', cardWords);

    cardWords.forEach((word, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Flip card ${index + 1} with word ${word || 'unknown'}`);
      card.dataset.word = word || 'unknown';
      card.dataset.flipped = 'false';

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner', 'unmatched');
      cardInner.style.position = 'relative';

      const frontFace = document.createElement('div');
      frontFace.classList.add('card-face', 'card-front');
      frontFace.innerHTML = `
        <img src="images/card-front.png" alt="Tree illustration" onerror="this.src='images/fallback-tree.png'; console.warn('Card front image failed to load for card ${index}');" />
        <div class="card-number">${index + 1}</div>
      `;

      const backFace = document.createElement('div');
      backFace.classList.add('card-face', 'card-back');
      backFace.textContent = word || 'Error';

      cardInner.append(frontFace, backFace);
      card.appendChild(cardInner);

      card.addEventListener('click', () => flipCard(card));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') flipCard(card);
      });

      cardContainer.appendChild(card);
    });

    cardContainer.classList.add('pulse');
    setTimeout(() => cardContainer.classList.remove('pulse'), 2000);
  };

  // Flip Card
  const flipCard = (card) => {
    if (!flippingAllowed || card.dataset.flipped === 'true' || matchedCards.includes(card)) return;

    if (!card.classList.contains('flipped')) {
      card.classList.add('flipped');
      card.dataset.flipped = 'true';
      flippedCards.push(card);
      if (flippedCards.length === 2) checkForMatch();
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
      card1.classList.remove('unmatched');
      card2.classList.remove('unmatched');
      flippedCards = [];
      flippingAllowed = true;
      updateProgressBar();
      if (matchedCards.length === sightWordsSets[currentMode][currentSet].length * 2) showReward();
    } else {
      playSound('incorrect');
      card1.classList.add('mismatch');
      card2.classList.add('mismatch');
      setTimeout(() => {
        card1.classList.remove('flipped', 'mismatch');
        card2.classList.remove('flipped', 'mismatch');
        flippedCards = [];
        flippingAllowed = true;
      }, 1200);
    }
  };

  // Speak Word (Fixed Web Speech API)
  const speakWord = (word) => {
    if (!soundOn) return;
    if (!speechSynthesis) {
      console.warn('Web Speech API not supported in this browser. Sound disabled.');
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word === 'a' ? 'ay' : word || 'unknown');
    utterance.lang = 'en-US';
    utterance.pitch = 1.3;
    utterance.rate = 0.7;
    utterance.onend = () => console.log(`Finished speaking: ${word}`);
    utterance.onerror = (event) => console.error(`Speech synthesis error: ${event.error}`);
    speechSynthesis.speak(utterance);
  };

  // Play Sound
  const playSound = (type) => {
    if (!soundOn) return;
    let sound;
    if (type === 'correct') {
      sound = correctSound;
    } else {
      sound = incorrectSound;
    }
    sound.currentTime = 0;
    sound.play().catch(error => console.warn(`Failed to play ${type} sound: ${error}`));
  };

  // Update Score
  const updateScore = () => {
    const totalPairs = sightWordsSets[currentMode][currentSet].length;
    const matchedPairs = matchedCards.length / 2;
    scoreDisplay.textContent = `Fox Stars: ${score} / Pairs: ${matchedPairs}/${totalPairs}`;
  };

  // Update Progress Bar
  const updateProgressBar = () => {
    const totalPairs = sightWordsSets[currentMode][currentSet].length;
    const matchedPairs = matchedCards.length / 2;
    const progress = (matchedPairs / totalPairs) * 100;
    progressBar.style.background = `linear-gradient(to right, #FFD54F 0%, #FFD54F ${progress}%, transparent ${progress}%)`;
    progressBar.querySelectorAll('.star-icon').forEach((star, index) => {
      if (index < matchedPairs) star.style.opacity = 1;
      else star.style.opacity = 0.3;
    });
  };

  // Start Game
  const startGame = () => {
    if (!setSelect.value) {
      mascotMessage.textContent = 'Choose a quest first!';
      return;
    }
    currentSet = parseInt(setSelect.value, 10);
    currentMode = modeSelect.value;
    startButton.disabled = true;
    setSelect.disabled = true;
    modeSelect.disabled = true;
    score = 0;
    updateScore();
    mascotMessage.textContent = 'Find a match!';
    flippingAllowed = true;
    createCards();
    if (soundOn) {
      bgMusic.play().catch(error => console.warn('Failed to play background music'));
    }
  };

  // Show Reward
  const showReward = () => {
    finalScore.textContent = score;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('animate');
    if (soundOn) {
      bgMusic.pause();
      playSound('correct');
    }
    setTimeout(() => modal.classList.remove('animate'), 3000);
  };

  // Reset Game
  const resetGame = () => {
    modal.classList.remove('visible', 'animate');
    modal.setAttribute('aria-hidden', 'true');
    startButton.disabled = false;
    setSelect.disabled = false;
    modeSelect.disabled = false;
    score = 0;
    updateScore();
    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    currentSet = null;
    setSelect.value = '';
    mascotMessage.textContent = 'Hello, explorer! Let’s find words!';
    if (soundOn) {
      bgMusic.play().catch(error => console.warn('Failed to play background music on reset'));
    }
  };

  // Onboarding and How-to-Play
  if (!localStorage.getItem('welcomeShown')) {
    mascotMessage.textContent = 'Tap a card to flip it and find matches!';
    setTimeout(() => {
      mascotMessage.textContent = 'Hello, explorer! Let’s find words!';
      howToPlay.classList.add('visible');
      localStorage.setItem('welcomeShown', 'true');
    }, 2000);
  }

  closeHowToPlay.addEventListener('click', () => {
    howToPlay.classList.remove('visible');
  });

  // Event Listeners
  startButton.addEventListener('click', startGame);
  playAgainButton.addEventListener('click', resetGame);
  modeSelect.addEventListener('change', () => {
    currentMode = modeSelect.value;
    setSelect.value = '';
    startButton.disabled = true;
    mascotMessage.textContent = 'Choose a quest to begin!';
  });
});
