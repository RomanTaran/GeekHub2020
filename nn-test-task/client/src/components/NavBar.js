import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>New Normal</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll"/>
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{maxHeight: '100px'}}
        >
          <Link to="/">Home</Link>
          <Link to="/watchlater">Watch later</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;