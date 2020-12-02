const startAddMovieButton = document.querySelector(' header button');
const addMovieModalElement = document.getElementById('add-modal');
const backDrop = document.getElementById('backdrop');
// const canceAddMovielButton = document.querySelector('.btn--passive');
const cancelAddMovielButton = addMovieModalElement.querySelector(
  '.btn--passive',
);
// Add button
const confirmAddMovieButton = cancelAddMovielButton.nextElementSibling;
// const confirmAddMovieButton = addMovieModalElement.querySelector('.btn--success');
const userInputElements = addMovieModalElement.querySelectorAll('input');
const defaultUIMovieText = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdropShadow = () => {
  backDrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  addMovieModalElement.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModalElement.classList.add('visible');
  toggleBackdropShadow();
};

const clearMovieInput = () => {
  // userInputElements[0].value = '';
  // userInputElements[1].value = '';
  // userInputElements[2].value = '';

  for (const userinput of userInputElements) {
    userinput.value = '';
  }
};

// Related to the movie delete section
const closeMovieDeletionModal = () => {
  toggleBackdropShadow();
  deleteMovieModal.classList.remove('visible');
};

const backDropClickHandler = () => {
  closeMovieModal();
  clearMovieInput();
  closeMovieDeletionModal();
};

const addMovieHandler = () => {
  const titleValue = userInputElements[0].value;
  const imgUrlValue = userInputElements[1].value;
  const ratingValue = userInputElements[2].value;

  if (
    titleValue.trim() === '' ||
    imgUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert('Please enter valid values ( rating between 1 and 5');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imgUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);

  console.log(movies);
  clearMovieInput();
  closeMovieModal();
  toggleBackdropShadow();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating,
  );
};
const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdropShadow();
  clearMovieInput();
};

// UI section

const updateUI = () => {
  if (movies.length === 0) {
    defaultUIMovieText.style.display = 'block';
  } else {
    defaultUIMovieText.style.display = 'none';
  }
};
const listRoot = document.getElementById('movie-list');
const renderNewMovieElement = (id, title, imgURL, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class ="movie-element__image">
<img src="${imgURL}" alt="${title}" >
   </div>

   <div class ="movie-element__info">
   <h2>${title}</h2>
   <p> ${rating} / 5 Stars </p>
   <img src="http://pluspng.com/img-png/trash-can-png-image-trash-can-body-png-through-the-woods-wiki-fandom-powered-by-wikia-720.png" class ="deleteIcon" alt="delete movie">
   </div>
   `;

  // Delete movie section

  // Append style not working on internet Explorer browser
  const deleteMovieIcon = newMovieElement.querySelector('.deleteIcon');
  listRoot.append(newMovieElement);
  // console.log(listRoot.innerHTML);

  // console.log(listRoot.innerHTML);


  deleteMovieIcon.addEventListener(
    'click',
    deleteSelectedMovieHandler.bind(null, id),
  );
};
  const deleteMovie = (movieId) => {
    console.log('Delete this' + movieId);
    let MovieIndex = 0;
    for (movie of movies) {
      if (movie.id === movieId) {
        break;
      }
      MovieIndex++;
    }
    console.log(MovieIndex);
    movies.splice(MovieIndex, 1);

    const listRoot = document.getElementById('movie-list');
    listRoot.children[MovieIndex].remove();
    // listRoot.removeChild(listRoot.children[MovieIndex];
    console.log(movies.length);
    updateUI();
    closeMovieDeletionModal();
    
  };
const deleteSelectedMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdropShadow();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener('click', deleteMovie.bind(null,movieId));
  // deleteMovie(movieId);
};

startAddMovieButton.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backDropClickHandler);
cancelAddMovielButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
