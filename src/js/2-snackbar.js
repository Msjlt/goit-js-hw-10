'use strict';

// Library

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Code

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(document.querySelector('[name="delay"]').value);
  const state = document.querySelector('[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        messageSize: '20px',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
