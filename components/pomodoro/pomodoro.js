
function startTimer (container, state) {
// Condition check to disable start button from running timer again from start
  if (state.isRunning || state.isPaused) return;
// Start a countdown and update UI every second
  const interval = setInterval(() =>{
    if (state.timeLeft > 0) {
      state.timeLeft--;
      state.isRunning = true;
      updateUi(container, state);
    } else {
      clearInterval(interval);
      displayMessage(container);
      resetTimer(container, state);
    }
  }, 1000)
  state.intervalId = interval;
}

function pauseTimer(container, state) {
  if (state.intervalId && state.isRunning) {
    clearInterval(state.intervalId);
    state.intervalId = null;
    state.isRunning = false;
    state.isPaused = true;
    updateButtonStates(container, state);
  }
}

function resumeTimer(container, state) {
  if (state.isPaused && state.timeLeft > 0 ) {
    state.isPaused = false;
    startTimer(container, state);
    updateButtonStates(container, state);
  }
}

function resetTimer(container, state) {
  clearInterval(state.intervalId);
  state.intervalId = null;
  // Reset timer back to 1500 seconds
  state.timeLeft = 25 * 60;
  state.isReset = true;
  state.isRunning = false;
  state.isPaused = false;

  updateUi(container, state);
  updateButtonStates(container, state)
}
// Display dynamic message once the timer runs out
function displayMessage(container) {
  const overlay = document.createElement('div');
  overlay.classList.add('timer-overlay');
  // Inject html structure dynamically
  overlay.innerHTML = `
    <div class="timer-message">
      <h2>Time's Up! 🎉</h2>
      <p>Take a break or start another session.</p>
      <button class="close-overlay-btn">Close</button>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('.close-overlay-btn').addEventListener('click', ()=> {
    document.body.removeChild(overlay);
  })
}

function updateButtonStates(container, state) {
  const startBtn = container.querySelector('.start-btn');
  const pauseBtn = container.querySelector('.pause-btn');
  // Check state of the timer and disable or activate buttons and change their textcontent
  if (state.isRunning) {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  } else if (state.isPaused) {
    startBtn.textContent = 'Resume';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  } else {
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
    pauseBtn.disabled = false;
  }
}

// Update UI with remaining time from the state.timeLeft object
function updateUi(container, state) {
  container.querySelector('.timer-display').textContent = formatTime(state.timeLeft) ;
}
// Convert seconds in to MM:SS string format
function formatTime(seconds) {
  // Padstart makes sure that there are always two numbers for example '2' becomes '02'
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  // Return final format 
  return `${mins}:${secs}`;
}

export function initPomodoro (container) {
// State object with all the values and switches
  const state = {
    // Using expression which represents 1500 seconds for clarity and maintainability
   timeLeft: 25 * 60,
   intervalId: null,
   isPaused: false,
   isRunning: false,
   isReset: false
  }

    container.innerHTML = `
    <div class="pomodoro-widget">
    <h2>Pomodoro Timer</h2>
    <p class="status">Focus time</p>
    <div class="timer-display">25:00</div>
    <div class="controls">
      <button class="start-btn">Start</button>
      <button class="pause-btn">Pause</button>
      <button class="reset-btn">Reset</button>
    </div>
  </div>
    `;
    
    const startBtn = container.querySelector('.start-btn');
    const pauseBtn = container.querySelector('.pause-btn');
    const resetBtn = container.querySelector('.reset-btn');

    startBtn.addEventListener('click', () => {
      if (state.isPaused) {
        resumeTimer(container, state);
      } else {
        startTimer(container, state);
      }
    });
    pauseBtn.addEventListener('click', ()=> pauseTimer(container, state));
    resetBtn.addEventListener('click', ()=> resetTimer(container, state));
}