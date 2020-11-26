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
const movies = [];

const toggleBackdropShadow = () => {
  backDrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
  addMovieModalElement.classList.toggle('visible');
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

const backDropClickHandler = () => {
  toggleMovieModal();
  clearMovieInput();
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
    title: titleValue,
    image: imgUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);

  console.log(movies);
  clearMovieInput();
  toggleMovieModal();
  updateUI();
  renderNewMovieElement(newMovie.title,newMovie.image,newMovie.rating);
};
const cancelAddMovieHandler = () => {
  toggleMovieModal();
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

const renderNewMovieElement = (title, imgURL, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class ="movie-element__image">
<img src="${imgURL}"" alt="${title}" >
   </div>

   <div class ="movie-element__info">
   <h2>${title}</h2>
   <p> ${rating} / 5 Stars </p>
   </div>
   `;
  const listRoot = document.getElementById('movie-list');
  // Append style not working on internet Explorer browser
  listRoot.append(newMovieElement);
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
backDrop.addEventListener('click', backDropClickHandler);
cancelAddMovielButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
