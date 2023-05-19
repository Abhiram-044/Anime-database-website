const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const API_URL =  'https://anime-db.p.rapidapi.com/anime?page=1&size=30';

async function GetAnimes() {
    const url = API_URL;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'b989bf5d26mshc486dca584642e7p115bafjsn41be2d042818',
		    'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
	    return result;
    } catch (error) {
	    console.error(error);
    }
}



function showAnimes(data) {
    console.log(data);
    main.innerHTML = '';

    data.forEach(anime => {
        const {title, image, episodes, synopsis} = anime;
        const animeEl = document.createElement('div');
        animeEl.classList.add('anime');
        animeEl.innerHTML = `
            <img src="${image}" alt="${title}">
            
            <div class="anime-info">
                <h3>${title}</h3>
                <span>Eps: ${episodes}</span>
            </div>
        
            <div class="overview">
                ${synopsis}
            </div>           
        `
        
        main.appendChild(animeEl);
    });
}

GetAnimes().then(animes => {showAnimes(animes.data)});

form.addEventListener('submit', (e) => {e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        searchAnime(searchTerm).then(animes => {showAnimes(animes.data)});
    }else{
        GetAnimes().then(animes => {showAnimes(animes.data)});
    }
})

async function searchAnime(searchTerm) { 
    const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + searchTerm;
    const options = {
	    method: 'GET',
    	headers: {
	    	'X-RapidAPI-Key': 'b989bf5d26mshc486dca584642e7p115bafjsn41be2d042818',
		    'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    	}
    };

    try {
	    const response = await fetch(url, options);
    	const result = await response.json();
	    return result;
    } catch (error) {
	    console.error(error);
    }
}