// THE TMDB API

const API_Key ='api_key=f47509ea3205e216d523ac673aef5dea';
const BASE_URL ='https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' 
+API_Key;
const IMG_URL ='https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const searchURL= BASE_URL + '/search/movie?'+ API_Key;


getMovies(API_URL);
function getMovies(url){
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data.results);
        showMovies(data.results)
    })
}

function showMovies(data){
    main.innerHTML = ''
    data.forEach(movie => {
    const{title,poster_path,vote_average,overview}= movie;
    const movieDiv =document.createElement('div')
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>    
            `
            main.appendChild(movieDiv)
    });
} 

function getColor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchForm = search.value;
    if(searchForm){
        getMovies(searchURL+ '&query='+searchForm)
    }
    else{
        getMovies(API_URL)
    }
})
const title1 = document.getElementById('title1')
title1.addEventListener('mouseover',()=>{
title1.style.color='green'
})
title1.addEventListener('mouseout',()=>{
    title1.style.color='#22254b'
    })
    
