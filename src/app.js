const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')


//to store our express app(server)
const app = express()

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlers engine and views location and it
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))



app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: 'Dhurba Baral'
   })
})
app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      name: 'Dhurba Baral'
   })
})
app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      name: 'Dhurba Baral',
      message: 'How can we help you?'
   })
})
app.get('/weather', (req, res) => {   //tells what the server should do when someone tries to get into specific url
   if (!req.query.address) {
      res.send({
         error1: 'You must provide an address.'
      })
   }
   geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
      if (error) {
         //return console.log(error)
         return res.send({
            error
         })
      }
      forecast(longitude, lattitude, (error, forecastData) => {
         if (error) {
            //return console.log(error)
            res.send({
               error
            })
         }
         //console.log(forecastData)
         res.send({
            address: req.query.address,
            forecast: forecastData,
            location
         })
      })
      //console.log(location)
   })
})
app.get('/help/*', (req, res) => {
   res.render('404', {
      msg: 'Help article not found'
   })
})

app.get('*', (req, res) => {
   res.render('404', {
      msg: 'My 404 page'
   })
})
app.listen(3000, () => {         //to start the port
   console.log('The server is started in port 3000!')
})
