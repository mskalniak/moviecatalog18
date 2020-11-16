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
    // Model
    favouritesMovies = favouritesMovies.filter(function(elem) {
        return elem.id !== Number(event.target.id);
    });

    // UI
    countFavouritesMovies();
    updateFavouritesListUI();
}

// function onEditBtnClicked(event) {
//     console.log(event.target.id);
// }

function countFavouritesMovies() {
    const counterElem = document.getElementById('favouritesCount');
    counterElem.innerText = favouritesMovies.length;
}

function updateFavouritesListUI() {
    const favouritesListContainer = document.getElementById('favouritesListContainer');
    favouritesListContainer.innerText = '';

    favouritesMovies.forEach(function(movie) {
        const container = document.createElement('div');
        container.id = `container-${movie.id}`; //TO-DO: change in other places

        // paragraph
        const paragraph = document.createElement('p');
        paragraph.innerText = movie.name;

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Usuń';
        deleteBtn.id = `deleteBtn-${movie.id}`; //TO-DO: change in other places
        deleteBtn.addEventListener('click', onDeleteBtnClicked);

        // edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edytuj';
        editBtn.id = movie.id; //TO-DO: change to editBtn-<id>
        editBtn.addEventListener('click', function() {
            console.log('id: ', movie.id);
        });

        container.appendChild(paragraph);
        container.appendChild(deleteBtn);
        container.appendChild(editBtn);

        favouritesListContainer.appendChild(container);
    });
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

        // const btn = document.createElement('button');
        // btn.innerText = "Dodaj do ulubionych";
        // btn.addEventListener('click', function() {
        //     console.log('found movie::: ', foundMovie);
        // });
        // foundMovieContainer.appendChild(btn);
    });
}

function onAddToFavourites() {
    let movie = {
        name: foundMovie.title,
        id: lastId
    };
    favouritesMovies.push(movie);
    lastId++;

    // UI
    countFavouritesMovies();
    updateFavouritesListUI();
}