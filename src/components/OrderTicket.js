import React, { useState, useEffect } from "react";
import { getMovie } from "./api";
import MovieDetail2 from "./MovieDetail2";
import TabsMovie from "./TabsMovie";
import { useParams } from "react-router-dom";

const OrderTicket = () => {
  const [movieData, setMovieData] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMovie(id);
        console.log("API res:", response);
        setMovieData(response);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-dark text-light min-vh-100">
    {movieData ? (
      <div className="d-flex flex-column">
        <div>
          <MovieDetail2 movieData={movieData} />
        </div>
        <div>
          <TabsMovie movieData={movieData} />
        </div>
      </div>
    ) : (
      <p className="text-warning">Loading...</p>
    )}
  </div>
  );
};

export default OrderTicket;
