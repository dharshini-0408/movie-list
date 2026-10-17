import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-details.css";
import Header from "./header";

function MovieDetails() {
  //Search movies
  const [searchQuery, setSearchQuery] = useState("");

  const { category, id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    // Fetching the movie or TV show data dynamically based on category (tv or movie)
    fetch(`http://localhost:5001/${category}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid category or ID");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          navigate("/error");
        } else {
          setMovie(data);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/error");
      });
  }, [category, id, navigate]);

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

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movieContainer">
      <Header setSearchQuery={setSearchQuery} />
      <div className="movieHeading text-light">
        <h1>
          {movie.movieName ||
            movie.tvShowName ||
            movie.animeName ||
            movie.cartoonName}
        </h1>
      </div>
      <div className="movieContent text-light">
        <div className="movieDetails row d-flex align-items-start">
          <div className="movieImage col-12 col-md-4 d-flex justify-content-center">
            <img
              src={
                movie.movieImage ||
                movie.tvShowImage ||
                movie.animeImage ||
                movie.cartoonImage
              }
              alt={
                movie.movieName ||
                movie.tvShowName ||
                movie.animeName ||
                movie.cartoonName
              }
              className="img-fluid"
            />
          </div>

          <div className="movieSideContent col-12 col-md-4 d-flex flex-column justify-content-between">
            <div className="d-flex gap-5 flex-column flex-md-row">
              <h3 className="movieRating text-warning">
                <i className="fas fa-star"></i>{" "}
                {movie.movieRating ||
                  movie.tvShowRating ||
                  movie.animeRating ||
                  movie.cartoonRating}
              </h3>
              <p className="hdcontainer text-danger text-center">Full HD</p>
            </div>

            <div className="movieSubDetails">
              <p>
                Genre:{" "}
                {movie?.movieGenre ||
                  movie?.tvShowGenre ||
                  movie?.animeGenre ||
                  movie?.cartoonGenre}
              </p>
              <p>
                Running time:{" "}
                {movie?.movieDuration ||
                  movie?.tvShowDuration ||
                  movie?.animeDuration ||
                  movie?.cartoonDuration}
              </p>
              <p>
                Country:{" "}
                {movie?.movieCountry ||
                  movie?.tvShowCountry ||
                  movie?.animeCountry ||
                  movie?.cartoonCountry}
              </p>
              <p>
                Premiere:{" "}
                {movie?.moviePremiere ||
                  movie?.tvShowPremiere ||
                  movie?.animePremiere ||
                  movie?.cartoonPremiere}
              </p>
              <p>
                Director:{" "}
                {movie?.movieDirector ||
                  movie?.tvShowDirector ||
                  movie?.animeDirector ||
                  movie?.cartoonDirector}
              </p>
              <p>
                Actors:{" "}
                {movie?.movieActors ||
                  movie?.tvShowActors ||
                  movie?.animeActors ||
                  movie?.cartoonActors}
              </p>
            </div>
          </div>

          <div className="videoContent col-12 col-md-12 col-lg-5">
            <video controls className="movieVideo w-100">
              <source
                src={
                  movie?.movieVideo ||
                  movie?.tvShowVideo ||
                  movie?.animeVideo ||
                  movie?.cartoonVideo
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="movieContentText">
          <h1>About</h1>
          <p>
            {movie.movieContent ||
              movie.tvShowContent ||
              movie.animeContent ||
              movie.cartoonContent}
          </p>
        </div>

        <div className="movieCasting mt-5">
          <h1>Top Performers</h1>
          <div className="row mt-5 mb-5">
            {Array.isArray(movie.Actor || movie) && movie.Actor.length > 0 ? (
              movie.Actor.map((actor, index) => (
                <div className="col" key={index}>
                  <img
                    src={movie.ActorsImage[index]}
                    className=" img-fluid rounded-circle"
                    style={{
                      width: "200px",
                      height: "170px",
                    }}
                  />
                  <div className="text-center mt-2">
                    <p>{actor}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No cast available</p>
            )}
          </div>
        </div>

        {/* Recent  */}
        <div className="watching">
          <div className="movie-header row">
            <div className="col-8 col-md-10">
              <h1 className="fs-4 fs-md-5">Now Watching</h1>
            </div>
            <div className="moveIcon col-5 col-sm-4 col-md-2 col-lg-1 d-flex justify-content-center justify-content-sm-end mt-2 mt-md-0">
              <i
                className="fas fa-chevron-left  me-3"
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
                movie.movieName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ).length === 0 ? (
                <p>No movies found.</p>
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
                      <div className="movie-about mt-4">
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
    </div>
  );
}

export default MovieDetails;
