document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Original 50 Sight Words for Easy Mode (5 words per set, 10 quests)
  const sightWordsEasy = [
    'a', 'about', 'above', 'again', 'all', 'also', 'are', 'be', 'came', 'day',
    'do', 'does', 'for', 'go', 'he', 'her', 'his', 'how', 'I', 'in',
    'into', 'is', 'it', 'know', 'many', 'name', 'not', 'now', 'of', 'on',
    'one', 'over', 'said', 'she', 'so', 'some', 'story', 'the', 'their', 'then',
    'there', 'this', 'to', 'too', 'want', 'was', 'were', 'what', 'when', 'white'
  ];

  // New Non-Decodable Words for Medium and Hard Modes
  const sightWordsMedium = [
    'could', 'should', 'would', 'been', 'have', 'must', 'might', 'shall', 'will', 'can'
  ];

  const sightWordsHard = [
    'through', 'thought', 'although', 'always', 'before', 'after', 'because', 'during', 'until', 'since'
  ];

  // Sight Words Sets for Different Modes
  const sightWordsSets = {
    easy: Array.from({ length: 10 }, (_, i) => sightWordsEasy.slice(i * 5, (i + 1) * 5)), // 10 sets of 5 words each
    medium: Array.from({ length: 2 }, (_, i) => sightWordsMedium.slice(i * 5, (i + 1) * 5)), // 2 sets of 5 words each
    hard: Array.from({ length: 2 }, (_, i) => sightWordsHard.slice(i * 5, (i + 1) * 5)) // 2 sets of 5 words each
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
  const matchedWordsDisplay = document.getElementById('matched-words');
  const playAgainButton = document.getElementById('play-again-button');
  const howToPlay = document.getElementById('how-to-play');
  const closeHowToPlay = document.getElementById('close-how-to-play');
  const progressBar = document.getElementById('progress-bar');
  const fullscreenButton = document.getElementById('fullscreen-button');
  const soundToggle = document.getElementById('sound-toggle');
  const howToPlayButton = document.getElementById('how-to-play-button');
  const body = document.body;

  // Game State
  let flippedCards = [];
  let matchedCards = [];
  let currentSet = null;
  let currentMode = 'easy';
  let flippingAllowed = true;
  let score = 0;
  let soundOn = true;
  let isFullscreen = false;
  let isGameInProgress = false;

  // Audio
  const correctSound = new Audio('sounds/cheer.mp3');
  const incorrectSound = new Audio('sounds/whoops.mp3');
  const bgMusic = new Audio('sounds/quest.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.2;

  // Utility Functions
  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Toggle Full Screen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      body.requestFullscreen();
      fullscreenButton.textContent = 'Exit Full Screen';
      isFullscreen = true;
      document.getElementById('mascot').classList.add('foxJump');
      setTimeout(() => document.getElementById('mascot').classList.remove('foxJump'), 1200);
    } else {
      document.exitFullscreen();
      fullscreenButton.textContent = 'Full Screen';
      isFullscreen = false;
    }
    speakStatus(isFullscreen ? 'Entered full screen mode' : 'Exited full screen mode');
  };

  // Create Cards
  const createCards = () => {
    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];

    const words = sightWordsSets[currentMode][currentSet];
    const cardWords = shuffleArray(words.concat(words)).slice(0, 10); // Ensure 10 cards (5 pairs)

    Array.from({ length: 10 }, (_, i) => i).forEach((position, index) => {
      const word = cardWords[index];
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Flip card ${position + 1} with word ${word} on the back`);
      card.dataset.word = word;
      card.dataset.position = position + 1; // Store card number for display

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner', 'unmatched');

      const frontFace = document.createElement('div');
      frontFace.classList.add('card-face', 'card-front');
      frontFace.innerHTML = `
        <img src="card-front.png" alt="Tree illustration" />
        <div class="card-number">${position + 1}</div>
      `;

      const backFace = document.createElement('div');
      backFace.classList.add('card-face', 'card-back');
      backFace.textContent = word; // Display sight word on the back

      cardInner.append(frontFace, backFace);
      card.appendChild(cardInner);

      card.addEventListener('click', () => flipCard(card));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') flipCard(card);
      });

      cardContainer.appendChild(card);
    });

    cardContainer.classList.add('pulse');
    setTimeout(() => cardContainer.classList.remove('pulse'), 6000);
    speakStatus('Find a match by focusing on the numbers 1–10 to choose cards and reveal words on the back!');
  };

  // Flip Card
  const flipCard = (card) => {
    if (!flippingAllowed || card.classList.contains('flipped') || matchedCards.includes(card)) return;

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
      card1.classList.remove('unmatched');
      card2.classList.remove('unmatched');
      mascotMessage.textContent = `Yay! You matched card ${card1.dataset.position} with "${card1.dataset.word}"!`;
      speakStatus('Great match! Look for another number.');
      flippedCards = [];
      flippingAllowed = true;
      updateProgressBar();
      if (matchedCards.length === 10) showReward();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      playSound('incorrect');
      mascotMessage.textContent = 'Oh no! Try again!';
      speakStatus('No match, try again. Focus on the numbers!');
      // Delay the mismatch animation to allow the flip to complete first
      setTimeout(() => {
        card1.classList.add('mismatch');
        card2.classList.add('mismatch');
        setTimeout(() => {
          card1.classList.remove('flipped', 'mismatch');
          card2.classList.remove('flipped', 'mismatch');
          flippedCards = [];
          flippingAllowed = true;
          mascotMessage.textContent = 'Find a match!';
        }, 1000); // Match the duration of the shake animation (1s)
      }, 600); // Delay after the flip animation completes (0.6s as per CSS transition)
    }
  };

  // Audio Functions
  const speakWord = (word) => {
    if (!soundOn || !speechSynthesis) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word === 'a' ? 'ay' : word);
    utterance.lang = 'en-US';
    utterance.pitch = 1.3;
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const speakStatus = (message) => {
    if (!soundOn || !speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    utterance.pitch = 1.3;
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

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

  // Update UI
  const updateScore = () => {
    const matchedPairs = matchedCards.length / 2;
    scoreDisplay.textContent = `Fox Stars: ${score} / Pairs: ${matchedPairs}/5`;
    speakStatus(`Fox Stars: ${score}, Pairs: ${matchedPairs} out of 5`);
  };

  const updateProgressBar = () => {
    const progress = (matchedCards.length / 10) * 100;
    progressBar.style.background = `linear-gradient(to right, #FFD54F 0%, #FFD54F ${progress}%, transparent ${progress}%)`;
    progressBar.querySelectorAll('.star-icon').forEach((star, index) => {
      star.style.opacity = index < matchedCards.length / 2 ? 1 : 0.3;
    });
  };

  // Show Reward
  const showReward = () => {
    finalScore.textContent = score;
    const matchedWords = matchedCards.map(card => `${card.dataset.word} (Card ${card.dataset.position})`).join(', ');
    matchedWordsDisplay.textContent = matchedWords;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    if (soundOn) {
      bgMusic.pause();
      playSound('correct');
      speakStatus(`Amazing job! You collected ${score} Fox Stars! Here are your matched words: ${matchedWords}`);
      document.getElementById('mascot').classList.add('foxJump');
      setTimeout(() => document.getElementById('mascot').classList.remove('foxJump'), 1200);
    }
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    });
    isGameInProgress = false;
  };

  // Game Control
  const startGame = () => {
    if (!setSelect.value) {
      mascotMessage.textContent = 'Choose a quest first!';
      speakStatus('Please choose a quest first.');
      return;
    }
    currentSet = parseInt(setSelect.value, 10);
    currentMode = modeSelect.value;
    startButton.disabled = false;
    setSelect.disabled = true;
    modeSelect.disabled = true;
    score = 0;
    updateScore();
    mascotMessage.textContent = 'Find a match!';
    flippingAllowed = true;
    isGameInProgress = true;
    createCards();
    if (soundOn) bgMusic.play();
    document.getElementById('mascot').classList.add('foxCheer');
    setTimeout(() => document.getElementById('mascot').classList.remove('foxCheer'), 2000);
  };

  const resetGame = () => {
    modal.classList.remove('visible');
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
    isGameInProgress = false;
    if (soundOn) bgMusic.play();
  };

  // Dynamic Set Selection
  const updateSetSelect = () => {
    setSelect.innerHTML = '<option value="" selected disabled>Pick a Quest!</option>';
    const numSets = sightWordsSets[currentMode].length;
    for (let i = 0; i < numSets; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `Quest ${i + 1}`;
      setSelect.appendChild(option);
    }
  };

  // Event Listeners
  startButton.addEventListener('click', startGame);
  playAgainButton.addEventListener('click', resetGame);
  modeSelect.addEventListener('change', () => {
    currentMode = modeSelect.value;
    updateSetSelect();
    setSelect.value = '';
    startButton.disabled = false;
    mascotMessage.textContent = 'Choose a quest to begin!';
    speakStatus(`Adventure level set to ${currentMode}.`);
  });
  fullscreenButton.addEventListener('click', toggleFullscreen);
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? 'Sound On' : 'Sound Off';
    if (soundOn && isGameInProgress) bgMusic.play();
    else bgMusic.pause();
    speechSynthesis.cancel();
  });

  howToPlayButton.addEventListener('click', () => {
    howToPlay.classList.add('visible');
    speakStatus('Here’s how to play: Tap or click a card numbered 1–10 to flip it and match the sight words on the back!');
  });

  closeHowToPlay.addEventListener('click', () => {
    howToPlay.classList.remove('visible');
    speakStatus('Got it! Start your quest.');
  });

  // Initialization
  updateSetSelect();
  if (!localStorage.getItem('welcomeShown')) {
    howToPlay.classList.add('visible');
    localStorage.setItem('welcomeShown', 'true');
  }

  // Add Confetti Library (external script or CDN for particle effects)
  // Include <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script> in HTML head
});
