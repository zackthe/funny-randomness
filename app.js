
/** SELECT ELEMENTS **/

let cards = document.querySelectorAll('.card');

let button_exit = document.querySelector('.button-exit');

let popup = document.querySelector('.modal-content');

const movies_Url = 'https://api.themoviedb.org/3/discover/movie?api_key=0783627364b2c6c1dd8c6be9ab623097&vote_average.gte=';

const tvshows_Url = 'https://api.themoviedb.org/3/discover/tv?api_key=0783627364b2c6c1dd8c6be9ab623097&vote_average.gte=';

const API_key = '0783627364b2c6c1dd8c6be9ab623097';

const movies_img_url = 'https://image.tmdb.org/t/p/w500/';

const anime_api = 'https://api.jikan.moe/v3/top/anime';

const quote_api = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';

let generate_btn = document.querySelector('.generate-btn');

let previous_btn = document.querySelector('.previous-btn');

let movies_array = [];

let animes_array = [];

let quotes_array = [];

let tvshows_array = [];

/*** FUNCTIONS ***/

// display popup:

cards.forEach(item=>{
    
    item.addEventListener('click',(event)=>{
    document.querySelector('.bg-modal').style.display = 'flex';
    console.log(event.target);
    Changecard_title(event.target);
    selectcard(item);   
    console.log(item);
})
    
})


button_exit.addEventListener('click',(e)=>{
    
    document.querySelector('.bg-modal').style.display = 'none';
    e.target.parentElement.nextElementSibling.style.display = 'none';

})



/************* add card title to the popup : *********/

function Changecard_title(item){

    let title = document.querySelector('.modal-title');
    
    console.log(title);
    
   item.childNodes.forEach(child=>{
        if(child.nodeName == 'H2'){
        
            title.textContent = child.innerHTML;
            
        }
    });
        
}



/*************** display unique card **********/

// make card objects in an array with attributes(title,body);

function selectcard(card){
    
    let btn_generate = document.querySelector('.generate-btn');
    let btn_previous = document.querySelector('.previous-btn');

    btn_generate.setAttribute('id',card.id+'-btn-generate');
    btn_previous.setAttribute('id',card.id+'-btn-previous');
  
}


function save(item,type){
    localStorage.setItem(type,JSON.stringify(item));    
}

    

/***** display movies *******/

function displaymovie(result){
    
    let random = Math.floor(Math.random() * 20);
    let content_section = document.querySelector('.content-wraper');
    
    
    let content =`<div class="content">
            <img class='content-img'src="${movies_img_url + result.poster_path}" alt="">
            
            <div class="description">
                <h3 class="title">${result.title}</h3>
                <p class="overview">${result.overview}</p>
                <p class="release_date"><span class='bold'>Release date: </span> : ${result.release_date}</p>
                <p class="rating"><span class='bold'>Rating:</span> ${result.vote_average}<img class='star' src="img/star.svg" alt=""></p>
                
            </div>
         </div>`;
    
    content_section.style.display ='block';

    content_section.innerHTML = content;
    
}

// display animes :

function displayanime(anime){
    
    let random = Math.floor(Math.random() * 20);
    let content_section = document.querySelector('.content-wraper');
    
    
    let content =`<div class="content">
            <img class='content-img'src="${anime.image_url}" alt="">
            
            <div class="description">
                <h3 class="title">${anime.title}</h3>
                <p class="overview"><span class='bold'>episodes: </span> ${anime.episodes}</p>
                <p class="release_date"><span class='bold'>release_date: </span> : ${anime.start_date}</p>
                <p class="rating"><span class='bold'>Rating: </span> ${anime.score}<img class='star' src="img/star.svg" alt=""></p>
                
            </div>
         </div>`;
    
    content_section.style.display ='block';

    content_section.innerHTML = content;
    
}

// display quotes :

function displayquotes(quote){
    let content_section = document.querySelector('.content-wraper');
    
    let content =`<div class="content">     

            <div class="description">
                <h3 class="title">title : ${quote.text}</h3>
                <p class="overview"><span class='bold'>auhor: </span> ${quote.author}</p>
                <p class="release_date"><span class='bold'>tag: </span> : ${quote.tag}</p>                
            </div>
         </div>`;
    
    content_section.style.display ='block';

    content_section.innerHTML = content;
}

// display tvshows :

function displaytvshows(tvshow){

    let random = Math.floor(Math.random() * 20);
    let content_section = document.querySelector('.content-wraper');
    
    
    let content =`<div class="content">
            <img class='content-img'src="${movies_img_url + tvshow.poster_path}" alt="">
            
            <div class="description">
                <h3 class="title">${tvshow.name}</h3>
                <p class="overview">${tvshow.overview}</p>
                <p class="release_date"><span class='bold'>release_date: </span> : ${tvshow.first_air_date}</p>
                <p class="rating"><span class='bold'>Rating: </span>${tvshow.vote_average}<img class='star' src="img/star.svg" alt=""></p>
                
            </div>
         </div>`;
    
    content_section.style.display ='block';

    content_section.innerHTML = content;

}


