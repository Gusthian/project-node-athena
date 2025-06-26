const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+encodeURIComponent(address)+'&access_token=pk.eyJ1IjoibWFyY2lhdHphbm5pcyIsImEiOiJjbWJ6YW16aXkwaDdmMmxwenFvZTY3ejJsIn0.6PokHKm9w40j6J2HttjjUw&limit=1'
     request ({url:url, json:true},(error, response)=>{
      if(error){
          callback('Não foi possivel conectar ao serviço', undefined)
      } else if (response.body.features.length ===0){
          callback('Não foi possivel encontrar a localização', undefined)
      } else {
  
          callback(undefined, { 
              latitude: response.body.features[0].geometry.coordinates[1],
              longitude: response.body.features[0].geometry.coordinates[0],
              location: response.body.features[0].properties.full_address
          })
      }
        
     })
  
  }

  module.exports = geocode