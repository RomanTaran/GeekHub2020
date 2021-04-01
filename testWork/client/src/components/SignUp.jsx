import React from 'react';
import { Button, Form } from "react-bootstrap";
import { signupUser } from "../store/userSlice";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  };
  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signupUser(this.state);
    this.setState({
      name: '',
      email: '',
      password: ''
    })
  }

  render() {
    if (this.props.id) return <Redirect to="/"/>;
    return (
      <Form className="signup" onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="name"
            placeholder="Введите имя"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </Form.Group>
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
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Зарегистрироваться
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {id: state.user._id}
};

export default connect(mapStateToProps, {signupUser})(SignUp);
