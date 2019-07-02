import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Auth} from "aws-amplify" ;
//import "./Signup.css";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
			username: "", 
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
			this.state.username.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

	handleSubmit = async event => {
		event.preventDefault();
	
		this.setState({ isLoading: true });
	
		try {
			const newUser = await Auth.signUp({
				username: this.state.username,
				password: this.state.password,
				attributes: { email: this.state.email }
			});

			this.setState({
				newUser
			});
		} catch (e) {
			alert(e.message);
		}
	
		this.setState({ isLoading: false });
	}
	
	handleConfirmationSubmit = async event => {
		event.preventDefault();
	
		this.setState({ isLoading: true });
	
		try {
			await Auth.confirmSignUp(this.state.username, this.state.confirmationCode);
			await Auth.signIn(this.state.username, this.state.password);
	
			this.props.userHasAuthenticated(true);
			this.props.history.push("/");
		} catch (e) {
			alert(e.message);
		}
	}

  renderConfirmationForm() {
    return (
			<Form onSubmit={this.handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="code"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          block
          disabled={!this.validateConfirmationForm()}
          type="submit"
        >Validate</Button>
      </Form>
    );
  }

  renderForm() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Button
          block
          disabled={!this.validateForm()}
          type="submit"
        >SignUp</Button>
      </Form>
    );
  }

  render() {
    return (
      <Container>
				<Row><Col></Col><Col>
        {this.state.newUser === null
          ? this.renderForm()
					: this.renderConfirmationForm()}
				</Col><Col></Col></Row>
			</Container>
    );
  }
}

export default SignUp ;