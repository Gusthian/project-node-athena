console.log('HELLOW 2')

const currentUrl = window.location.href; 
const urlWebParam = new URL(currentUrl);

const params = new URLSearchParams(urlWebParam.search);
const searchTerm = params.get('search').split('?')[0];
console.log(searchTerm)
const title = document.querySelector('#title')
const resultMsg = document.querySelector('#result-news-h3')
const resultTotalmsg = document.querySelector('#total-result-news')
const description = document.querySelector('#description')
const url = document.querySelector('#url')
 const sectionResult = document.querySelector('.news-result')

fetch('/api-news?search='+searchTerm).then((response)=>{
 //description.textContent='',
 //resultMsg.textContent='',

 response.json().then((data)=>{
     if(data.error){
     console.log(data.error)
     }
     else{
         
         resultMsg.textContent=`Mostrando todos os resultados para: ${searchTerm}`
         
         
        const sectionMain = document.querySelector('.news-result')
        sectionMain.textContent=''
        data.forEach((item,index)=>{
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