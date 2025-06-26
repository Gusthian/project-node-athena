const request = require('request')

const forecast = (latitude,longitude, callback) => { 
    
    // Temperature in Celsius (&units=m)
    const url = 'http://api.weatherstack.com/current?access_key=a5b8fb151de68ec2add6b8787c2bc4f4&query=' + latitude + ',' + longitude + '&units=m'
      console.log(url)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. ' + 'It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast