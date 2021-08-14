import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            src='https://scontent.fods5-1.fna.fbcdn.net/v/t1.6435-1/p200x200/46999912_1889083281187017_1549590656702218240_n.png?_nc_cat=111&ccb=1-4&_nc_sid=dbb9e7&_nc_ohc=h0FCRWmEpB4AX-CYpbT&_nc_ht=scontent.fods5-1.fna&oh=a6cbe4d8d471d52856a39c57ac0150d1&oe=61388265'
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="New Normal"
          />{''}
          New Normal
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/watchlater">WatchLater</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    /*    <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>

            </Navbar.Brand>
            <Nav className="me-auto">
              <Link to="/">Home</Link>
              <Link to="/watchlater">Watch later</Link>
            </Nav>
          </Container>
        </Navbar>*/
  )
}

export default NavBar;