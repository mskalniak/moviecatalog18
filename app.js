const addBtnElem = document.querySelector('#addBtn');
let favouritesMovies = [];
let lastId = 0;

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

        // paragraph
        const paragraph = document.createElement('p');
        paragraph.innerText = movie.name;

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Usuń';
        deleteBtn.id = movie.id;
        deleteBtn.addEventListener('click', onDeleteBtnClicked);

        // edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edytuj';
        editBtn.id = movie.id;
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