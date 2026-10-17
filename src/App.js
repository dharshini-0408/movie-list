import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./header";

function App() {
  //Search movies
  const [searchQuery, setSearchQuery] = useState("");

  //Fetch anime data from JSON File
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/anime")
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Data:", data);
        setAnime(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Fetch Recent data from JSON File
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Data:", data);
        setMovies(data);
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

  // Change Banner Image
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/Images/banner1.jpg",
    "/Images/banner2.jpg",
    "/Images/banner3.jpg",
    "/Images/banner4.jpg",
    "/Images/banner5.jpg",
    "/Images/banner6.jpg",
  ];
  const heading = [
    "The Beast",
    "Uglies",
    "Things Will Be Different",
    "Dune",
    "The Wild Robot",
    "Mars Express",
  ];
  const content = [
    "A bold sci-fi drama exploring complex human emotions and societal issues, set against a futuristic backdrop.",
    "In a dystopian future with enforced beauty standards, a teen seeks her missing friend before surgery.",
    "Two estranged siblings hide in a farmhouse, facing a mysterious force that tests their bonds.",
    "Paul Atreides unites with Chani and the Fremen to avenge his family and survive on Arrakis.",
    "A robot wakes up alone on an island, learning survival and discovering the meaning of life.",
    "A sci-fi thriller on Mars, following characters navigating challenges, blending mystery and futuristic technology elements.",
  ];
  const type = [
    "Science Fiction, Drama",
    "Thriller, Drama, Adventure",
    "Thriller, Drama, Adventure",
    "Science Fiction, Adventure",
    "Animation, Science Fiction, Family",
    "Science Fiction, Drama",
  ];
  const video = [
    "/Images/video1.mp4",
    "/Images/video2.mp4",
    "/Images/video3.mp4",
    "/Images/video4.mp4",
    "/Images/video5.mp4",
    "/Images/video6.mp4",
  ];

  // Function to scroll through the banner images
  const scrollBanner = (direction) => {
    if (direction === "right") {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  // Popup visibility and message
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Function to show the popup with the corresponding message
  const choosePlane = (plan) => {
    setPopupMessage(plan);
    setIsPopupVisible(true);
  };

  // Close popup function
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="app-container ">
      <Header setSearchQuery={setSearchQuery} />
      <div className="img-container mb-5 position-relative">
        <div className="position-relative w-100 h-100">
          <img
            src={images[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        </div>

        <div className=" d-flex justify-content-start text-overlay row position-absolute top-50 start-0 translate-middle-y  text-white ps-5 ">
          <div className="text-content col-12 col-lg-6 d-flex flex-column">
            <h1 className="mt-3 mt-lg-0">{heading[currentIndex]}</h1>
            <p>{content[currentIndex]}</p>
            <p>{type[currentIndex]}</p>

            <div className="moveIcon d-flex justify-content-start mt-3">
              <i
                className="fas fa-chevron-left"
                onClick={() => scrollBanner("left")}
              ></i>
              <i
                className="fas fa-chevron-right"
                onClick={() => scrollBanner("right")}
              ></i>
            </div>
          </div>
          <div className="col-9 col-sm-6 col-md-5 col-lg-5 mt-3 mt-lg-0">
            <video
              key={video[currentIndex]}
              controls
              className="movieVideo w-100 rounded"
            >
              <source src={video[currentIndex]} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="watching">
        <div className="movie-header row">
          <div className="col-8 col-md-10">
            <h1>Now Watching</h1>
          </div>
          <div className="moveIcon col-5 col-sm-4 col-md-2 col-lg-1 mx-auto d-flex justify-content-center justify-content-sm-end mt-2 mt-md-0">
            <i
              className="fas fa-chevron-left me-3"
              onClick={() => scrollMovies("left")}
            ></i>
            <i
              className="fas fa-chevron-right "
              onClick={() => scrollMovies("right")}
            ></i>
          </div>
        </div>
        <div
          className="movie-list d-flex flex-nowrap overflow-auto"
          ref={movieListRef}
        >
          {movies.length > 0 ? (
            movies.filter((movie) =>
              movie.movieName.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 ? (
              <p className="text-light">No movies found.</p>
            ) : (
              movies
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
                      <p
                        className="text-light text-truncate"
                        style={{ maxWidth: "150px" }}
                      >
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
            <p>No movies available.</p>
          )}
        </div>
      </div>

      <div className="planList mb-5 mt-5">
        <h1>Select Your Plan</h1>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card-body p-5">
              <div className="d-flex justify-content-between">
                <h2 className="card-title text-light">Cinematic</h2>
                <h2 className="card-title text-danger">$39.99</h2>
              </div>
              <ul className="mb-5 mt-5">
                <li>2 Months</li>
                <li className="mt-2">Ultra HD</li>
                <li className="mt-2">Lifetime Availability</li>
                <li className="mt-2">Any Device</li>
                <li className="mt-2">24/7 Support</li>
              </ul>
              <div className="text-center">
                <button
                  type="btn"
                  className="choose-btn text-center mb-5 px-5 py-2"
                  onClick={() => choosePlane("Cinematic")}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card-body p-5">
              <div className="d-flex justify-content-between w-100">
                <h2 className="card-title text-light">Premium</h2>
                <h2 className="card-title text-danger">$19.99</h2>
              </div>
              <ul className="mb-5 mt-5">
                <li className="mt-2">1 Month</li>
                <li className="mt-2">Full HD</li>
                <li className="mt-2">Lifetime Availability</li>
                <li className="mt-2">TV & Desktop</li>
                <li className="mt-2">24/7 Support</li>
              </ul>
              <div className="text-center">
                <button
                  type="btn"
                  className="choose-btn text-center mb-5 px-5 py-2"
                  onClick={() => choosePlane("Premium")}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card-body p-5">
              <div className="d-flex justify-content-between w-100">
                <h2 className="card-title text-light">Starter</h2>
                <h2 className="card-title text-danger">Free</h2>
              </div>
              <ul className="mb-5 mt-5">
                <li className="mt-2">7 days</li>
                <li className="mt-2">720p Resolution</li>
                <li className="mt-2">Limited Availability</li>
                <li className="mt-2">Desktop Only</li>
                <li className="mt-2">Limited Support</li>
              </ul>
              <div className="text-center">
                <button
                  type="btn"
                  className="choose-btn text-center mb-5 px-5 py-2"
                  onClick={() => choosePlane("Starter")}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-content mt-5 p-4 rounded-3 position-relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{popupMessage}</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="plane" className="form-label">
                  Choose Plan
                </label>
                <select
                  className="form-select"
                  id="plane"
                  defaultValue="default-plane"
                >
                  <option value="default-plane" disabled>
                    Choose Your Plan
                  </option>
                  <option value="basic">Starter</option>
                  <option value="premium">Premium </option>
                  <option value="enterprise">Cinematic</option>
                </select>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="close-popup-btn btn btn-danger"
                  onClick={closePopup}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Featured today */}
      <div className="featuredContent mb-5">
        <h1 className="text-light mb-4">Featured today</h1>
        <div className="d-flex flex-wrap align-items-start">
          <div className="videoContent col-12 col-lg-6">
            <video key={video[currentIndex]} controls className="movieVideo">
              <source src={video[currentIndex]} type="video/mp4" />
            </video>
          </div>

          <div className="featuredMovies ms-auto col-12 col-lg-5 mt-3 mt-lg-0">
            <div className="animeContent bg-dark p-3 rounded">
              {anime.length > 0 ? (
                anime.filter((movie) =>
                  movie.animeName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ).length === 0 ? (
                  <p className="text-light">No movies found.</p>
                ) : (
                  anime
                    .filter((movie) =>
                      movie.animeName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((movie) => (
                      <Link
                        key={movie.id}
                        to={`/movie-details/anime/${movie.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div key={movie.id} className="mb-4">
                          <div className="d-flex align-items-center">
                            <img
                              src={movie.animeImage}
                              alt={movie.animeName}
                              className="img-fluid"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                            <div className="ms-3">
                              <h5 className="mb-1 text-light">
                                {movie.animeName}
                              </h5>
                              <h6 className="text-warning mb-0">
                                <i className="fas fa-star"></i>{" "}
                                {movie.animeRating}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                )
              ) : (
                <p>No movies available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
