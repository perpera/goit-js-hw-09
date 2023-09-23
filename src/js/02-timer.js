import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
      Notiflix.Notify.success('Date selected successfully');
    }
  },
};

flatpickr('#datetime-picker', options);

function updateTimer(targetDate) {
  const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

  function updateDisplay() {
    const currentDate = new Date();
    const timeDif = targetDate - currentDate;

    if (timeDif <= 0) {
      clearInterval(intervalId);
      Object.values(timerFields).forEach(field => (field.textContent = '00'));
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

  const intervalId = setInterval(updateDisplay, 1000);
  updateDisplay();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(
    document.querySelector('#datetime-picker').value,
    'Y-m-d H:i'
  );
  updateTimer(selectedDate);
});
