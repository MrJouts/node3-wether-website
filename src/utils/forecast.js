const request = require('request')

const forecast = (lt, lg, callback) => {
    const url =`http://api.weatherstack.com/current?access_key=a2736c911ca1a0db0163284f6f12678e&query=${lt},${lg}`
    
    request({ url, json: true}, (error, response, body) => {

        debugger;
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback(body.error.info)
        } else {
            ({ temperature, precip } = body.current)
            callback(undefined, `Temperature: ${temperature}° | Precipitation chance: ${precip}%`)
        }
    })
    
}

module.exports = forecast