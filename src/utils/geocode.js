const request = require('request')

const geocode = (address, callback) => {
    address = encodeURIComponent(address)
    const url = `http://api.positionstack.com/v1/forward?access_key=2ac00f280de23a0b3443dee23cd4390c&query=${address}&limit=1`
    
    request({ url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to geolocalization service!', undefined)
        } else if(body.error) {
            callback(body.error.message, undefined)
        } else {
            ({latitude, longitude, name} = body.data[0])
            address = decodeURIComponent(address)
            callback(undefined, { latitude, longitude, name})
        }
    })
    
}

module.exports = geocode