//Dynamic current Time
console.log('HELLO')
function mainTime(){
    setInterval( function() {
        let localTime = new Date();
       document.querySelector('span[data-time=hours]').textContent = localTime.getHours().toString().padStart(2,'0');
       document.querySelector('span[data-time=minutes]').textContent =':'+localTime.getMinutes().toString().padStart(2,'0');
       document.querySelector('span[data-time=seconds]').textContent = ':'+localTime.getSeconds().toString().padStart(2,'0');
   }, 1000);
}



//Fetch JSON API and display results weather with geolocation navigator
function mainWeather(){
    const openWeatherAPIKey = '114e38c5d36a5c2fbabb19d5ba680af1'
    const currentTempLocation = document.querySelector('.current-temp')
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position)
       let latitude = position.coords.latitude
       let longitude = position.coords.longitude
       let urlWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIKey}&units=metric`
       console.log(urlWeatherAPI)
 
       fetch(urlWeatherAPI).then(function(response) {
         return response.json();
       }).then(function(data) {
         let temperatureC = data.main.temp
         let weather = data.weather[0].description
           
         console.log(data);
         var country = data.name
         var textheadC = `The weather is ${weather} in ${country} and it's ${temperatureC}°C`
         currentTempLocation.textContent = textheadC
         console.log(textheadC)
       })
    })}

mainTime()
mainWeather()