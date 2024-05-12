import React, { useState } from 'react';
import './MovieList.css';

function MovieForm({ addMovie }) {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || rating === '') {
      alert('Ange både titel och betyg innan du sparar filmen!');
      return;
    }
    addMovie({ title, rating });
    setTitle('');
    setRating('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Lägg till en film</legend>
        <label htmlFor="title-field">Titel:</label>
        <input
          type="text"
          id="title-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
        <label htmlFor="rating-field">Betyg:</label>
        <select
          id="rating-field"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="form-control"
        >
          <option value="">Välj betyg här...</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <input type="submit" className="btn btn-success mt-3" value="Spara film" />
      </fieldset>
    </form>
  );
}

function MovieList({ movies, deleteMovie }) {
  return (
    <ul className="movie-list">
      {movies.map((movie, index) => (
        <li key={index} className="movie-item" data-grade={movie.rating} data-title={movie.title}>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-actions">
            {[...Array(parseInt(movie.rating))].map((_, i) => (
              <img key={i} src="/images/star.png" alt="Star" className="star" />
            ))}
            <img
              src="/images/delete.png"
              alt="Delete"
              className="delete-movie-icon"
              onClick={() => deleteMovie(index)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [movies, setMovies] = useState([]);

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (index) => {
    const updatedMovies = [...movies];
    updatedMovies.splice(index, 1);
    setMovies(updatedMovies);
  };

  const sortAlphabetically = () => {
    const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    setMovies(sortedMovies);
  };

  const sortByRating = () => {
    const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
    setMovies(sortedMovies);
  };

  return (
    <div className="container">
      <h1>Min filmlista</h1>
      <MovieForm addMovie={addMovie} />
      <hr />
      <div className="sort-buttons">
        <button onClick={sortAlphabetically}>Sortera alfabetiskt</button>
        <button onClick={sortByRating}>Sortera efter betyg</button>
      </div>
      <h2>Filmer</h2>
      <MovieList movies={movies} deleteMovie={deleteMovie} />
    </div>
  );
}

export default App;
