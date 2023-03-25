const path = require('path')
const express = require('express')
const hbs = require('hbs');

const geocode = require('../../web-client/utils/geocode')
const weather = require('../../web-client/utils/weather')

const port = process.env.PORT || 3000

// Path to Static files
const public_dir_path = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../templates/views')
const partial_path = path.join(__dirname, '../templates/partials')

// Creating our express application
const app = express()

// Setting Template Engine - hbs
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partial_path)

// Setting directory path to be used for static files
app.use(express.static(public_dir_path))

// Route '/'
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suyash'
    })
})

// Route '/about'

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Suyash'
    })
})

// Route '/help'

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Suyash'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please enter the location you want to check the weather for!'
        })
    }

    const address = req.query.address
    
    geocode(address, (error, { latitude, longitude, name } = {}) => {
        
        if (error){
            return res.send({
                error
            })
        }
        
        weather({latitude, longitude}, (error, {condition, temp} = {}) => {
            
            if (error){
                return res.send({
                    error
                })
            }
            
            res.send({
                temp,
                name,
                condition,
            })
        })

    }) 
})

// Adding 404 Pages, using Express Wildcard character * to match any thing other than our specified routes
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Uh huh! Nothing lives at this address.',
        msg :'This is not the page you are looking for!Check out our help page',
        name: 'Suyash'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Uh huh! Nothing lives at this address.',
        msg :'This is not the page you are looking for!Check out the weather today for a location',
        name: 'Suyash'
    })
})

app.listen(port, () => {
    console.log('SERVER RUNNING ON PORT 3000')
})