const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWRpOTcwNiIsImEiOiJja2didHdhcjIwMnB0MnhvN2diYXJlNWJpIn0.n3X7Hwzdx41fc_Vf_ZTXhA&limit=1"
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to the internet")
        }
        else if(body.message){
            callback("Unable to find location, try another search")
        }   
        else if(body.features.length === 0){
            callback("Unable to find location")
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode