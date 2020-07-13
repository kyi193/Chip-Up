/* eslint-env browser */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/Chip-Up/expo-service-worker.js', { scope: '/Chip-Up/' })
      .then(function (info) {
        // console.info('Registered service-worker', info);
      })
      .catch(function (error) {
        console.info('Failed to register service-worker', error);
      });
  });
}
