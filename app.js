const addBtnElem = document.querySelector('#addBtn');
let favouritesMovies = [];
let lastId = 0;
let foundMovie = null;

const adverts = [
    'Nowy film: Zielona Mila, w kinach od 22 września!',
    'Zapraszamy do kin już od 23 czerwca!',
    'Festiwal filmowy już od poniedziałku w kinie Burleska!',
    'Filmowy wieczór z kinem Adriatyk już dziś!',
    'Brakujące ogniwo to nowy film Scorsese, nie możesz go przegapić!'
];

changeAdverts();
countFavouritesMovies();

function onAddBtnClicked() {
    const movieNameElem = document.getElementById('movieNameElem');
    
    // Model
    let movie = {
        name: movieNameElem.value,
        id: lastId
    };
    favouritesMovies.push(movie);
    lastId++;

    // UI
    countFavouritesMovies();
    updateFavouritesListUI();
}

function onDeleteBtnClicked(event) {
    let id = Number(event.target.id.split('-')[1]);

    // Model
    favouritesMovies = favouritesMovies.filter(function(elem) {
        return elem.id !== id;
    });

    // UI
    countFavouritesMovies();
    updateFavouritesListUI();
}

function countFavouritesMovies() {
    const counterElem = document.getElementById('favouritesCount');
    counterElem.innerText = favouritesMovies.length;
}

function updateFavouritesListUI() {
    const favouritesListContainer = document.getElementById('favouritesListContainer');
    favouritesListContainer.innerText = '';

    favouritesMovies.forEach(function(movie) {
        const container = document.createElement('div');
        container.id = `container-${movie.id}`;

        // paragraph
        const paragraph = document.createElement('p');
        paragraph.innerText = movie.name;

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Usuń';
        deleteBtn.id = `deleteBtn-${movie.id}`;
        deleteBtn.addEventListener('click', onDeleteBtnClicked);

        // edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edytuj';
        editBtn.id = `editBtn-${movie.id}`; 
        editBtn.addEventListener('click', function() {
            onEditButtonClicked(movie);
        });

        //poster image
        let posterContainer;
        if (movie.poster) {
            posterContainer = document.createElement('div');
            posterContainer.innerHTML = `<img class="movieInfoPoster-${movie.id}" src="${movie.poster}" />`;
        }

        // search in db button
        const searchInDbBtn = document.createElement('button');
        searchInDbBtn.innerText = 'Wyszukaj w bazie';
        searchInDbBtn.id = `searchInDbBtn-${movie.id}`; 
        searchInDbBtn.addEventListener('click', function() {
            axios.get(`http://www.omdbapi.com/?apikey=7015f6d&t=${movie.name}`).then(function(movieResponse) {
                console.log('movie resp: ', movieResponse);
                console.log('movie resp title: ', movieResponse.data.Title);
        
                const poster = movieResponse.data.Poster;
                movie.poster = poster;

                updateFavouritesListUI();
            });
        });
        

        container.appendChild(paragraph);
        movie.poster && container.appendChild(posterContainer);
        container.appendChild(deleteBtn);
        container.appendChild(editBtn);
        container.appendChild(searchInDbBtn);

        favouritesListContainer.appendChild(container);
    });
}

function onEditButtonClicked(movie) {
    let containerId = `container-${movie.id}`;
    let container = document.getElementById(containerId);

    container.innerHTML = `
        <input id="editedInput-${movie.id}" value="${movie.name}"></input>
        <button onclick="onSaveButtonClicked(${movie.id})">Zapisz</button>
    `;
}

function onSaveButtonClicked(id) {
    let movie = favouritesMovies.find(elem => elem.id === id);
    let inputElem = document.getElementById(`editedInput-${id}`);
    movie.name = inputElem.value;

    updateFavouritesListUI();
}

function changeAdverts() {
    let advertsContainer = document.getElementById('advertsContainer');
    advertsContainer.innerText = adverts[0];

    setInterval(function() {
        let randomIndex = Math.floor(Math.random() * adverts.length);
        advertsContainer.innerText = adverts[randomIndex]; //0,1,2,3,4
    }, 2000);
}

function onSearchBtnClicked() {
    const searchMovieNameElem = document.getElementById('searchMovieNameElem');

    axios.get(`http://www.omdbapi.com/?apikey=7015f6d&t=${searchMovieNameElem.value}`).then(function(movieResponse) {
        console.log('movie resp: ', movieResponse);
        console.log('movie resp title: ', movieResponse.data.Title);

        foundMovie = {
            title: movieResponse.data.Title,
            poster: movieResponse.data.Poster,
            year: movieResponse.data.Year
        }

        const foundMovieContainer = document.getElementById('foundMovieContainer');
        foundMovieContainer.innerHTML = `
            <div class="movieInfo">Tytuł filmu: ${foundMovie.title}</div>
            <div class="movieInfo">Rok produkcji: ${foundMovie.year}</div>
            <div><img class="movieInfoPoster" src="${foundMovie.poster}" /></div>
            <button onclick="onAddToFavourites()">Dodaj do ulubionych</button>
        `;
    });
}

function onAddToFavourites() {
    let movie = {
        name: foundMovie.title,
        id: lastId,
        poster: foundMovie.poster
    };
    favouritesMovies.push(movie);
    lastId++;

    // UI
    countFavouritesMovies();
    updateFavouritesListUI();
}