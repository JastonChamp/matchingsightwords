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
    'of', 'no', 'they', 'find', 'two',
    'while', 'me', 'saw', 'here', 'take',
    'out', 'would', 'should', 'could', 'good',
    'made', 'across', 'come', 'water', 'will',
    'see', 'under', 'other', 'before', 'brother',
    'used', 'way', 'please', 'fine', 'love',
    'mother', 'down', 'make', 'keep', 'high',
    'put', 'who', 'boy', 'ate', 'leave',
    'eye', 'cold', 'something', 'girl', 'been',
    'these', 'nothing', 'salt', 'become', 'watch',
    'same', 'sea', 'buy', 'because', 'give',
    'head', 'say', 'flies', 'wrote', 'upon',
    'just', 'may', 'green', 'fly', 'by',
    'from', 'with', 'until', 'must', 'maybe',
    'young', 'you', 'wolf', 'where', 'away',
    'pretty', 'why', 'very', 'though', 'became',
    'aunty', 'finally', 'here', 'enough', 'large',
    'change', 'work', 'funny', 'without', 'even',
    'goes', 'any', 'off', 'today', 'kind',
    'group', 'both', 'eat', 'open', 'try',
    'might', 'when', 'home', 'through', 'along',
    'often', 'night', 'yellow', 'don’t', 'place',
    'behind', 'done', 'nice', 'low', 'music',
    'move', 'below', 'city', 'once', 'money',
    'knew', 'brought', 'between', 'eight', 'rain',
    'most', 'few', 'inside', 'body', 'feel',
    'can’t', 'much', 'began', 'which', 'carry',
    'feet', 'catch', 'new', 'really', 'after',
    'easy', 'great', 'children', 'page', 'begin',
    'always', 'family', 'sleep', 'couldn’t', 'hard',
    'start', 'every', 'our', 'small', 'fall',
    'dear', 'part', 'everywhere', 'we', 'walk',
    'point', 'idea', 'last', 'parent', 'first',
    'already', 'another', 'year', 'laugh', 'ever',
    'hurt', 'toy', 'against', 'near', 'car',
    'never', 'heard', 'found', 'ear', 'ball',
    'half', 'number', 'call', 'house', 'able',
    'blue', 'ask', 'together', 'door', 'around',
    'outside', 'during', 'father', 'answer', 'draw',
    'almost', 'pull', 'front', 'air', 'early',
    'four', 'hear', 'far', 'hold', 'earth',
    'hour', 'horse', 'push', 'question', 'later',
    'more', 'short', 'fire', 'bought', 'letter',
    'morning', 'talk', 'right'
  ];

  const sightWordsHard = [
    'love', 'come', 'some', 'put', 'push',
    'because', 'find', 'kind', 'behind', 'child'
  ];

  // Sight Words Sets
  const sightWordsSets = {
    easy: Array.from({ length: 10 }, (_, i) => sightWordsEasy.slice(i * 5, (i + 1) * 5)),
    medium: Array.from({ length: 48 }, (_, i) => sightWordsMedium.slice(i * 5, i * 5 + (i === 47 ? 3 : 5))),
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
   const fullscreenButton = document.getElementById('fullscreen-button');
  const soundToggle = document.getElementById('sound-toggle');
  const themeToggle = document.getElementById('theme-toggle');
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
  const correctSound = loadAudio('sounds/cheer.mp3');
  const incorrectSound = loadAudio('sounds/whoops.mp3');
  const bgMusic = loadAudio('sounds/quest.mp3');
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

  const getPreferredFemaleVoice = () => {
    const voices = speechSynthesis.getVoices();
    const femaleIndicators = ['female', 'samantha', 'kate', 'victoria', 'alice', 'moira', 'tessa', 'zira'];
    let preferredVoice = voices.find(voice =>
      voice.lang === 'en-GB' && femaleIndicators.some(indicator => voice.name.toLowerCase().includes(indicator))
    );
    if (!preferredVoice) {
      preferredVoice = voices.find(voice =>
        femaleIndicators.some(indicator => voice.name.toLowerCase().includes(indicator))
      );
    }
    return preferredVoice;
  };

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
    if (currentMode === 'medium' && currentSet === 47) {
      const wordPool = ['morning', 'talk', 'right'];
      const pairs = [...wordPool, ...wordPool.slice(0, 2)];
      adjustedWords = pairs.flatMap(word => [word, word]);
    } else {
      adjustedWords = words.concat(words);
    }

    const cardWords = shuffleArray(adjustedWords).slice(0, 10);

    Array.from({ length: 10 }, (_, i) => i).forEach((position, index) => {
      const word = cardWords[index];
      if (!word) {
        console.warn(`Word at index ${index} is undefined, skipping card creation for position ${position + 1}.`);
        return;
      }

      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Flip card ${position + 1} with word ${word} on the back`);
      card.dataset.word = word;
      card.dataset.position = position + 1;

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner', 'unmatched');

      const frontFace = document.createElement('div');
      frontFace.classList.add('card-face', 'card-front');
      frontFace.innerHTML = `
       <img src="card-front.png" alt="Card image" />
        <div class="card-number">${position + 1}</div>
      `;


      const backFace = document.createElement('div');
      backFace.classList.add('card-face', 'card-back');
      backFace.textContent = word;

      cardInner.appendChild(frontFace, backFace);
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
    if (!flippingAllowed || card.classList.contains('flipped') || matchedCards.includes(card)) return;

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
      if (matchedCards.length === 10) showReward();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
     playSound('incorrect');
      // Delay slightly longer so words remain visible before flipping back
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
    speechSynthesis.cancel();

    let utteranceText = word.toLowerCase() === 'a' ? 'uh' : word;
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.lang = 'en-GB';
    const bestVoice = getPreferredFemaleVoice();
    if (bestVoice) utterance.voice = bestVoice;
    utterance.pitch = 1.3;
    utterance.rate = 0.7;
    utterance.onerror = () => console.warn('Speech synthesis error for word:', word);
    speechSynthesis.speak(utterance);
  };

  const playSound = (type) => {
    if (!soundOn) return;
    const audio = type === 'correct' ? correctSound : incorrectSound;
    audio.play().catch((error) => {
      console.warn(`Failed to play ${type} sound: ${error}`);
      audio.load();
      audio.play();
    });
  };

  const updateScore = () => {
    const matchedPairs = matchedCards.length / 2;
    scoreDisplay.textContent = `Fox Stars: ${score} / Pairs: ${matchedPairs}/5`;
  };

  const updateProgressBar = () => {
    const progress = (matchedCards.length / 10) * 100;
    progressBar.style.background = `linear-gradient(to right, #FFD54F 0%, #FFD54F ${progress}%, transparent ${progress}%)`;
    progressBar.querySelectorAll('.star-icon').forEach((star, index) => {
      star.style.opacity = index < matchedCards.length / 2 ? 1 : 0.3;
    });
  };

  const showReward = () => {
    finalScore.textContent = score;
    const matchedWords = matchedCards.map(card => `${card.dataset.word} (Card ${card.dataset.position})`).join(', ');
    matchedWordsDisplay.textContent = matchedWords;
    setTimeout(() => {
      modal.classList.add('visible');
      modal.setAttribute('aria-hidden', 'false');
      if (soundOn) {
        bgMusic.pause();
        playSound('correct');
        document.getElementById('mascot').classList.add('foxJump');
        setTimeout(() => document.getElementById('mascot').classList.remove('foxJump'), 1200);
      }
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
      isGameInProgress = false;
    }, 1000);
  };

  const startGame = () => {
    if (!setSelect.value) {
      mascotMessage.textContent = 'Choose a quest first!';
      return;
    }
    speechSynthesis.getVoices();
    currentSet = parseInt(setSelect.value, 10);
    currentMode = modeSelect.value;
    startButton.disabled = true;
    setSelect.disabled = true;
    modeSelect.disabled = true;
    score = 0;
    updateScore();
    mascotMessage.textContent = 'Find a match!';
    flippingAllowed = true;
    isGameInProgress = true;
    createCards();
    if (soundOn) {
      bgMusic.play().catch((error) => console.warn('Failed to play background music:', error));
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
      bgMusic.play().catch((error) => console.warn('Failed to play background music:', error));
    }
  };

  const updateSetSelect = () => {
    setSelect.innerHTML = '<option value="" selected disabled>Pick a Quest!</option>';
    const numSets = sightWordsSets[currentMode].length;
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

  // Event Listeners
  startButton.addEventListener('click', startGame);
  playAgainButton.addEventListener('click', resetGame);
  fullscreenButton.addEventListener('click', toggleFullscreen);
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? 'Sound On' : 'Sound Off';
    if (soundOn && isGameInProgress) {
      bgMusic.play().catch((error) => console.warn('Failed to play background music:', error));
    } else {
      bgMusic.pause();
    }
  });

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      themeToggle.textContent = 'Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.textContent = 'Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });

  howToPlayButton.addEventListener('click', () => {
    howToPlay.classList.add('visible');
    if (soundOn) {
      speakWord('Tap or click a card numbered 1 to 10 to flip it and match the sight words on the back! Focus on the numbers to find pairs and earn Fox Stars.');
    }
  });

  closeHowToPlay.addEventListener('click', () => {
    howToPlay.classList.remove('visible');
  });

  modeSelect.addEventListener('change', updateSetSelect);

  // Initialization
  updateSetSelect();
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
   fullscreenButton.addEventListener('click', toggleFullscreen);
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? 'Sound On' : 'Sound Off';
    if (soundOn && isGameInProgress) {
      bgMusic.play().catch((error) => {
        console.warn('Failed to play background music:', error);
        bgMusic.load();
        bgMusic.play().catch((retryError) => console.error('Background music retry failed:', retryError));
      });
    } else {
      bgMusic.pause();
    }
  });

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      themeToggle.textContent = 'Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.textContent = 'Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });
    
  howToPlayButton.addEventListener('click', () => {
    howToPlay.classList.add('visible');
    if (soundOn) {
      speakWord('Tap or click a card numbered 1 to 10 to flip it and match the sight words on the back! Focus on the numbers to find pairs and earn Fox Stars.');
    }
  });

  closeHowToPlay.addEventListener('click', () => {
    howToPlay.classList.remove('visible');
  });

  // Initialization
  updateSetSelect();
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = 'Light Mode';
  } else {
    themeToggle.textContent = 'Dark Mode';
  }
  if (!localStorage.getItem('welcomeShown')) {
    howToPlay.classList.add('visible');
    localStorage.setItem('welcomeShown', 'true');
  }

  // Note: Make sure to include the external confetti library in your HTML head:
  // <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
