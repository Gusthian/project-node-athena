
const form = document.querySelector('form')
const input = document.querySelector('input')


//fetch JSON API news TOP
function newsTopHome(){
  fetch('/api-news?search=top').then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        console.log('Erro ao carregar news TOP')
      }
      else{
        const sectionMain = document.querySelector('.news-result')
           sectionMain.textContent=''
           const newsTopText = document.createElement('h3')
            newsTopText.textContent = 'Últimas noticias:'
             sectionMain.appendChild(newsTopText)
           data.slice(0, 3).forEach((item,index)=>{
            const articleItem = document.createElement('article'); 
            sectionMain.appendChild(articleItem); 
            
            
          
            const pTitle = document.createElement('p');
            pTitle.id = "title";
            pTitle.textContent = item.title;
            articleItem.appendChild(pTitle);
        
            const pDescription = document.createElement('p');
            pDescription.id='description';
            pDescription.textContent = item.description;
            articleItem.appendChild(pDescription);
        
            const img = document.createElement('img');
            img.src = item.urlToImage;
            img.alt=item.title
            articleItem.appendChild(img);
            
            const publishDate = document.createElement('p')
            publishDate.id='publish-date'
            const dataAtual = item.publishedAt.split('T')[0]
            const partesDaData = dataAtual.split('-'); 
            const dataFormatada = `Publicado em: ${partesDaData[2]}-${partesDaData[1]}-${partesDaData[0]}`;
            console.log(dataFormatada);
            publishDate.textContent = dataFormatada
            articleItem.appendChild(publishDate)
             
            const aButton = document.createElement('a');
            aButton.setAttribute('target','_blank');
            aButton.setAttribute('href',item.url);
        
            const button = document.createElement('button');
            button.id='button-read-more';
            button.textContent = 'Saiba mais';
            aButton.appendChild(button);
            articleItem.appendChild(aButton);
        
            console.log(item);
            
           })
      }
    })
  })


}


//Fetch JSON API and display results
form.addEventListener('submit', (e)=>{
   e.preventDefault()
   console.log('pesquisando...')
   const search = input.value
   const title = document.querySelector('#title')
   const resultMsg = document.querySelector('#result-news-p')
   const resultTotalmsg = document.querySelector('#total-result-news')
   
   const description = document.querySelector('#description')
   const url = document.querySelector('#url')
    const sectionResult = document.querySelector('.news-result')
    const linkToAllNews = document.querySelector('#link-all-news') 
    const linkAllNewsP = document.querySelector('#link-all-news-p')
   fetch('/api-news?search='+search).then((response)=>{
    //description.textContent='',
    //resultMsg.textContent='',
     
    response.json().then((data)=>{
        if(data.error){
        console.log(data.error)
         resultMsg.textContent = data.error
         resultTotalmsg.innerHTML='',
          linkToAllNews.remove()
         
       
        }
        else{
        resultMsg.innerHTML = `Mostrando resultados para: <strong>${search}</strong>`
        resultTotalmsg.innerHTML = `Total 10 de <strong>${data.length}</strong> resultados.`
        const mainSearchNews = document.querySelector('.search-new')
        let linkToAllNews = document.querySelector('#link-all-news');
        if (!linkToAllNews) {
        linkToAllNews = document.createElement('a')
        linkToAllNews.setAttribute('target','_blank')
        linkToAllNews.setAttribute('href',`/news-total?search=${search}`)
        linkToAllNews.textContent='Ver todas as notícias'
        linkToAllNews.setAttribute('id','link-all-news')
        mainSearchNews.appendChild(linkToAllNews)
        //linkToAllNews.innerHTML = `<a href="/news-total?search=${search}" id="link-news-total" target="_blank">Ver todas as notícias</a>`
        //
        } else {
            linkToAllNews.setAttribute('href',`/news-total?search=${search}`);
        }
           
           
           const sectionMain = document.querySelector('.news-result')
           sectionMain.textContent=''
           
           data.slice(0, 10).forEach((item,index)=>{
            const articleItem = document.createElement('article'); 
            sectionMain.appendChild(articleItem); 
          
            const pTitle = document.createElement('p');
            pTitle.id = "title";
            pTitle.textContent = item.title;
            articleItem.appendChild(pTitle);
        
            const pDescription = document.createElement('p');
            pDescription.id='description';
            pDescription.textContent = item.description;
            articleItem.appendChild(pDescription);
        
            const img = document.createElement('img');
            img.src = item.urlToImage;
            img.alt=item.title
            articleItem.appendChild(img);
            
            const publishDate = document.createElement('p')
            publishDate.id='publish-date'
            const dataAtual = item.publishedAt.split('T')[0]
            const partesDaData = dataAtual.split('-'); 
            const dataFormatada = `Publicado em: ${partesDaData[2]}-${partesDaData[1]}-${partesDaData[0]}`;
            console.log(dataFormatada);
            publishDate.textContent = dataFormatada
            articleItem.appendChild(publishDate)
             
            const aButton = document.createElement('a');
            aButton.setAttribute('target','_blank');
            aButton.setAttribute('href',item.url);
        
            const button = document.createElement('button');
            button.id='button-read-more';
            button.textContent = 'Saiba mais';
            aButton.appendChild(button);
            articleItem.appendChild(aButton);
        
            console.log(item.title);
            
           })
            //title.textContent = data.title,
            //description.textContent = data.description
            //url.textContent = data.url
            

            console.log(data)
        }
        
    })
   })
})

//Dynamic current Time
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

    //Fetch JSON API for search weather results
function weatherSearch(){
    const formWeather = document.querySelector('.search-weather')
    const inputWeather = document.querySelector('.search-weather input')
    
    formWeather.addEventListener('submit',(e)=>{
       
       e.preventDefault()
       console.log(input.value)
        const location = document.querySelector('#location')
        const forecast = document.querySelector('#forecast')
       fetch('/weather?adress='+inputWeather.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                location.textContent= data.error
                forecast.textContent=''
    
            }
            else{
                location.textContent = data.location
                forecast.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
          
        })
    })
    
    
    })
  }
  newsTopHome()
  weatherSearch()
    mainTime() 
    mainWeather()
