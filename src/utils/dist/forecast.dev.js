"use strict";

var request = require('request');

var forecast = function forecast(lt, lg, callback) {
  var url = "http://api.weatherstack.com/current?access_key=a2736c911ca1a0db0163284f6f12678e&query=".concat(lt, ",").concat(lg);
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    debugger;

    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback(body.error.info);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;