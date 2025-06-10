
function startTimer (container, state) {


  const interval = setInterval(() =>{
    if (state.timeLeft > 0) {
      state.timeLeft--;
      state.isRunning = true;
      updateUi(container, state);
    } else {
      clearInterval(interval);
      alert('times up');
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
  if (state.isPaused && state.timeLeft > 0) {
    state.isPaused = false;
    startTimer(container, state);
  }
}

function resetTimer(container, state) {
  clearInterval(state.intervalId);
  state.intervalId = null;
  state.timeLeft = 25 * 60;
  state.isReset = true;
  state.isRunning = false;

  updateUi(container, state);
  updateButtonStates(container, state)
}

function updateButtonStates(container, state) {
  const startBtn = container.querySelector('.start-btn');
  const pauseBtn = container.querySelector('.pause-btn');
  
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
    pauseBtn.disabled = true;
  }
}

function updateUi(container, state) {
  container.querySelector('.timer-display').textContent = formatTime(state.timeLeft) ;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export function initPomodoro (container) {

  const state = {
   timeLeft: 25 * 60,
   intervalId: null,
   isPaused: false,
   isRunning: false,
   isReset: false
  }

    container.innerHTML = `
    <div class="pomodoro-widget">
    <h2>Pomodoro Timer</h2>
    <div class="timer-display">25:00</div>
    <div class="controls">
      <button class="start-btn">Start</button>
      <button class="pause-btn">Pause</button>
      <button class="reset-btn">Reset</button>
    </div>
    <p class="status">Focus time</p>
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