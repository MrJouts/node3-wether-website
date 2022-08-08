"use strict";

var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');
var image = document.querySelector('#image');

var fetchData = function fetchData() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return fetch("/weather?address=".concat(location)).then(function (res) {
    res.json().then(function (data) {
      if (data.error) {
        messageOne.textContent = "Error: ".concat(data.error, " ");
      } else {
        messageOne.textContent = data.name;
        var _data$forecastData$cu = data.forecastData.current,
            temperature = _data$forecastData$cu.temperature,
            precip = _data$forecastData$cu.precip,
            observation_time = _data$forecastData$cu.observation_time,
            weather_icons = _data$forecastData$cu.weather_icons;
        var message = "\n                            There is  ".concat(temperature, "\xB0C and a ").concat(precip, "% to rain.\n                            Local time: ").concat(observation_time, "\n                        ");
        messageTwo.textContent = message;
        var imgElement = document.createElement('img');
        imgElement.setAttribute('src', weather_icons[0]);
        image.appendChild(imgElement);
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