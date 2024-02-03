import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './Userprovider';
import "./MovieDetails.css";

function MyTicket() {
    const [datas, setDatas] = useState([]);
    const {user,setUser}=useContext(UserContext)
    // console.log("aaa" + user.customer_ID);
    const [userID, setUserID] = useState(user.customer_ID);

    useEffect(() => {
        axios.get(`https://localhost:7161/api/join`)
            .then(async response => {
                const bookingData = response.data;
                // console.log(bookingData);"
                const movieDetailsPromises = bookingData.map(async booking => {
                    const movieResponse = await axios.get(`https://www.omdbapi.com/?i=${booking.movie_ID}&apikey=e9565e7a`);
                    // console.log(booking.booking_ID);
                    return { ...booking, movieDetails: movieResponse.data };
                });
                
                // console.log(movieDetails);
                const bookingDataWithMovies = await Promise.all(movieDetailsPromises);
                
                setDatas(bookingDataWithMovies);
            })
            .catch(error => {
                console.error('Error fetching data');
            });
    }, []);
    // console.log(booking.booking_ID);
    // console.log(datas);
    const filteredData = datas.filter(data => data.customer && data.customer.customer_ID === userID);
    console.log(filteredData);
    
    return (
        <div className="container-fluid bg-dark text-light">
            <div className="row p-5">
                    <h4>Name: {filteredData[0]?.customer?.customer_Name}</h4>
            </div>

            {filteredData.map(data => (                
                <div key={data.booking_ID}>
                    <h4 className="m-5">Movie: {data.movieDetails?.Title}</h4>
                    <div className="ticket-box pb-5" style={{width: '70vw'} }>                    
                        {data.tickets && data.tickets.map(ticket => (                            
                            <div key={ticket.ticket_ID} className="ticket m-5">
                                <div className="row" style={{outline: '.5px solid white', borderRadius: '5px'} }>
                                    <div className="col-md-3" style={{height: '275px'}}>
                                        <img src={data.movieDetails?.Poster} alt="Movie Poster" className="movie-poster" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-md-8 p-3" style={{ height: '275px' }}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h4>Cinemajesty</h4>
                                                <hr></hr>
                                            </div>
                                            <div className="col-md-4">
                                            <h6>Title</h6>
                                                <p>{data.movieDetails?.Title}</p>
                                                <h6>Genre</h6>
                                                <p style={{ whiteSpace: 'nowrap',  textOverflow: 'ellipsis' }}>{data.movieDetails?.Genre}</p>
                                                <h6>Rated</h6>
                                                <p>{data.movieDetails?.Rated}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h6>Ticket Number</h6>
                                                <p>{ticket.ticket_Number}</p>
                                               </div>
                                                <div className="col-md-4">
                                                <h6>Seat Number</h6>
                                                <p>{ticket.seatss[0]?.seat_Number}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyTicket;
