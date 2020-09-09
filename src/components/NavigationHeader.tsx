import React from 'react'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';

const NavigationHeader = () => (
    <NavBar bg="dark" expand="lg" sticky="top">
      <Container>
        <NavBar.Brand href="/" className="text-light">
          Movie Viewer
        </NavBar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Movies" id="movies-sections">
            <NavDropdown.Item href="/movies/discover">Discover</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </NavBar>
)

export default NavigationHeader
