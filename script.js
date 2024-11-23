document.addEventListener("DOMContentLoaded", function () {
  fetchmovies();

  // Attach debounced search function to the input field
  const searchInput = document.getElementById("searchInput");
  const debouncedSearch = debounce(searchMovies, 300);
  searchInput.addEventListener("input", debouncedSearch);
});

function fetchmovies() {
  const apiKey = "88cdb114";
  const MoviesGrid = document.getElementById("MoviesGrid");

  // Display loading message
  MoviesGrid.innerHTML = "<p>Loading movies...</p>";

  const randomSearchTerms = ["action", "comedy", "drama", "adventure"];
  const randomTerm =
    randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];

  // Fetch movie data from OMDB API with a random search term
  fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${randomTerm}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Search && data.Search.length > 0) {
        moviestoshow(data.Search);
      } else {
        MoviesGrid.innerHTML = "<p>No random movies found!</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching random movies:", error);
      MoviesGrid.innerHTML =
        "<p>Error fetching movies. Please try again later.</p>";
    });
}

function searchMovies() {
  const apiKey = "88cdb114";
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const MoviesGrid = document.getElementById("MoviesGrid");

  if (searchInput.trim() !== "") {
    // Display loading message
    MoviesGrid.innerHTML = "<p>Loading movies...</p>";

    // Fetch movie data from OMDB API
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${searchInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Search && data.Search.length > 0) {
          moviestoshow(data.Search);
        } else {
          MoviesGrid.innerHTML = "<p>No movies found with the given name!</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        MoviesGrid.innerHTML =
          "<p>Error fetching movies. Please try again later.</p>";
      });
  } else {
    MoviesGrid.innerHTML = "<p>Please enter a movie title!</p>";
  }
}

function moviestoshow(movies) {
  const MoviesGrid = document.getElementById("MoviesGrid");

  // Clear previous results
  MoviesGrid.innerHTML = "";

  // Display each movie in the results
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <p>${movie.Year}</p>
    `;

    MoviesGrid.appendChild(movieCard);
  });
}

// Proper debounce function
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    const context = this; // Retain `this` context
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(context, args), delay);
  };
}
