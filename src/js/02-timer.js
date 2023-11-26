import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timerDiv = document.querySelector('.timer');
const fieldDivs = document.querySelectorAll('.field');
const input = document.querySelector('input#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

let selectedTime;
let timerId = null;
let currentTime;

timerDiv.style.display = 'flex';
timerDiv.style.marginTop = '30px';
timerDiv.style.gap = '10px';
buttonStart.setAttribute('disabled', '');

for (const fieldDiv of fieldDivs) {
  fieldDiv.style.display = 'flex';
  fieldDiv.style.flexDirection = 'column';
  fieldDiv.style.alignItems = 'center';
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.removeAttribute('disabled');
      selectedTime = selectedDates[0].getTime();
    }
  },
};

const calendar = flatpickr(input, options);
buttonStart.addEventListener('click', onBtnClick);

function onBtnClick() {
  currentTime = new Date().getTime();
  timerId = setInterval(start, 1000);
}

function start() {
  if (selectedTime > currentTime) {
    const deltaTime = selectedTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimer({ days, hours, minutes, seconds });
    currentTime += 1000;
  } else {
    clearInterval(timerId);
  }
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysValue.textContent = `${days}`;
  hoursValue.textContent = `${hours}`;
  minutesValue.textContent = `${minutes}`;
  secondsValue.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
