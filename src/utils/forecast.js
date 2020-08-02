const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'https://api.darksky.net/forecast/179ba216cf5037841688841c82e34fad/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({url,json:true},(error,{body})=>{
        if (error){
            callback("Unable to connect to weather services!",undefined)
        }
        else if (body.error){
            callback("Unable to connect to weather services!",undefined)
        }
        else{
            callback(undefined,{
                temp:body.currently.temperature,
                rain:body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast