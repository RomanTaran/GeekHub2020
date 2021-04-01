import React from 'react';
import { Button, Form } from "react-bootstrap";
import { loginUser } from "../store/userSlice";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


class Login extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state);
    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    if (this.props.id) return <Redirect to="/"/>;
    return (
      <Form className="login" onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {id: state.user._id}
};

export default connect(mapStateToProps, {loginUser})(Login);
