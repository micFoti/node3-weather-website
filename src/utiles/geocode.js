const request = require('request')
const data = {
  label: 'red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
  
  }

const geocode = (address, callback) =>{

  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibW9jZm90aSIsImEiOiJjazNxYnozY3MwMDNhM2RwYmRtbHRnN2ptIn0.m-w4qf8UJ0HuisKuBigEPw&limit=1"
 
  request({url, json:true}, (error, {body}= {}) => {
    
   if (error){
                callback("unable to connect", "")
             }  else if (body.features.length === 0){   
               callback("unable to find location, try another search","")
              } else {
                const data = {

                 location:body.features[0].place_name,
                latitudes:body.features[0].center[1],
                longitudes:body.features[0].center[0]

                   }
                 callback("", data)
             
              }
 })}


 module.exports= geocode

 