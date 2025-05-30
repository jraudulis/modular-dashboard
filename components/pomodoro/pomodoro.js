
function startTimer (container) {
    const startBtn = container.querySelector('.start-btn');
}

export function initPomodoro (container) {
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
}