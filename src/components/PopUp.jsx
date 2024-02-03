import React, { useState } from "react";
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';

const PopUp = ({ roomNumber, movieData, params }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <button
        className="btn btn-warning rounded-2 p-2"
        onClick={handleButtonClick}
      >
        Room {roomNumber}
      </button>

      {isModalVisible && (
        <div className="modal bg-black d-flex align-items-center justify-content-center">
          <div className="modal-dialog bg-dark modal-content m-3 rounded-md">
            <div className="modal-body p-4">
              <div>
                <img
                  className="mb-2"
                  src={movieData.Poster}
                  alt="Movie Poster"
                />
              </div>

              <div className="rounded">
                <div className="d-flex justify-content-between">
                  <h3 className="flex-grow">Select Tickets</h3>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
                <p>Studio: {roomNumber}</p>
                <p>Available Seats: {params}</p>

                <div className="d-flex align-items-center flex-grow">
                  <div className="flex">
                    <p className="flex-grow">Number of Tickets: </p>
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary m-3"
                      onClick={() => {
                        if (counter > 0) {
                          setCounter(counter - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <p className="mt-4"> {counter}</p>
                    <button
                      className="btn btn-primary m-3"
                      onClick={() => setCounter(counter + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                  <Link to={`/seatpage/${movieData.Title}/${roomNumber}/${counter}`}>
                    <Button variant="warning">Select seats</Button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;