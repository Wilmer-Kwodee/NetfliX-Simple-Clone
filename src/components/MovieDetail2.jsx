/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import ClockIcon from "./assets/Clock.svg";
import TagIcon from "./assets/Tag.svg";

const movieDetail = ({ movieData }) => {
  return (
    <div className="container p-10 d-flex pt-5 flex-column flex-md-row">
    <div className="d-flex justify-content-center">
      <img
        className="p-2 pl-md-5 justify-content-center"
        src={movieData.Poster}
        alt="Movie Poster"
      />
    </div>
  
    <div className="ml-md-3">
      <h1 className="mt-3 text-white p-1 text-uppercase text-gold">
        {movieData.Title}
      </h1>
  
      <p className="text-white text-md-xl p-3">
        {movieData.Plot}
      </p>
  
      <div className="d-flex align-items-center">
        <img
          className="w-6 h-6 ml-2 text-white"
          src={ClockIcon}
        />
        <p className="text-white text-md-xl pl-2">
          {movieData.Runtime}
        </p>
      </div>
  
      <div className="pl-2 d-flex flex-wrap">
        {movieData.Genre.split(",").map((genre, index) => (
          <div className="d-flex flex-row align-items-center gap-1 m-1" key={index}>
            <img src={TagIcon} className="w-6 h-6"></img>
            <span className="text-white text-md-xl m-1">
              {genre.trim()}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default movieDetail;