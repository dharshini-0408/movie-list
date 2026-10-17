import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Header from "./header";
import Footer from "./footer";
import Tv from "./tv";
import Movie from "./movie";
import Anime from "./anime";
import Cartoon from "./cartoon";
import MovieDetails from "./movie-details";
import Error from "./error";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/cartoon" element={<Cartoon />} />
        <Route path="/movie-details/:category/:id" element={<MovieDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
