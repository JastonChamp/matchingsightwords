// JavaScript code
const wheel = document.querySelector('.wheel');
const challengingWordsSets = [
    ['a', 'about', 'above', 'again', 'all'],
    ['also', 'are', 'be', 'came', 'day'],
    ['do', 'does', 'for', 'go', 'he'],
    ['her', 'his', 'how', 'I', 'in'],
    ['into', 'is', 'it', 'know', 'many'],
    ['name', 'not', 'now', 'of', 'on'],
    ['one', 'over', 'said', 'it', 'know'],
    ['many', 'name', 'not', 'now', 'of'],
    ['on', 'one', 'over', 'said', 'she'],
    ['so', 'some', 'story', 'the', 'their'],
    ['then', 'there', 'this', 'to', 'too'],
    ['want', 'was', 'were', 'what', 'when', 'white']
];

let currentSet = 0;
let shuffledWords = [];

function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create and append slots to the DOM
function createSlots() {
    wheel.innerHTML = '';
    const wordSet = challengingWordsSets[currentSet];
    for (let word of wordSet) {
        for (let i = 0; i < 2; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.textContent = 'Click to reveal';
            wheel.appendChild(slot);
        }
    }
    shuffledWords = shuffleArray(wordSet.slice().concat(wordSet.slice())); // Add two of each word
}

const slots = document.querySelectorAll('.slot');
let currentSlot = 0;

document.getElementById('spinButton').addEventListener('click', () => {
    createSlots();
    currentSlot = 0;
    spin();
});

function spin() {
    let shuffleCount = 0;
    let lastRandom = 0;

    const shuffleEffect = setInterval(() => {
        slots[lastRandom].style.display = 'none';
        const randomSlot = Math.floor(Math.random() * slots.length);
        slots[randomSlot].style.display = 'flex';
        lastRandom = randomSlot;
        shuffleCount++;
        if (shuffleCount > 20) {
            clearInterval(shuffleEffect);
            slots[lastRandom].style.display = 'none';
            slots[currentSlot].style.display = 'flex';
        }
    }, 100);

    setTimeout(() => {
        const randomSlot = Math.floor(Math.random() * slots.length);
        slots[currentSlot].style.display = 'none';
        slots[randomSlot].style.display = 'flex';
        currentSlot = randomSlot;
    }, 2500);
}

// Initialize the spinner
createSlots();
spin();
