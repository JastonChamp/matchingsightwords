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

  // Updated Non-Decodable Words for Medium Mode (180 words, 36 sets of 5, from all images, including overlaps)
  const sightWordsMedium = [
    'a', 'for', 'many', 'the', 'white',
    'would', 'about', 'go', 'name', 'their',
    'of', 'should', 'above', 'he', 'not',
    'then', 'no', 'could', 'again', 'her',
    'now', 'there', 'they', 'good', 'all',
    'his', 'on', 'this', 'find', 'made',
    'also', 'how', 'one', 'to', 'two',
    'across', 'are', 'I', 'over', 'too',
    'while', 'come', 'be', 'in', 'said',
    'want', 'before', 'brother', 'used', 'way',
    'please', 'fine', 'love', 'mother', 'down',
    'make', 'keep', 'high', 'put', 'who',
    'boy', 'ate', 'leave', 'eye', 'cold',
    'something', 'girl', 'been', 'these', 'nothing',
    'salt', 'become', 'watch', 'same', 'sea',
    'buy', 'because', 'give', 'head', 'say',
    'flies', 'wrote', 'upon', 'just', 'may',
    'green', 'fly', 'by', 'from', 'with',
    'though', 'became', 'aunty', 'finally', 'here',
    'enough', 'large', 'change', 'work', 'funny',
    'without', 'even', 'goes', 'any', 'off',
    'today', 'kind', 'group', 'both', 'eat',
    'open', 'try', 'might', 'when', 'home',
    'through', 'along', 'often', 'night', 'yellow',
    'don’t', 'place', 'behind', 'done', 'nice',
    'low', 'music', 'move', 'below', 'city',
    'once', 'money', 'knew', 'brought', 'between',
    'eight', 'rain', 'most', 'few', 'inside',
    'body', 'feel', 'can’t', 'much', 'began',
    'which', 'carry', 'feet', 'catch', 'new',
    'really', 'after', 'easy', 'great', 'children',
    'page', 'begin', 'always', 'family', 'sleep',
    'couldn’t', 'hard', 'start', 'every', 'our',
    'small', 'fall', 'dear', 'part', 'everywhere',
    'we', 'walk', 'point', 'idea', 'last',
    'parent', 'first', 'already', 'another', 'year'
  ];

  // Updated Non-Decodable Words for Hard Mode (10 words, 2 sets of 5, unchanged)
  const sightWordsHard = [
    'through', 'thought', 'although', 'always', 'before',
    'after', 'because', 'during', 'until', 'since'
  ];

  // Sight Words Sets for Different Modes
  const sightWordsSets = {
    easy: Array.from({ length: 10 }, (_, i) => sightWordsEasy.slice(i * 5, (i + 1) * 5)), // 10 sets of 5 words each
    medium: Array.from({ length: 36 }, (_, i) => sightWordsMedium.slice(i * 5, (i + 1) * 5)), // 36 sets of 5 words each
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
  let soundOn = true; // Ensure sound stays on by default
  let isFullscreen = false;
  let isGameInProgress = false;

  // Audio with Enhanced Error Handling (No Alerts)
  const correctSound = new Audio('sounds/cheer.mp3');
  correctSound.onerror = () => console.warn('Failed to load cheer.mp3. Check audio files or browser settings.');
  correctSound.onended = () => console.log('Cheer sound ended successfully');

  const incorrectSound = new Audio('sounds/whoops.mp3');
  incorrectSound.onerror = () => console.warn('Failed to load whoops.mp3. Check audio files or browser settings.');
  incorrectSound.onended = () => console.log('Whoops sound ended successfully');

  const bgMusic = new Audio('sounds/quest.mp3');
  bgMusic.onerror = () => console.warn('Failed to load quest.mp3. Check audio files or browser settings.');
  bgMusic.onended = () => console.log('Background music ended successfully');
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
    // No spoken status update to reduce audio announcements
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
    // No spoken status update to reduce audio announcements
  };

  // Flip Card
  const flipCard = (card) => {
    if (!flippingAllowed || card.classList.contains('flipped') || matchedCards.includes(card)) return;

    card.classList.add('flipped');
    if (soundOn) speakWord(card.dataset.word); // Only speak the word when flipped
    flippedCards.push(card);
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
      // No spoken feedback for match to reduce audio annoyance
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
      // No spoken feedback for mismatch to reduce audio annoyance
      // Delay to show words longer before applying mismatch animation
      setTimeout(() => {
        card1.classList.add('mismatch');
        card2.classList.add('mismatch');
        setTimeout(() => {
          card1.classList.remove('flipped', 'mismatch');
          card2.classList.remove('flipped', 'mismatch');
          flippedCards = [];
          flippingAllowed = true;
          // No spoken feedback after flip-back
        }, 1000); // Match the duration of the shake animation (1s)
      }, 1200); // Delay to ensure words are visible longer (1.2s)
    }
  };

  // Audio Functions
  const speakWord = (word) => {
    if (!soundOn || !speechSynthesis) return;
    speechSynthesis.cancel();

    let utteranceText = word;
    // Use schwa sound (/ə/) for "a" in casual, unstressed speech (e.g., "uh" as in "a cat" or "a dog")
    if (word.toLowerCase() === 'a') {
      utteranceText = 'uh'; // Use "uh" for a reliable schwa-like pronunciation
    }

    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.lang = 'en-GB'; // Set to British English

    // Dynamically select a UK female voice
    let bestVoice = null;
    const voices = speechSynthesis.getVoices(); // Get available voices
    if (voices.length > 0) {
      // Prefer a female UK voice
      bestVoice = voices.find(voice => 
        voice.lang === 'en-GB' && 
        voice.name.toLowerCase().includes('female')
      ) || voices.find(voice => voice.lang === 'en-GB'); // Fallback to any UK voice if no female voice is found
    } else {
      // Handle case where voices aren't loaded yet (async loading in some browsers)
      speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = speechSynthesis.getVoices();
        bestVoice = updatedVoices.find(voice => 
          voice.lang === 'en-GB' && 
          voice.name.toLowerCase().includes('female')
        ) || updatedVoices.find(voice => voice.lang === 'en-GB'); // Fallback to any UK voice
        if (bestVoice) {
          utterance.voice = bestVoice;
          speechSynthesis.speak(utterance);
        }
      };
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
    } else {
      // Fallback if no UK voice is found, use default voice with British English pronunciation hint
      utteranceText = word.toLowerCase() === 'a' ? 'uh' : word; // Ensure "a" uses "uh" even with default voice
    }

    utterance.pitch = 1.3; // Higher pitch for child-friendly tone
    utterance.rate = 0.7; // Slower rate for clarity
    utterance.onerror = (error) => console.warn('Speech synthesis error for word:', word, error);

    speechSynthesis.speak(utterance);
  };

  const playSound = (type) => {
    if (!soundOn) return;
    const audio = type === 'correct' ? correctSound : incorrectSound;
    audio.play().catch((error) => {
      console.warn(`Failed to play ${type} sound:`, error);
      // Instead of showing an alert, log to console and retry silently
      console.log('Attempting to re-enable and retry sound...');
      audio.load(); // Reload the audio to attempt recovery
      audio.play().catch((retryError) => {
        console.error(`Retry failed for ${type} sound:`, retryError);
        // No alert; silent fallback to maintain gameplay
      });
    });
  };

  // Update UI
  const updateScore = () => {
    const matchedPairs = matchedCards.length / 2;
    scoreDisplay.textContent = `Fox Stars: ${score} / Pairs: ${matchedPairs}/5`;
    // No spoken status update to reduce audio annoyance
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
    // Delay the modal appearance to allow review of revealed words
    setTimeout(() => {
      modal.classList.add('visible');
      modal.setAttribute('aria-hidden', 'false');
      if (soundOn) {
        bgMusic.pause();
        playSound('correct');
        // No spoken feedback for reward to reduce audio annoyance
        document.getElementById('mascot').classList.add('foxJump');
        setTimeout(() => document.getElementById('mascot').classList.remove('foxJump'), 1200);
      }
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
      isGameInProgress = false;
    }, 3000); // Delay of 3 seconds (3,000 ms) to allow time for review
  };

  // Game Control
  const startGame = () => {
    if (!setSelect.value) {
      mascotMessage.textContent = 'Choose a quest first!';
      // No spoken feedback to reduce audio annoyance
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
    if (soundOn) {
      bgMusic.play().catch((error) => {
        console.warn('Failed to play background music:', error);
        bgMusic.load(); // Attempt to reload and retry
        bgMusic.play().catch((retryError) => console.error('Background music retry failed:', retryError));
      });
    }
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
    if (soundOn) {
      bgMusic.play().catch((error) => {
        console.warn('Failed to play background music:', error);
        bgMusic.load(); // Attempt to reload and retry
        bgMusic.play().catch((retryError) => console.error('Background music retry failed:', retryError));
      });
    }
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
    // No spoken feedback to reduce audio annoyance
  });
  fullscreenButton.addEventListener('click', toggleFullscreen);
  soundToggle.addEventListener('click', () => {
    soundOn = true; // Reset soundOn to true when toggling back on
    soundToggle.textContent = soundOn ? 'Sound On' : 'Sound Off';
    if (soundOn && isGameInProgress) {
      bgMusic.play().catch((error) => {
        console.warn('Failed to play background music:', error);
        bgMusic.load(); // Attempt to reload and retry
        bgMusic.play().catch((retryError) => console.error('Background music retry failed:', retryError));
      });
    } else {
      bgMusic.pause();
    }
    // No spoken feedback for sound toggle
  });

  howToPlayButton.addEventListener('click', () => {
    howToPlay.classList.add('visible');
    if (soundOn) speakWord('Tap or click a card numbered 1 to 10 to flip it and match the sight words on the back! Focus on the numbers to find pairs and earn Fox Stars.');
  });

  closeHowToPlay.addEventListener('click', () => {
    howToPlay.classList.remove('visible');
    // No spoken feedback to reduce audio annoyance
  });

  // Initialization
  updateSetSelect();
  if (!localStorage.getItem('welcomeShown')) {
    howToPlay.classList.add('visible');
    // No spoken feedback for welcome to reduce audio annoyance
    localStorage.setItem('welcomeShown', 'true');
  }

  // Add Confetti Library (external script or CDN for particle effects)
  // Include <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script> in HTML head
});
