const request = require('request');

const geocode = (address, callback) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGh1cmJhYmFyYWwiLCJhIjoiY2s4Y2k1dnRuMGx6MTNsb2EyZ2QyeXdjbSJ9.2WffxaWYvODGfghwb2BKYw&limit=1'
   request({ url, json: true }, (error, response) => {
      console.log(response.body.features)
      if (error) {
         callback('Unable to connect to the weather service!', undefined)
      } else if (response.body.features.length === 0) {
         callback('Unable to find location!', undefined)
      } else {
         callback(undefined, {
            lattitude: response.features[0].center[1],
            longitude: response.features[0].center[0],
            location: response.features[0].place_name
         })
      }
   })
}

module.exports = geocode
