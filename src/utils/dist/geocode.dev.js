"use strict";

var request = require('request');

var geocode = function geocode(address, callback) {
  address = encodeURIComponent(address);
  var url = "http://api.positionstack.com/v1/forward?access_key=2ac00f280de23a0b3443dee23cd4390c&query=".concat(address, "&limit=1");
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (error) {
      callback('Unable to connect to geolocalization service!', undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else {
      var _body$data$ = body.data[0];
      latitude = _body$data$.latitude;
      longitude = _body$data$.longitude;
      name = _body$data$.name;
      address = decodeURIComponent(address);
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        name: name
      });
    }
  });
};

module.exports = geocode;