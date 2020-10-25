const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/weather_api.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

const public_dir = path.join(__dirname, '../public')
const views_dir = path.join(__dirname, '../template/views')
const partial_dir = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', views_dir)
hbs.registerPartials(partial_dir)

app.use(express.static(public_dir))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title : 'Weather',
        name : 'Aditya'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Aditya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        name : 'Aditya'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'No address provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude} = {}) => {
        if(error){
            return res.send({
                error : error
            })
        }
        forecast(latitude, longtitude, (error, data) => {
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                temperature : data
            })
            
        }) 
        
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'Provid a search term'
        })
    }

    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('Error404', {
        title : 'Error 404',
        msg : 'Help article not found',
        name : 'Aditya'
    })
})

app.get('*', (req, res) => {
    res.render('Error404', {
        title : 'Error 404',
        msg : 'Page not found',
        name : 'Aditya'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
}) 