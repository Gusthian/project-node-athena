const request = require('request')

//API for general news
const newsFilter = (keyfilter,callback)=>{
// API Key to https://newsapi.org/
const apiKey = 'a2fb8b493bb347ff98d715a7264071d7'
//Create current date
const year = new Date().getFullYear().toString()
const month = new Date().getMonth().toString().padStart(2,'0')
const day = new Date().getDate().toString()
const currentDate = year+'-'+month+'-'+day

const url = 'https://newsapi.org/v2/everything?q='+encodeURIComponent(keyfilter)+'&from='+currentDate+'&sortBy=publishedAt&apiKey='+apiKey

    request({url:url, json:true,headers:{'User-Agent':'request'}}, (error, response)=>{
        if (error){
            callback('Não foi possivel conectar ao serviço', undefined)
        } else if(response.body.totalResults == 0){
          callback('Não foram encontrados resultados para esta pesquisa', undefined)
        }
          else{
            callback(undefined, response.body.articles.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: article.publishedAt
                })))
        }
     
    })

}
//News API Top headlines country US 
const newsTop =(keycountry,callback)=>{
    
const urlNewsTop = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=14706d0f09ea4d8aa586e10081042bbc'
  request({url:urlNewsTop, json:true,headers:{'User-Agent':'request'}}, (error, response)=>{
  if(error){
    callback('Não foi possivel conectar ao serviço', undefined)
  } else if(response.body.articles.length == 0){
    callback('Não foram encontrados resultados para esta pesquisa', undefined)
  }
  else{
    callback(undefined, response.body.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt
  })))
}
})
}

module.exports = newsFilter



