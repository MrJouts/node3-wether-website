const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express cinfig
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Emiliano H',
        message: 'Welcome to my page!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: 'Emiliano H',
        message: 'A little story about me...'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "Emiliano H",
        message: 'We are here to help you!'
    })
})

app.get('/weather', (req, res) => {

    const { address } = req.query
    if (!address) {
        res.send({ 
            error: 'You must provide an address!' 
        })
        return
    }

    geocode(address, (error, {latitude, longitude, name} = {}) => {
        if (error) return res.send({ error })
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecastData,
                name
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: "Emiliano H",
        message: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: "Emiliano H",
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})