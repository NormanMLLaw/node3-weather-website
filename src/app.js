const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'New Weather Dynamic Page',
        name: 'Norman Law'
    }); // no need extention, need index.html
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'New Weather Dynamic About Page',
        name: 'Norman ML Law'
    }); // no need extention, need index.html
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'New Weather Dynamic Help Page',
        name: 'Norman5HK',
        helpText: 'Contents of page Help.'
    }); // no need extention, need index.html
});

//endpoint
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide the adress'
        });
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
    };
    
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({error});
        };

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide the search term'
        });
    };

    res.send({
        products: []
    });
});


app.get('/*/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Norman5HK',
        errorMessage: 'Article not found'
    }); // no need extention, need index.html
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Norman5HK',
        errorMessage: 'Page not found'
    }); // no need extention, need index.html
});

// app.com
// app.com/help
// app.com/about

// 3000 is the port number
app.listen(3000, () => {
    console.log('<h1>Server is up on port 3000.</h1>');
})