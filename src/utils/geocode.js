const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FyYW5wYXRlbDE5OTMiLCJhIjoiY2s4YmhwZnZhMDZndTNlbzdlY2UwbGViaSJ9.v-kbBl_dnHqBKhW4YcTxuA&limit=1'
    request({url,json:true},(error,{body})=>{
        if (error){
            callback("Unable to connect to location services!",undefined)
        }
        else if (body.features.length === 0){
            callback("Could not find location",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode