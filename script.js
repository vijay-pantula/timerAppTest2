/**
 * Timer App JavaScript
 * Handles Pomodoro timer modes and controls
 */

const timerDisplay = document.getElementById('timer-display');
const modeButtons = document.querySelectorAll('.mode-btn');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const alarmAudio = document.getElementById('alarm-audio');

let timerDuration = 1500; // default 25 minutes in seconds
let timeRemaining = timerDuration;
let timerInterval = null;
let isRunning = false;

// Format seconds as HH:MM:SS
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return (
    (hrs > 0 ? String(hrs).padStart(2, '0') + ':' : '') +
    String(mins).padStart(2, '0') + ':' +
    String(secs).padStart(2, '0')
  );
}

// Update the timer display
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeRemaining);
}

// Switch timer mode
function switchMode(newDuration, button) {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
  timerDuration = newDuration;
  timeRemaining = timerDuration;
  updateDisplay();
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  startBtn.disabled = false;

  // Update active button styling
  modeButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

// Timer countdown function
function countdown() {
  if (timeRemaining > 0) {
    timeRemaining--;
    updateDisplay();
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    alarmAudio.play();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
  }
}

// Event listeners for mode buttons
modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const newDuration = parseInt(button.getAttribute('data-time'));
    switchMode(newDuration, button);
  });
});

// Start button event
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    timerInterval = setInterval(countdown, 1000);
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
  }
});

// Pause button event
pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
  }
});

// Stop button event
stopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  isRunning = false;
  timeRemaining = timerDuration;
  updateDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
});

// Reset button event
resetBtn.addEventListener('click', () => {
  timeRemaining = timerDuration;
  updateDisplay();
  resetBtn.disabled = true;
});

updateDisplay();
