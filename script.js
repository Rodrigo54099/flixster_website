//Global Constants
const api_key = "api_key=4a2ed3b5cb8fd78e1e35c5c623272ce8"
const url_base = "https://api.themoviedb.org/3"
const img_url = 'https://image.tmdb.org/t/p/w500';
const search_url = url_base + "/search/movie?" + api_key;

//Global variables
var search_term = "";
var current_page = 1;
var pages = 1;

const offset = current_page * pages; //total movies dispalyed
const api_url = url_base +"/discover/movie?sort_by=popularity.desc&" +api_key;

//Page Elements
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const showMeMoreBtn = document.getElementById("showbutton")
const cancel = document.getElementById("closeSearch")
const clear = document.getElementById("cancel");


getMovies(api_url)

 function getMovies(url){
    clear.style.display = "none";
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}



function showMovies(data){
   
    data.forEach(element => {
        const {title, poster_path, vote_average, overview} = element;
        const movieEl = document.createElement("div");

        movieEl.classList.add("movie")
        movieEl.innerHTML += `
        <div class = "movie">
                <img id = "picture" src="${img_url+poster_path}" alt="${title}">
            <div class ="movie-info">
                <div class="movie-titles">
                    <h4>${title}</h4>
                </div>   
                <div class="movie-rating">
                    ⭐️${vote_average}
                </div>
            </div>
        </div>
        `
        main.append(movieEl);
    })
}




async function handleFormSubmit(event) {
    main.innerHTML = '';
    event.preventDefault();
    search_term = search.value;

    if(search_term){
        getMovies(search_url+"&query="+search_term);
        clear.style.display = "block";
        current_page++;
    }
    else{
        getMovies(api_url);
    }
}
form.addEventListener('submit', handleFormSubmit);


async function handleCancelSearch(event) {
    main.innerHTML = '';
    event.preventDefault();
    getMovies(api_url);
    
}
cancel.addEventListener('click', handleCancelSearch);



async function handleShowMeMoreClick(event) {
    event.preventDefault();

    if(search_term){
        current_page++;
        getMovies(search_url+"&query="+search_term+"&page="+ current_page);
        
        if(search_term){
            clear.style.display = "block";
        }
        else{
            clear.style.display = "block";
        }
    }
    else{
        current_page++;
        getMovies(api_url+"&page="+ current_page);
    }
}
showMeMoreBtn.addEventListener('click', handleShowMeMoreClick);

