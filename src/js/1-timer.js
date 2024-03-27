'use strict';

// Library

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Code

let userSelectedDate;
const startBtn = document.getElementById('start-btn');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

startBtn.disabled = true;

flatpickr('#datetime-picker', options);

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
  const currentDate = new Date();
  let timeDifference = userSelectedDate - currentDate;
  if (timeDifference < 0) {
    return;
  }

  updateTimer(timeDifference);

  let timerInterval = setInterval(() => {
    timeDifference -= 1000;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: 'Success',
        message: 'Timer finished!',
      });
      startBtn.disabled = true;
    } else {
      updateTimer(timeDifference);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}

function updateTimer(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  document.getElementById('days').textContent = addLeadingZero(days);
  document.getElementById('hours').textContent = addLeadingZero(hours);
  document.getElementById('minutes').textContent = addLeadingZero(minutes);
  document.getElementById('seconds').textContent = addLeadingZero(seconds);
}
