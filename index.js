const express = require('express');
const path = require('path')
const newsFilter = require('./public/scripts')
const forecast = require('./public/forecast')
const geocode = require('./public/geocode');
const newsTop = require('./public/scripts');

const app = express();

const anoAtual = new Date().getFullYear();


const port = parseInt(process.env.PORT) || process.argv[3] || 9191;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index',{anoAtual:anoAtual});
});

// News API 
app.get('/api-news', (req, res) => {
  if(!req.query.search){
    return res.send({error: "Precisa adicionar uma pesquisa"});
  }
  newsFilter(req.query.search, (error, data)=>{
    if(error){
     res.json({"error": error});
    }else{
      res.json(data);
    }
  })
});

// News API Top headlines country US 
app.get('/api-news-top',(req, res)=>{
   newsTop(undefined, (error, data)=>{
    if(error){
     res.json({"error": error});
    }else{
      res.json(data);
    }
  })
    
})

// Weather API 
app.get('/weather',(req,res)=>{

  if(!req.query.adress){
     return res.send({error:'Precisa adicionar uma cidade'})
  }
                
  geocode(req.query.adress, (error,{latitude, longitude, location} ={})=>{
       if(error){
        return res.send({error})
       }
      forecast(latitude, longitude,(error,forecastData)=>{
          if(error){
            return res.send({error})
          }
          res.send({
            forecast: forecastData,
            location,
            adress: req.query.adress.split('?')[0]
          })
      })
      
  })
  
})

app.get('/news-total', (req,res)=>{
    res.render('newsTotal',{anoAtual:anoAtual})
  
})

app.get('/*',(req,res)=>{
  res.render('404',{anoAtual:anoAtual})
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})