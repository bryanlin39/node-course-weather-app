const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bryan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bryan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bryan',
        helpMessage: 'This is the help message.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please enter a valid location.'
        });
    }

    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                location,
                forecast: forecastData,
                search: req.query.search
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bryan',
        error: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bryan',
        error: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});