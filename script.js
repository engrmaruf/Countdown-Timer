const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secsEl = document.getElementById('secs');
const dateInput = document.getElementById('date-input');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

let countdownInterval;

function updateCountdown() {
  const currentDate = new Date();
  const countdownDate = new Date(dateInput.value);

  const totalSeconds = (countdownDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const secs = Math.floor(totalSeconds) % 60;

  daysEl.innerHTML = formatTime(days);
  hoursEl.innerHTML = formatTime(hours);
  minsEl.innerHTML = formatTime(mins);
  secsEl.innerHTML = formatTime(secs);
}

function startCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(updateCountdown, 1000);

  updateCountdown();
}

function resetCountdown() {
  clearInterval(countdownInterval);
  daysEl.innerHTML = '00';
  hoursEl.innerHTML = '00';
  minsEl.innerHTML = '00';
  secsEl.innerHTML = '00';
  dateInput.value = '';
}
// Create a new MutationObserver object
const observer = new MutationObserver((mutationsList) => {
    // Loop through each mutation in the mutations list
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList' && secsEl.innerHTML === '0-1') {
        resetCountdown()
    
      }

    });
  });
  
  // Observe changes to the div element
  observer.observe(secsEl, { childList: true });

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}


startBtn.addEventListener('click', startCountdown);
resetBtn.addEventListener('click', resetCountdown);
