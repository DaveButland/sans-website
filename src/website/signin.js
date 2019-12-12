import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom" ;
import Auth from "@aws-amplify/auth" ;
import "./signin.css" ;

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
			password: "", 
			authenticated: false,
			user: "",
			error: "", 
			stage: ""
		};
		
		this.handleActionSignup = this.handleActionSignup.bind(this) ;
		this.handleActionForgot = this.handleActionForgot.bind(this) ;
	}
	
	handleActionSignup() {
		console.log( 'signup') ;
		this.props.history.push("/signup");
	}

	handleActionForgot() {
		this.props.history.push("/forgot");
	}

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

	handleSubmit = async event => {
		event.preventDefault();
	
		try {
			const user = await Auth.signIn(this.state.username, this.state.password);
			if (user.challengeName === 'SMS_MFA' || 
				user.challengeName === 'SOFTWARE_TOKEN_MFA') {
				/*
							// You need to get the code from the UI inputs
							// and then trigger the following function with a button click
				const code = getCodeFromUserInput();
							// If MFA is enabled, sign-in should be confirmed with the confirmation code
				const loggedUser = await Auth.confirmSignIn(
									user,   // Return object from Auth.signIn()
									code,   // Confirmation code  
									mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
				);
				*/
			} else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
				/*
				const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
							// You need to get the new password and required attributes from the UI inputs
							// and then trigger the following function with a button click
							// For example, the email and phone_number are required attributes
				const { username, email, phone_number } = getInfoFromUserInput();
				const loggedUser = await Auth.completeNewPassword(
					user,               // the Cognito User Object
					newPassword,       // the new password
									// OPTIONAL, the required attributes
					{
						email,
						phone_number,
					}
				);
				*/
			} else if (user.challengeName === 'MFA_SETUP') {
							// This happens when the MFA method is TOTP
							// The user needs to setup the TOTP before using it
							// More info please check the Enabling MFA part
				Auth.setupTOTP(user);
			} else {
							// The user directly signs in
				await Auth.currentSession() ;
				
				this.props.userHasAuthenticated(true) ;
				this.props.history.push("/");
			} 
		} catch (err) {
			this.setState( { error: JSON.stringify( err ) } ) ;
			if (err.code === 'UserNotConfirmedException') {
							// The error happens if the user didn't finish the confirmation step when signing up
							// In this case you need to resend the code and confirm the user
							// About how to resend the code and confirm the user, please check the signUp part
			} else if (err.code === 'PasswordResetRequiredException') {
							// The error happens when the password is reset in the Cognito console
							// In this case you need to call forgotPassword to reset the password
							// Please check the Forgot Password part.
			} else if (err.code === 'NotAuthorizedException') {
							// The error happens when the incorrect password is provided
			} else if (err.code === 'UserNotFoundException') {
							// The error happens when the supplied username/email does not exist in the Cognito user pool
			} else {
				console.log(err);
			}
		}
	}
	
	render() {
    return (
      <Container>
        <Form className="signin" onSubmit={this.handleSubmit}>
					<h1>Sign In</h1>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
						<Form.Control autoFocus type="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
					<Button block disabled={!this.validateForm()} type="submit">Sign In</Button>
					<Button block variant="secondary" onClick={this.handleActionForgot} disabled>Forgot Password</Button>
					<Button block variant="secondary" onClick={this.handleActionSignup} >Sign Up</Button>
 				</Form>	
      </Container>
    );
  }
}

export default withRouter(SignIn) ;
