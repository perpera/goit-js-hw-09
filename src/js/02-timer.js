import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');
const inputField = document.querySelector('#datetime-picker');
let timerIsActive = false;
let intervalId;

const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

resetBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: 'today',
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      Notiflix.Notify.success('Date selected successfully');
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function updateTimer(targetDate) {
  function updateDisplay() {
    const currentDate = new Date();
    const timeDif = targetDate - currentDate;

    if (timeDif <= 0) {
      clearInterval(intervalId);
      timerIsActive = false;
      Object.values(timerFields).forEach(field => (field.textContent = '00'));
      inputField.disabled = false;
      startBtn.disabled = true;
      resetBtn.disabled = true;
      return;
    }

    function format(value) {
      return String(value).padStart(2, '0');
    }

    const { days, hours, minutes, seconds } = convertMs(timeDif);
    timerFields.days.textContent = format(days);
    timerFields.hours.textContent = format(hours);
    timerFields.minutes.textContent = format(minutes);
    timerFields.seconds.textContent = format(seconds);
  }
  intervalId = setInterval(updateDisplay, 1000);
  updateDisplay();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  if (!timerIsActive) {
    const selectedDate = flatpickr.parseDate(inputField.value, 'Y-m-d H:i');
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      updateTimer(selectedDate);
      timerIsActive = true;
      inputField.disabled = true;
      resetBtn.disabled = false;
    }
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  timerIsActive = false;
  Object.values(timerFields).forEach(field => (field.textContent = '00'));
  inputField.disabled = false;
  inputField.value = '';
  resetBtn.disabled = true;
  startBtn.disabled = true;
});
