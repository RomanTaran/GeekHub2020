import React, { useEffect } from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, signoutUser } from "../store/userSlice";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadUser());
  })
  const handleSignOut = () => {
    dispatch(signoutUser());
    history.push('/login');
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Домашняя бухгалтерия</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          {user._id ? (
            <>
              <Nav className="mr-auto">
                <NavLink to="/">Список расходов</NavLink>
                <NavLink to="/view2">Список по типам</NavLink>
                <NavLink to="/view3">Сгрупированные растраты</NavLink>
              </Nav>
              <NavDropdown title="Добавить сокращение" id="basic-nav-dropdown">
                <NavDropdown.Item><NavLink to="/dates">Для даты</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink to="/types">Для типов трат</NavLink></NavDropdown.Item>
              </NavDropdown>
              <Form inline>
                <Button variant="outline-success" onClick={handleSignOut}>Выйти</Button>
              </Form>
            </>
          ) : (
            <>
              <Nav className="mr-auto">
              </Nav>
              <Button variant="outline-success" href="/login">Войти</Button>
              <Button variant="outline-success" href="/signup">Зарегистрироваться</Button>
            </>
          )
          }
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
