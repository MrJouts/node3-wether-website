"use strict";

var request = require('request');

var forecast = function forecast(_ref, callback) {
  var lt = _ref.latitude,
      lg = _ref.longitude;
  var url = "http://api.weatherstack.com/current?access_key=a2736c911ca1a0db0163284f6f12678e&query=".concat(lt, ",").concat(lg);
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback(body.error.info);
    } else {
      var _body$current = body.current;
      temperature = _body$current.temperature;
      precip = _body$current.precip;
      callback(undefined, "Temperature: ".concat(temperature, "\xB0 | Precipitation chance: ").concat(precip, "%"));
    }
  });
};

module.exports = forecast;