/*************************** A P Is  ***********************/

/**** The Movies API ****/


//======== previous btn ========//

previous_btn.addEventListener('click',()=>{
 

    if(previous_btn.id == 'movies-card-btn-previous'){

        console.log('im length :'+ movies_length);
        
        if(movies){
            
            movies_length--;

            console.log('second one :'+movies_length);
            
            displaymovie(movies_array[movies_length].movie);
            
            console.log(movies_array[movies_length].movie.title);
        
            }

    }

    if(previous_btn.id == 'animes-card-btn-previous'){
        animes_length--;
        console.log('second one :'+animes_length);
        displayanime(animes_array[animes_length].anime);
    }

    if(previous_btn.id == 'quotes-card-btn-previous'){

        quotes_length--;
        console.log('second one :'+quotes_length);
        displayquotes(quotes_array[quotes_length].quote)

    }
    if(previous_btn.id == 'tvshows-card-btn-previous'){
        tvshows_length--;
        console.log('second one :'+tvshows_length);

        displaytvshows(tvshows_array[tvshows_length].tvshows);
    }
    
         })



//======== generate btn ========//


generate_btn.addEventListener('click',(e)=>{
    
    e.preventDefault;

//=========== animes ========//

    if(generate_btn.id == 'animes-card-btn-generate'){

    animes = JSON.parse(localStorage.getItem('animes'));

    if(animes){
        animes_length = animes.length;
        console.log('im animes length'+ animes_length);
    }
        
    let randomrange = Math.floor(Math.random() * (50 - 1) + 1); 
    let randomrange2 = Math.floor(Math.random() * (500 - 0) + 0); 
    
    fetch(anime_api)
    .then((res) => res.json())
    .then((data) => {
        
        let anime = data.top[randomrange];
        console.log(anime);
        displayanime(anime);  
        
        animes_array.push({
            anime : data.top[randomrange]
        })
            
        save(animes_array,'animes');
        
    })
    .catch((error)=>{
        console.log(error)
    })


    }

 //======= movies ========//   
    
    if(generate_btn.id == 'movies-card-btn-generate'){

    movies = JSON.parse(localStorage.getItem('movies'));

    if(movies){
            movies_length = movies.length;
            console.log("hello im length in generateinside :"+movies_length);
        }
        
    let randomrating = Math.floor(Math.random() * (10 - 1) + 1); 
    let randompage = Math.floor(Math.random() * (500 - 0) + 0); 
    let random_movie = Math.floor(Math.random() * 20);
        
        
    fetch(movies_Url + randomrating +'&page='+randompage)
    .then((res) => res.json())
    .then((data) => {

        if(data.results[random_movie].poster_path){
            
            console.log(data.results[random_movie]);
            displaymovie(data.results[random_movie]);
            
            movies_array.push({
                movie : data.results[random_movie]
            })
                
            save(movies_array,'movies');
        }
        

    })
    .catch((error)=>{
        console.log(error)
    })
    }

//=========== tvshows ===========//

    if(generate_btn.id == 'tvshows-card-btn-generate'){

        tvshows = JSON.parse(localStorage.getItem('tvshows'));
    
        if(tvshows){
                tvshows_length = tvshows.length;
                console.log("hello im length in generateinside :"+tvshows_length);
            }
            
        let randomrating = Math.floor(Math.random() * (10 - 7) + 7); 
        let randompage = Math.floor(Math.random() * (100 - 0) + 0); 
        let random_movie = Math.floor(Math.random() * 20);
            
            
        fetch(tvshows_Url + randomrating +'&page='+randompage)
        .then((res) => res.json())
        .then((data) => {
    
            if(data.results[random_movie].poster_path){
                
                console.log(data.results[random_movie]);
                displaytvshows(data.results[random_movie]);
                
                tvshows_array.push({
                    tvshows : data.results[random_movie]
                })
                    
                save(tvshows_array,'tvshows');
            }
            
    
        })
        .catch((error)=>{
            console.log(error)
        })
        }


//=========== quotes ==========//        

    if(generate_btn.id == 'quotes-card-btn-generate'){

   quotes = JSON.parse(localStorage.getItem('quote'));

    if(quotes){
        quotes_length = quotes.length;
        console.log('im quotes length'+ quotes_length);
    }
    
    
    fetch(quote_api)
        .then((res)=> res.json())
        .then((data) =>{
            console.log(data.quotes[0]);
            displayquotes(data.quotes[0]);

            quotes_array.push({
                quote : data.quotes[0]
            })

            save(quotes_array,'quote');

        })
        .catch((error)=>{
            console.log(error)
        })
    }

})




