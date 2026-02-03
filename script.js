'use strict';

const init = () => {
  // Sight Words
  const sightWordsEasy = [
    'a', 'about', 'above', 'again', 'all', 'also', 'are', 'be', 'came', 'day',
    'do', 'does', 'for', 'go', 'he', 'her', 'his', 'how', 'I', 'in',
    'into', 'is', 'it', 'know', 'many', 'name', 'not', 'now', 'of', 'on',
    'one', 'over', 'said', 'she', 'so', 'some', 'story', 'the', 'their', 'then',
    'there', 'this', 'to', 'too', 'want', 'was', 'were', 'what', 'when', 'white'
  ];

  const sightWordsMedium = [
    'no', 'me', 'saw', 'two', 'out', 'take', 'find', 'they', 'here', 'while',
    'see', 'would', 'should', 'could', 'good', 'made', 'across', 'come', 'water', 'will',
    'under', 'from', 'cold', 'love', 'put', 'other', 'salt', 'because', 'upon', 'before',
    'until', 'young', 'you', 'who', 'give', 'mother', 'brother', 'something', 'become', 'wolf',
    'just', 'with', 'must', 'girl', 'boy', 'where', 'thought', 'fast', 'down', 'watch',
    'head', 'may', 'friend', 'maybe', 'has', 'have', 'away', 'way', 'make', 'ate',
    'been', 'same', 'say', 'green', 'people', 'each', 'your', 'happy', 'pretty', 'please',
    'keep', 'leave', 'these', 'sea', 'flies', 'fly', 'life', 'light', 'myself', 'time',
    'why', 'fine', 'high', 'eye', 'nothing', 'buy', 'wrote', 'by', 'going', 'own',
    'only', 'ago', 'very', 'though', 'large', 'goes', 'both', 'home', "don't", 'any',
    'became', 'began', 'begin', 'change', 'eat', 'few', 'knew', 'music', 'really', 'through',
    'place', 'move', 'brought', 'inside', 'which', 'after', 'always', 'aunty', 'work', 'off',
    'behind', 'body', 'family', 'today', 'open', 'below', 'carry', 'finally', 'try', 'along',
    'between', 'easy', 'funny', 'often', 'done', 'city', 'eight', 'feel', 'feet', 'great',
    'sleep', 'here', 'without', 'kind', 'might', 'night', 'nice', 'once', 'rain', "can't",
    'catch', 'children', "couldn't", 'enough', 'even', 'group', 'when', 'yellow', 'low', 'money',
    'most', 'much', 'new', 'page', 'hard', 'start', 'part', 'last', 'laugh', 'car',
    'half', 'ask', 'father', 'air', 'little', 'every', 'parent', 'ever', 'never', 'number',
    'together', 'bought', 'everywhere', 'question', 'answer', 'early', 'earth', 'later', 'letter', 'our',
    'we', 'first', 'hurt', 'heard', 'call', 'door', 'draw', 'four', 'more', 'morning',
    'small', 'walk', 'already', 'toy', 'found', 'house', 'around', 'almost', 'hear', 'horse',
    'talk', 'short', 'fall', 'point', 'another', 'against', 'ear', 'able', 'outside', 'pull',
    'far', 'push', 'fire', 'right', 'dear', 'idea', 'year', 'near', 'ball', 'blue',
    'during', 'front', 'hold', 'like', 'look', 'write', 'way', 'my', 'called', 'oil',
    'long', 'use', 'words', 'sound', 'live', 'back', 'things', 'sentence', 'line', 'means',
    'old', 'tell', 'fellow', 'show', 'form', 'three', 'well', 'such', 'turn', 'read',
    'need', 'different', 'picture', 'play', 'spell', 'animal', 'study', 'still', 'learn', 'Singapore',
    'world', 'add', 'food', 'country', 'plant', 'school', 'father', 'tree', 'close', 'seem',
    'example', 'those', 'paper', 'important', 'side', 'metre', 'grow', 'took', 'river', 'state',
    'book', 'stop', 'second', 'late', 'miss', 'face', 'Indian', 'real', 'sometimes', 'mountains',
    'soon', 'song', 'being', 'Monday', 'Tuesday', "it's", 'colour', 'area', 'mark', 'birds',
    'problem', 'complete', 'room', 'Wednesday', 'Thursday', 'since', 'piece', 'told', 'usually', "didn't",
    'friends', 'order', 'sure', 'Friday', 'Saturday', 'Sunday', 'better', 'however', 'black', 'products',
    'happened', 'whole', 'measure', 'remember', 'waves', 'reached', 'listen', 'wind', 'rock', 'space',
    'covered', 'several', 'himself', 'towards', 'five', 'passed', 'vowel', 'true', 'hundred', 'pattern',
    'numeral', 'table', 'north', 'slowly', 'farm', 'pulled', 'voice', 'seen', 'cried', 'plan',
    'notice', 'south', 'sing', 'ground', 'king', 'town', "I'll", 'unit', 'figure', 'certain',
    'field', 'travel', 'wood', 'used'
  ];

  const sightWordsHard = [
    'absence', 'accommodate', 'achieve', 'acquire', 'address',
    'advertise', 'apparent', 'argument', 'athlete', 'beginning',
    'believe', 'bicycle', 'biscuit', 'business', 'calendar',
    'category', 'ceiling', 'cemetery', 'changeable', 'chocolate',
    'committee', 'communicate', 'compare', 'competition', 'concentrate',
    'congratulations', 'conscience', 'conscious', 'controversial', 'convenience',
    'correspond', 'criticize', 'curiosity', 'deceive', 'decision',
    'definite', 'description', 'desperate', 'develop', 'dictionary',
    'dilemma', 'disappear', 'disappoint', 'discipline', 'disease',
    'embarrass', 'environment', 'especially', 'exaggerate', 'excellent'
  ];

  // Log word counts to verify
  console.log('Easy words count:', sightWordsEasy.length);
  console.log('Medium words count:', sightWordsMedium.length);
  console.log('Hard words count:', sightWordsHard.length);

  // Sight Words Sets
  const sightWordsSets = {
    easy: Array.from({ length: 10 }, (_, i) => sightWordsEasy.slice(i * 5, (i + 1) * 5)),
    medium: Array.from({ length: 42 }, (_, i) => sightWordsMedium.slice(i * 5, i * 5 + (i === 41 ? 3 : 5))),
    hard: Array.from({ length: 10 }, (_, i) => sightWordsHard.slice(i * 5, (i + 1) * 5))
  };

  // Verify set counts
  console.log('Easy sets:', sightWordsSets.easy.length);
  console.log('Medium sets:', sightWordsSets.medium.length);
  console.log('Hard sets:', sightWordsSets.hard.length);

  // DOM Elements - with validation
  const cardContainer = document.querySelector('.card-grid');
  const startButton = document.getElementById('start-button');
  const setSelect = document.getElementById('set-select');
  const modeSelect = document.getElementById('mode-select');
  const starCountDisplay = document.getElementById('star-count');
  const pairsCountDisplay = document.getElementById('pairs-count');
  const mascotMessage = document.getElementById('mascot-message');
  const modal = document.getElementById('reward-modal');
  const finalScore = document.getElementById('final-score');
  const matchedWordsDisplay = document.getElementById('matched-words');
  const playAgainButton = document.getElementById('play-again-button');
  const howToPlay = document.getElementById('how-to-play');
  const closeHowToPlay = document.getElementById('close-how-to-play');
  const gotItButton = document.getElementById('got-it-button');
  const fullscreenButton = document.getElementById('fullscreen-button');
  const soundToggle = document.getElementById('sound-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const howToPlayButton = document.getElementById('how-to-play-button');
  const progressFill = document.getElementById('progress-fill');
  const progressStars = document.querySelectorAll('.progress-star');
  const mascot = document.getElementById('mascot');
  const body = document.body;

  // Validate critical elements
  console.log('DOM Elements loaded:', {
    cardContainer: !!cardContainer,
    startButton: !!startButton,
    setSelect: !!setSelect,
    modeSelect: !!modeSelect,
    mascotMessage: !!mascotMessage
  });

  if (!cardContainer || !startButton || !setSelect || !modeSelect) {
    console.error('Critical DOM elements not found!');
    return;
  }

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
  let lastFlipTime = 0;

  // Fullscreen Handling
  document.addEventListener('fullscreenchange', () => {
    isFullscreen = !!document.fullscreenElement;
    body.classList.toggle('fullscreen', isFullscreen);
    updateFullscreenButton();
    if (isFullscreen && mascot) {
      mascot.classList.add('foxJump');
      setTimeout(() => mascot.classList.remove('foxJump'), 600);
    }
  });

  const updateFullscreenButton = () => {
    const icon = fullscreenButton.querySelector('.btn-icon');
    if (icon) {
      icon.innerHTML = isFullscreen ? '&#10006;' : '&#9974;';
    }
    fullscreenButton.title = isFullscreen ? 'Exit Fullscreen' : 'Fullscreen';
  };

  // Audio
  const loadAudio = (src) => {
    const audio = new Audio(src);
    audio.onerror = () => console.warn(`Failed to load audio: ${src}`);
    return audio;
  };
  const correctSound = loadAudio('cheer.mp3');
  const incorrectSound = loadAudio('whoops.mp3');
  const bgMusic = loadAudio('quest.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.2;

  // Utilities
  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const waitForVoices = () => {
    return new Promise(resolve => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log('Voices already loaded:', voices.length);
        resolve(voices);
        return;
      }
      speechSynthesis.onvoiceschanged = () => {
        const loadedVoices = speechSynthesis.getVoices();
        console.log('Voices loaded:', loadedVoices.length);
        resolve(loadedVoices);
      };
    });
  };

  const getPreferredVoice = () => {
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang.includes('en-GB')) ||
                          voices.find(voice => voice.lang.includes('en'));
    if (preferredVoice) {
      console.log('Selected voice:', preferredVoice.name, preferredVoice.lang);
    } else {
      console.warn('No English voice found');
    }
    return preferredVoice;
  };

  const speakWord = async (word) => {
    if (!soundOn) {
      console.log('Sound is off, not speaking:', word);
      return;
    }
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      mascotMessage.textContent = 'Speech synthesis not supported in your browser';
      return;
    }

    try {
      const voices = await waitForVoices();
      if (voices.length === 0) {
        console.warn('No voices available');
        mascotMessage.textContent = 'No voices available for speech synthesis';
        return;
      }
      window.speechSynthesis.cancel();

      const utteranceText = word.toLowerCase() === 'a' ? 'uh' : word.replace("it's", "it's");
      const utterance = new SpeechSynthesisUtterance(utteranceText);
      utterance.lang = 'en-GB';
      const voice = getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
      } else {
        mascotMessage.textContent = 'No English voice found';
      }
      utterance.pitch = 1.0;
      utterance.rate = 0.8;
      utterance.onerror = (event) => {
        console.error('Speech error:', event.error, 'for word:', word);
        mascotMessage.textContent = `Speech error: ${event.error}`;
      };
      utterance.onend = () => console.log('Speech completed:', word);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis failed:', error);
      mascotMessage.textContent = 'Speech synthesis error occurred';
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().catch(err => console.warn('Fullscreen error:', err));
    } else {
      document.exitFullscreen().catch(err => console.warn('Exit fullscreen error:', err));
    }
  };

  // Game Logic
  const createCards = () => {
    console.log('Creating cards for mode:', currentMode, 'set:', currentSet);
    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];

    const words = sightWordsSets[currentMode]?.[currentSet] || [];
    if (!words || words.length === 0) {
      console.error('No words for mode:', currentMode, 'set:', currentSet);
      mascotMessage.textContent = 'No words available for this quest!';
      return;
    }

    let adjustedWords = words;
    if (currentMode === 'medium' && currentSet === 41) {
      adjustedWords = ['unit', 'figure', 'certain', 'unit', 'figure'].concat(['unit', 'figure', 'certain', 'unit', 'figure']);
    } else {
      adjustedWords = words.concat(words);
    }

    const cardWords = shuffleArray(adjustedWords).slice(0, 10);

    cardWords.forEach((word, index) => {
      if (!word) {
        console.warn(`Undefined word at index ${index}`);
        return;
      }

      const position = index + 1;
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Card ${position}`);
      card.dataset.word = word;
      card.dataset.position = position;

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');

      const frontFace = document.createElement('div');
      frontFace.classList.add('card-face', 'card-front');
      frontFace.innerHTML = `
        <img src="card-front.png" alt="Card front" />
        <div class="card-number">${position}</div>
      `;

      const backFace = document.createElement('div');
      backFace.classList.add('card-face', 'card-back');
      backFace.textContent = word;

      cardInner.appendChild(frontFace);
      cardInner.appendChild(backFace);
      card.appendChild(cardInner);

      card.addEventListener('click', () => flipCard(card));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flipCard(card);
        }
      });

      cardContainer.appendChild(card);
    });
  };

  const flipCard = (card) => {
    const now = Date.now();
    if (!flippingAllowed || card.classList.contains('flipped') || matchedCards.includes(card) || now - lastFlipTime < 300) return;
    lastFlipTime = now;

    card.classList.add('flipped');
    if (soundOn) speakWord(card.dataset.word);
    flippedCards.push(card);
    if (flippedCards.length === 2) checkForMatch();
  };

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
      flippedCards = [];
      flippingAllowed = true;
      updateProgressBar();

      // Update mascot message based on progress
      const matchedPairs = matchedCards.length / 2;
      const messages = [
        'Great start! Keep going!',
        'Awesome! You found another!',
        'Halfway there! You\'re doing great!',
        'Almost there! One more to go!',
        'Amazing! You found them all!'
      ];
      mascotMessage.textContent = messages[matchedPairs - 1] || 'Keep matching!';

      if (matchedCards.length === 10) showReward();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      playSound('incorrect');
      mascotMessage.textContent = 'Not quite! Try again!';
      setTimeout(() => {
        card1.classList.add('mismatch');
        card2.classList.add('mismatch');
        setTimeout(() => {
          card1.classList.remove('flipped', 'mismatch');
          card2.classList.remove('flipped', 'mismatch');
          flippedCards = [];
          flippingAllowed = true;
        }, 600);
      }, 1500);
    }
  };

  const playSound = (type) => {
    if (!soundOn) return;
    const audio = type === 'correct' ? correctSound : incorrectSound;
    audio.play().catch(error => console.warn(`Failed to play ${type} sound:`, error));
  };

  const updateScore = () => {
    const matchedPairs = matchedCards.length / 2;
    if (starCountDisplay) starCountDisplay.textContent = score;
    if (pairsCountDisplay) pairsCountDisplay.textContent = matchedPairs;
  };

  const updateProgressBar = () => {
    const progress = (matchedCards.length / 10) * 100;

    // Update fill bar
    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }

    // Update stars
    const matchedPairs = matchedCards.length / 2;
    progressStars.forEach((star, index) => {
      if (index < matchedPairs) {
        if (!star.classList.contains('earned')) {
          star.classList.add('earned');
        }
      } else {
        star.classList.remove('earned');
      }
    });
  };

  const showReward = () => {
    finalScore.textContent = score;

    // Get unique matched words
    const uniqueWords = [...new Set(matchedCards.map(card => card.dataset.word))];
    matchedWordsDisplay.textContent = uniqueWords.join(', ');

    setTimeout(() => {
      modal.classList.add('visible');
      modal.setAttribute('aria-hidden', 'false');
      if (soundOn) {
        bgMusic.pause();
        playSound('correct');
        if (mascot) {
          mascot.classList.add('foxJump');
          setTimeout(() => mascot.classList.remove('foxJump'), 600);
        }
      }
      if (typeof confetti === 'function') {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      }
      isGameInProgress = false;
    }, 800);
  };

  const startGame = () => {
    if (!setSelect.value || isNaN(parseInt(setSelect.value, 10))) {
      mascotMessage.textContent = 'Choose a quest first!';
      return;
    }
    currentSet = parseInt(setSelect.value, 10);
    currentMode = modeSelect.value;
    console.log('Starting game - Mode:', currentMode, 'Set:', currentSet);
    startButton.disabled = true;
    setSelect.disabled = true;
    modeSelect.disabled = true;
    score = 0;
    updateScore();
    updateProgressBar();
    mascotMessage.textContent = 'Find matching words!';
    flippingAllowed = true;
    isGameInProgress = true;
    createCards();
    if (soundOn) {
      bgMusic.play().catch(error => console.warn('Failed to play background music:', error));
    }
    if (mascot) {
      mascot.classList.add('foxCheer');
      setTimeout(() => mascot.classList.remove('foxCheer'), 500);
    }
  };

  const resetGame = () => {
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    startButton.disabled = false;
    setSelect.disabled = false;
    modeSelect.disabled = false;
    score = 0;
    updateScore();

    // Reset progress bar
    if (progressFill) progressFill.style.width = '0%';
    progressStars.forEach(star => star.classList.remove('earned'));

    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    currentSet = null;
    setSelect.value = '';
    mascotMessage.textContent = 'Hello, explorer! Let\'s find some words!';
    isGameInProgress = false;
    if (soundOn) {
      bgMusic.play().catch(error => console.warn('Failed to play background music:', error));
    }
  };

  const updateSetSelect = () => {
    setSelect.innerHTML = '<option value="" selected disabled>Pick a Quest</option>';
    const numSets = sightWordsSets[currentMode]?.length || 0;
    console.log('Updating sets - Mode:', currentMode, 'Number of sets:', numSets);
    for (let i = 0; i < numSets; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `Quest ${i + 1}`;
      setSelect.appendChild(option);
    }
    setSelect.disabled = numSets === 0;
    if (numSets === 0) {
      mascotMessage.textContent = 'No quests available for this mode!';
    }
  };

  const closeHowToPlayModal = () => {
    howToPlay.classList.remove('visible');
  };

  const updateSoundButton = () => {
    const icon = soundToggle.querySelector('.btn-icon');
    if (icon) {
      icon.innerHTML = soundOn ? '&#128266;' : '&#128263;';
    }
    soundToggle.title = soundOn ? 'Sound On' : 'Sound Off';
    soundToggle.classList.toggle('active', soundOn);
  };

  const updateThemeButton = () => {
    const icon = themeToggle.querySelector('.btn-icon');
    if (icon) {
      icon.innerHTML = body.classList.contains('dark') ? '&#9728;' : '&#127769;';
    }
    themeToggle.title = body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
  };

  // Event Listeners - with null checks
  if (startButton) {
    startButton.addEventListener('click', startGame);
    console.log('Start button listener attached');
  }

  if (playAgainButton) {
    playAgainButton.addEventListener('click', resetGame);
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener('click', toggleFullscreen);
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundOn = !soundOn;
      updateSoundButton();
      if (soundOn && isGameInProgress) {
        bgMusic.play().catch(error => console.warn('Failed to play background music:', error));
      } else {
        bgMusic.pause();
      }
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      updateThemeButton();
      if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }

  if (howToPlayButton && howToPlay) {
    howToPlayButton.addEventListener('click', () => {
      howToPlay.classList.add('visible');
      if (soundOn) {
        speakWord('Tap a numbered card to flip it and match the sight words!');
      }
    });
  }

  if (closeHowToPlay) {
    closeHowToPlay.addEventListener('click', closeHowToPlayModal);
  }

  if (gotItButton) {
    gotItButton.addEventListener('click', closeHowToPlayModal);
  }

  // Close modal on overlay click
  if (howToPlay) {
    howToPlay.addEventListener('click', (e) => {
      if (e.target === howToPlay) {
        closeHowToPlayModal();
      }
    });
  }

  if (modeSelect) {
    modeSelect.addEventListener('change', () => {
      currentMode = modeSelect.value;
      updateSetSelect();
    });
  }

  // Keyboard escape to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (howToPlay.classList.contains('visible')) {
        closeHowToPlayModal();
      }
    }
  });

  // Initialization
  console.log('Initializing game...');
  updateSetSelect();
  updateSoundButton();

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  }
  updateThemeButton();

  if (!localStorage.getItem('welcomeShown') && howToPlay) {
    howToPlay.classList.add('visible');
    localStorage.setItem('welcomeShown', 'true');
  }

  console.log('Game initialized successfully!');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
