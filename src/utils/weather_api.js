const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = "https://api.weatherbit.io/v2.0/current?lat=" + lat + "&lon=" + lon + "&key=d3de3dcf30d94925bcf1fae1f2ececce"
    request({url, json : true},(error, {body}) => {
        if(error){
            callback("Unable to connect to internet")
        }else if(body.error){
            callback("Incorrect address")
        }
        else{
            callback(undefined, body.data[0].temp)
        }

    })

}

module.exports = forecast