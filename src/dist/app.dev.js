"use strict";

var path = require('path');

var express = require('express');

var hbs = require('hbs');

var geocode = require('./utils/geocode');

var forecast = require('./utils/forecast');

var app = express();
var port = 3000; // Define paths for Express cinfig

var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); // Set up handlebars engine and view location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // Set up static directory to serve

app.use(express["static"](publicDirectoryPath));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather App',
    name: 'Emiliano H',
    message: 'Welcome to my page!'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: "About me",
    name: 'Emiliano H',
    message: 'A little story about me...'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    title: "Help Page",
    name: "Emiliano H",
    message: 'We are here to help you!'
  });
});
app.get('/weather', function (req, res) {
  var address = req.query.address;

  if (!address) {
    res.send({
      error: 'You must provide an address!'
    });
    return;
  }

  geocode(address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        name = _ref.name;

    if (error) return res.send({
      error: error
    });
    forecast(latitude, longitude, function (error, forecastData) {
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        forecastData: forecastData,
        name: name
      });
    });
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: '404 Page',
    name: "Emiliano H",
    message: 'Article not found'
  });
});
app.get('*', function (req, res) {
  res.render('404', {
    title: '404 Page',
    name: "Emiliano H",
    message: 'Page not found'
  });
});
app.listen(port, function () {
  console.log("Server running on port: ".concat(port));
});