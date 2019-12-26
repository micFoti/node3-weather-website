const request = require('request')


const forecast= (longitude, latitude, callback) =>{

  const url = 'https://api.darksky.net/forecast/c538963920eec6ed568f59ddda733955/' + longitude + ','+ latitude + '?lang=it'

   request({url, json: true},(error, {body}= {})=>{
    if (error){
         callback("unable to connect", "")
       } else if (body.error){
          callback("unable to find location", "")
        } else {
         callback("",body.daily.data[0].summary + "It is currently " + body.currently.temperature   + " degree out. There is a " + body.currently.precipProbability  + "% chance of rain.")
           }
   })
}


module.exports= forecast



