import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-light p-5">
      <div className="container-fluid">
        <div className="row">
          {/* About Section */}
          <div className="col-12 col-md-4 mb-4 custom-justify text-center text-md-start">
            <h5>About Us</h5>
            <p className="custom-justify">
              Streamify is a premier OTT platform that brings the world’s best
              entertainment directly to your screen. With a vast library of
              movies, TV shows, documentaries, and exclusive original series,
              Streamify delivers content in every genre to cater to every
              viewer’s taste. Whether you're in the mood for a heartwarming
              family film, an action-packed thriller, or the latest comedy
              series, Streamify has it all.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-4 mb-4 text-center ">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mt-3">
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mt-2">
                <a href="/tv" className="text-light text-decoration-none">
                  TV Shows
                </a>
              </li>
              <li className="mt-2">
                <a href="/movie" className="text-light text-decoration-none">
                  Movies
                </a>
              </li>
              <li className="mt-2">
                <a href="/anime" className="text-light text-decoration-none">
                  Anime
                </a>
              </li>
              <li className="mt-2">
                <a href="/cartoon" className="text-light text-decoration-none">
                  Cartoons
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-12 col-md-4 mb-4 text-center text-md-start">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="#" className="text-light p-2">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="#" className="text-light p-2">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-light p-2">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-light p-2">
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr />
        <div className="mt-4 text-center">
          <p>© 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
