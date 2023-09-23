import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const submitButton = document.querySelector('button[type="submit"]');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + i * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

delayInput.setAttribute('min', '0');
stepInput.setAttribute('min', '0');
amountInput.setAttribute('min', '0');

amountInput.addEventListener('input', function () {
  submitButton.disabled = this.value <= 0;
});
