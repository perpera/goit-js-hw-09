const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

function startColorChange() {
  if (!intervalId) {
    startBtn.disabled = true;
    changeColor();
    stopBtn.disabled = false;
    intervalId = setInterval(changeColor, 1000);
    startBtn.removeEventListener('click', startColorChange);
  }
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function stopColorChange() {
  clearInterval(intervalId);
  intervalId = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  startBtn.addEventListener('click', startColorChange);
}
