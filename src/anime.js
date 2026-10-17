import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./tv.css";
import Header from "./header";

function Anime() {
  //Search movies
  const [searchQuery, setSearchQuery] = useState("");

  //Fetch data from JSON File
  const [movies, setMovies] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/anime")
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Data:", data);
        setMovies(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //Fetch data from Recently watched
  useEffect(() => {
    fetch("http://localhost:5001/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Data:", data);
        setRecent(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Function to scroll
  const movieListRef = useRef(null);

  const scrollMovies = (direction) => {
    if (movieListRef.current) {
      const movieList = movieListRef.current;
      const scrollAmount = movieList.clientWidth;
      const maxScrollLeft = movieList.scrollWidth - movieList.clientWidth;

      if (direction === "right") {
        const newScrollLeft = Math.min(
          movieList.scrollLeft + scrollAmount,
          maxScrollLeft
        );
        movieList.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      } else if (direction === "left") {
        const newScrollLeft = Math.max(movieList.scrollLeft - scrollAmount, 0);
        movieList.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }
    }
  };
  return (
    <div className="tvContainer">
      <Header setSearchQuery={setSearchQuery} />
      <h1 className="text-light mb-5">Anime</h1>
      <div className="movie row">
        {movies.length > 0 ? (
          movies.filter((movie) =>
            movie.animeName.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 ? (
            <p className="text-light">No movies found.</p>
          ) : (
            movies
              .filter((movie) =>
                movie.animeName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((movie) => (
                <div
                  key={movie.id}
                  className="movies-item col-12 col-md-4 col-lg-4 mb-4"
                >
                  <div className="img-containers">
                    <Link to={`/movie-details/anime/${movie.id}`}>
                      <img
                        src={movie.animeImage}
                        alt={movie.animeName}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="movie-about mt-3">
                    <h5>{movie.animeName}</h5>
                    <p className="text-light">
                      {movie.animeContent.slice(0, 30)}...
                    </p>
                    <h6 className="text-warning">
                      <i className="fas fa-star"></i> {movie.animeRating}
                    </h6>
                  </div>
                </div>
              ))
          )
        ) : (
          <p>No movies available.</p>
        )}
      </div>

      {/* Recent */}
      <div className="watching">
        <div className="movie-header row">
          <div className="col-8 col-md-10">
            <h1 className="fs-4 fs-md-5">Now Watching</h1>
          </div>
          <div className="moveIcon col-5 col-sm-4 col-md-2 col-lg-1 mx-auto d-flex justify-content-center justify-content-sm-end mt-2 mt-md-0">
            <i
              className="fas fa-chevron-left"
              onClick={() => scrollMovies("left")}
            ></i>
            <i
              className="fas fa-chevron-right"
              onClick={() => scrollMovies("right")}
            ></i>
          </div>
        </div>
        <div
          className="movie-list d-flex flex-nowrap overflow-auto"
          ref={movieListRef}
        >
          {recent.length > 0 ? (
            recent.filter((movie) =>
              movie.movieName.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 ? (
              <p className="text-light">No movies found.</p>
            ) : (
              recent
                .filter((movie) =>
                  movie.movieName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((movie) => (
                  <div
                    key={movie.id}
                    className="movie-item col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <div className="recentImg col-12 col-sm-10 col-md-11 col-lg-12 position-relative">
                      <Link to={`/movie-details/movies/${movie.id}`}>
                        <img
                          src={movie.movieImage}
                          alt={movie.movieName}
                          className="img-fluid w-100"
                        />
                      </Link>
                      <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                        <Link to={`/movie-details/movies/${movie.id}`}>
                          <i className="fas fa-play-circle fa-3x text-white"></i>
                        </Link>
                        <p className="text-white mt-2">{movie.movieName}</p>
                      </div>
                    </div>
                    <div className="movie-about mt-3">
                      <h5>{movie.movieName}</h5>
                      <p className="text-light">
                        {movie.movieContent.slice(0, 30)}...
                      </p>
                      <h6 className="text-warning">
                        <i className="fas fa-star"></i> {movie.movieRating}
                      </h6>
                    </div>
                  </div>
                ))
            )
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Anime;
