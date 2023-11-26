const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

buttonStart.addEventListener('click', () => {
  buttonStart.setAttribute('disabled', '');
  buttonStop.removeAttribute('disabled');

  timerId = setInterval(() => {
    const value = getRandomHexColor();
    body.style.backgroundColor = `${value}`;
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', '');
  clearInterval(timerId);
});
