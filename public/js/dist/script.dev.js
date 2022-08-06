"use strict";

var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');

var fetchData = function fetchData() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return fetch("/weather?address=".concat(location)).then(function (res) {
    res.json().then(function (data) {
      if (data.error) {
        messageOne.textContent = "Error: ".concat(data.error, " ");
      } else {
        messageOne.textContent = data.name;
        messageTwo.textContent = data.forecastData;
      }
    });
  });
};

weatherForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetchData(location);
});