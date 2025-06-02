
function startTimer (container, state) {
  // Check if the timer is already running and if it is exit function
  if (state.intervalId !== null) return; 

  const interval = setInterval(() =>{
    if (state.timeLeft > 0) {
      state.timeLeft--;
      state.intervalId = interval;
      updateUi(container, state);
    } else {
      clearInterval(interval);
      alert('times up');
    }
  }, 1000)
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
   intervalId: null
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
    startBtn.addEventListener('click', ()=> startTimer(container, state));
}