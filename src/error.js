import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./error.css";

function Error() {
  useEffect(() => {
    const header = document.querySelector("nav");
    const footer = document.querySelector("footer");

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
  }, []);

  return (
    <div className="errorContainer d-flex justify-content-center align-items-center text-light p-5">
      <div className="text-center">
        <h1 className="display-1 fw-bold glow-text">404</h1>
        <p className="lead">The page you are looking for is not available!</p>
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </div>
    </div>
  );
}

export default Error;
