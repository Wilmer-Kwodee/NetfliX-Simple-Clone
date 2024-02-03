// import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React, { useContext, useState, useEffect } from 'react'
import {UserContext} from './components/Userprovider';

import { useNavigate } from 'react-router-dom';

export const Navbar1 = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [auth, setAuth] = useState(false);
  useEffect(() =>
  {
    if (user)
    {
      setAuth(true);
    } else
    {
      setAuth(false)
    }
  }, [user])

  const handleDelete = () =>
  {
    setUser(null); 
    setAuth(false);
    navigate('/');
  };

  return (
    <div>
    {
      auth ?
      <Navbar data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-black">
        console.log(user)
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: 'bold', fontStyle: 'italic', color:'#C9AE00' }}>
            <img
                alt=""
                src={require('./components/img/cinema logo.png')}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            NETFLIX
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="myticket">My Tickets</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href=''>{user.customer_Name}</Nav.Link>
              <Nav.Link onClick={handleDelete}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      :

      <Navbar data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-black">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: 'bold', fontStyle: 'italic', color:'#ff0000' }}>
            {/* <img
                alt=""
                src={require('./components/img/cinema logo.png')}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '} */}
            NETFLIX
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            {/* <Nav.Link href="features">Now Playing</Nav.Link>
              <Nav.Link href="pricing">Coming Soon</Nav.Link> */}
            </Nav>
            <Nav>
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link eventKey={2} href="register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      }

    </div>
  )
}

// CineMajesty
// Filmnema