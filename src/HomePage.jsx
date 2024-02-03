import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

import axios from 'axios';

import { Link } from 'react-router-dom';

export const HomePage = () => {
  let [movies, setMovies] = useState([]);
  let [movies2, setMovies2] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&api_key=3fc2a8031c104b1b52e0f1fb731f103e');
      const result = await response.data.results;
      setMovies(result.slice(0, 7));
      setMovies2(result.slice(7, 14));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log(movies);
    console.log(movies2);
    console.log("tes tes");
  }, [movies], [movies2]);
  

  return (
    <>  
      <Carousel> 
          <Carousel.Item interval={2000}> 
              <img 
                  className="d-block w-100"
                  src={require("./components/img/home.png")}
                  style={{maxHeight: 500}}
              /> 
              <Carousel.Caption> 
                  <h3>Welcome to Netflix</h3> 
                  <p>all your favorite movies in a single site</p> 
              </Carousel.Caption> 
          </Carousel.Item> 
      </Carousel>

      <Container className='py-5'>
        <Row className='py-4'>
          <h1>Now Playing</h1>
        </Row>
        <Row>
          {movies.map((value) => {
            return (
              <Col>
                <Link to={`/moviedetails/${encodeURIComponent(value.id)}`} style={{ textDecoration: 'none' }}>
                <Card className='bg-dark text-light' style={{ width: '9rem', height: '24rem'}}>
                  <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500" + value.poster_path} />
                  <Card.Body>
                    <Card.Title>{value.title}</Card.Title>
                    <Card.Text>{value.overview.length > 20 ?
                      `${value.overview.substring(0, 20)}.....` : value.overview
                    }</Card.Text>
                  </Card.Body>
                </Card>
                </Link>
              </Col>
              )
            })
          }
        </Row>
        <div className='py-4'></div>
        <Row className="py-4"><h1>Coming Soon</h1></Row>
        <Row>
          {movies2.map((value) => {
              return (
                <Col>
                  <Link to={`/moviedetails/${encodeURIComponent(value.id)}`} style={{ textDecoration: 'none' }}>
                  <Card className='bg-dark text-light' style={{ width: '9rem', height: '24rem'}}>
                    <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500" + value.poster_path} />
                    <Card.Body>
                      <Card.Title>{value.title}</Card.Title>
                      <Card.Text>{value.overview.length > 20 ?
                        `${value.overview.substring(0, 20)}.....` : value.overview
                      }</Card.Text>
                    </Card.Body>
                  </Card>
                  </Link>
                </Col>
                )
              })
            }
        </Row>
        <div className='py-4'></div>
      </Container>
    </>
  )
}

