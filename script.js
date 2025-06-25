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
    'only', 'ago', 'very', 'though', 'large', 'goes', 'both', 'home', 'don’t', 'any',
    'became', 'began', 'begin', 'change', 'eat', 'few', 'knew', 'music', 'really', 'through',
    'place', 'move', 'brought', 'inside', 'which', 'after', 'always', 'aunty', 'work', 'off',
    'behind', 'body', 'family', 'today', 'open', 'below', 'carry', 'finally', 'try', 'along',
    'between', 'easy', 'funny', 'often', 'done', 'city', 'eight', 'feel', 'feet', 'great',
    'sleep', 'here', 'without', 'kind', 'might', 'night', 'nice', 'once', 'rain', 'can’t',
    'catch', 'children', 'couldn’t', 'enough', 'even', 'group', 'when', 'yellow', 'low', 'money',
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
    'soon', 'song', 'being', 'Monday', 'Tuesday', 'it’s', 'colour', 'area', 'mark', 'birds',
    'problem', 'complete', 'room', 'Wednesday', 'Thursday', 'since', 'piece', 'told', 'usually', 'didn’t',
    'friends', 'order', 'sure', 'Friday', 'Saturday', 'Sunday', 'better', 'however', 'black', 'products',
    'happened', 'whole', 'measure', 'remember', 'waves', 'reached', 'listen', 'wind', 'rock', 'space',
    'covered', 'several', 'himself', 'towards', 'five', 'passed', 'vowel', 'true', 'hundred', 'pattern',
    'numeral', 'table', 'north', 'slowly', 'farm', 'pulled', 'voice', 'seen', 'cried', 'plan',
    'notice', 'south', 'sing', 'ground', 'king', 'town', 'I’ll', 'unit', 'figure', 'certain',
    'field', 'travel', 'wood', 'used'
  ];

  const sightWordsHard = [
    'love', 'come', 'some', 'put', 'push',
    'because', 'find', 'kind', 'behind', 'child'
  ];

  // Sight Words Sets
  const sightWordsSets = {
    easy: Array.from({ length: 10 }, (_, i) => sightWordsEasy.slice(i * 5, (i + 1) * 5)),
    medium: Array.from({ length: 42 }, (_, i) => sightWordsMedium.slice(i * 5, i * 5 + (i === 41 ? 3 : 5))),
    hard: Array.from({ length: 2 }, (_, i) => sightWordsHard.slice(i * 5, (i + 1) * 5))
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
  const fullscreenButton = document.getElementById('fullscreen-button');
  const soundToggle = document.getElementById('sound-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const howToPlayButton = document.getElementById('how-to-play-button');
  const progressBar = document.getElementById('progress-bar');
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
  let lastFlipTime = 0;

  // Fullscreen Handling
  document.addEventListener('fullscreenchange', () => {
    isFullscreen = !!document.fullscreenElement;
    body.classList.toggle('fullscreen', isFullscreen);
    fullscreenButton.textContent = isFullscreen ? 'Exit Full Screen' : 'Full Screen';
    if (isFullscreen) {
      document.getElementById('mascot').classList.add('foxJump');
      setTimeout(() => document.getElementById('mascot').classList.remove('foxJump'), 1200);
    }
  });

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
    // Fisher-Yates shuffle
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getPreferredFemaleVoice = () => {
    const voices = speechSynthesis.getVoices();
    const femaleIndicators = ['female', 'samantha', 'kate', 'victoria', 'alice', 'moira', 'tessa', 'zira'];
    let preferredVoice = voices.find(voice =>
      voice.lang === 'en-GB' && femaleIndicators.some(indicator => voice.name.toLowerCase().includes(indicator))
    );
    return preferredVoice || voices.find(voice =>
      femaleIndicators.some(indicator => voice.name.toLowerCase().includes(indicator))
    );
  };

  // Ensure voices are loaded
  speechSynthesis.onvoiceschanged = () => {
    console.log('Voices loaded:', speechSynthesis.getVoices().length);
  };
  speechSynthesis.getVoices(); // Trigger voice loading

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
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
      console.error('No words available for the selected mode and set.');
      mascotMessage.textContent = 'Error: No words available for this quest!';
      return;
    }

    let adjustedWords = words;
    if (currentMode === 'medium' && currentSet === 41) {
      // Last set has 3 words: 'unit', 'figure', 'certain'
      adjustedWords = ['unit', 'figure', 'certain', 'unit', 'figure'].concat(['unit', 'figure', 'certain', 'unit', 'figure']);
    } else {
      adjustedWords = words.concat(words);
    }

    const cardWords = shuffleArray(adjustedWords).slice(0, 10);

    cardWords.forEach((word, index) => {
      if (!word) {
        console.warn(`Word at index ${index} is undefined, skipping card creation.`);
        return;
      }

      const position = index + 1;
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Flip card ${position} with word ${word} on the back`);
      card.dataset.word = word;
      card.dataset.position = position;

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner', 'unmatched');

      const frontFace = document.createElement('div');
      frontFace.classList.add('card-face', 'card-front');
      frontFace.innerHTML = `
        <img src="card-front.png" alt="Card image" />
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
        if (e.key === 'Enter' || e.key === ' ') flipCard(card);
      });

      cardContainer.appendChild(card);
    });

    cardContainer.classList.add('pulse');
    setTimeout(() => cardContainer.classList.remove('pulse'), 6000);
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
      card1.classList.remove('unmatched');
      card2.classList.remove('unmatched');
      flippedCards = [];
      flippingAllowed = true;
      updateProgressBar();
    } else {
      playSound('incorrect');
      setTimeout(() => {
        card1.classList.add('mismatch');
        card2.classList.add('mismatch');
        setTimeout(() => {
          card1.classList.remove('flipped', 'mismatch');
          card2.classList.remove('flipped', 'mismatch');
          flippedCards = [];
          flippingAllowed = true;
        }, 1000);
      }, 2000);
    }
  };

  const speakWord = (word) => {
    if (!soundOn || !speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(word.toLowerCase());
    utterance.lang = 'en-GB';
    const bestVoice = getPreferredFemaleVoice();
    if (bestVoice) utterance.voice = bestVoice;
    utterance.rate = 1.0;
    speechSynthesis.speak(utterance);
  };

  const playSound = (type) => {
    if (!soundOn) return;
    const audio = type === 'correct' ? correctSound : incorrectSound;
    audio.play().catch((error) => console.error('Error playing sound:', error));
  };

  const updateScore = () => {
    const matchedPairs = matchedCards.length / 2;
    scoreDisplay.textContent = `Score: ${score} / Pairs: ${matchedPairs}/5}`;
  };

  const updateProgressBar = () => {
    const progress = (matchedCards.length / 10) * 100;
    progressBar.style.width = `${progress}%`;
  };

  const showRewardModal = () => {
    finalScore.textContent = score;
    matchedWordsDisplay.textContent = matchedCards.map(card => card.dataset.word).join(', ');
    modal.style.display = 'block';
    if (soundOn) playSound('correct');
  };

  const startGame = () => {
    currentSet = setSelect.value;
    currentMode = modeSelect.value;
    createCards();
    updateScore();
    mascotMessage.textContent = 'Find a match!';
    flippingAllowed = true;
    isGameInProgress = true;
    if (soundOn) bgMusic.play();
  };

  const resetGame = () => {
    modal.style.display = 'none';
    startButton.disabled = false;
    setSelect.disabled = false;
    modeSelect.disabled = false;
    score = 0;
    updateScore();
    cardContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    currentSet = null;
    mascotMessage.textContent = 'Pick a quest!';
    isGameInProgress = false;
  };

  const updateSetSelect = () => {
    setSelect.innerHTML = '';
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
  fullscreenButton.addEventListener('click', toggleFullscreen);
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? 'Sound On' : 'Sound Off';
    if (!soundOn) bgMusic.pause();
  });

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    themeToggle.textContent = body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
  });

  howToPlayButton.addEventListener('click', () => {
    howToPlay.style.display = 'block';
  });

  closeHowToPlay.addEventListener('click', () => {
    howToPlay.style.display = 'none';
  });

  modeSelect.addEventListener('change', updateSetSelect);

  // Initialization
  updateSetSelect();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
