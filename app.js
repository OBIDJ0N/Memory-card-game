const containerEl = document.getElementById("container");
const cardsLength = 16;
const cards = [];
let previousShownCard = undefined;
let icons = [
  'html5',
  'css3',
  'js',
  'sass',
  'bootstrap',
  'react',
  'vuejs',
  'angular'
];

// It helps to use again (double-use)
icons.push(...icons);

let timerInterval; // Variable to hold the interval ID
let time = 0; // Variable to track the elapsed time

function resetCards() {
  // Shuffle the icons array
  for (let i = icons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [icons[i], icons[j]] = [icons[j], icons[i]];
  }

  // Update the HTML content of the cards
  cards.forEach((card, index) => {
    const icon = icons[index];
    const frontIcon = card.querySelector('.front i');
    frontIcon.classList.remove(...frontIcon.classList);
    frontIcon.classList.add('fa-brands', `fa-${icon}`);
    card.classList.remove('show'); // Close the card
  });
}

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000); // Start the timer and update every second
  containerEl.classList.add("pointer");
  resetGame(); // Reset the game (close cards and update them)
}

function stopTimer() {
  clearInterval(timerInterval); // Stop the timer
  containerEl.classList.remove("pointer");
  resetGame(); // Reset the game (close cards and update them)
}

function resetGame() {
  time = 0; // Reset the elapsed time
  document.getElementById("timer").textContent = time; // Update the timer display
  previousShownCard = undefined;
  resetCards(); // Reset and update the cards
}

function updateTimer() {
  time++;
  document.getElementById("timer").textContent = time; // Update the timer display
}

// Initialize the cards
for (let i = 0; i < cardsLength; i++) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');
  cardEl.innerHTML = `
    <div class="front">
      <i class="fa-brands fa-${icons[i]}"></i>
    </div>
    <div class="back">
      <i class="fa-solid fa-question"></i>
    </div>    
  `;
  cardEl.addEventListener('click', () => {
    if (!cardEl.classList.contains('show')) {
      cardEl.classList.add('show');
    }
    if (!previousShownCard) {
      previousShownCard = cardEl;
    } else {
      const iconOne = previousShownCard.querySelector('i').classList[1];
      const iconTwo = cardEl.querySelector('i').classList[1];

      if (iconOne !== iconTwo) {
        const temp = previousShownCard;
        setTimeout(() => {
          temp.classList.remove('show');
          cardEl.classList.remove('show');
        }, 800);
      }
      previousShownCard = undefined;
    }
  });

  cards.push(cardEl);
  containerEl.appendChild(cardEl);
}

// Button event listeners
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);
