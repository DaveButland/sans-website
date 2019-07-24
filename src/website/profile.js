import React from "react";
import { Container, Row, Col, Form, FormControl, Image, Button } from "react-bootstrap";

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			user: { sub: ''
						, username: ''
						, email:''
						, firstname: ''
						, surname: '' }
		}
	}

	getUser= () => {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			var sub = this.prop.security.getSession() ;

			xhr.onload = function () {
				var user = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.setState( { user: user, isLoading: false } ) ;
				} else {
					console.log( "Error getting user") ;
				}
			}.bind(this) ;

			xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/users/'+sub, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+accessToken.getJwtToken() );
			xhr.send() ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error getting access token", error, error.stack() ) ;
		});
	}

	onChange = ( event ) => {
		var user = this.state.user ;

		if ( user[event.target.id] !== event.target.value )
		{
			user[event.target.id] = event.target.value ;
			this.setState({ user: user, changed: true } ) ;
		}
	}

	componentDidMount = async () => {
		var accessToken = await this.props.security.getAccessToken() ;

		var user = this.state.user ;

		user.sub = accessToken.payload.sub ;
		user.username = accessToken.payload.username ;

		this.setState( { user:  user }) ;
	}

	render= () => {
    return (
      <Container fluid>
				<Row >
					<Col lg={3}>
						<Image src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/2acf50fa-0738-4e88-bd3b-06db07449152/853e36f9-123e-4921-b44d-3e89c3fa95be-300"}></Image>
					</Col>
					<Col lg={6}>
						<Form>

							<Form.Row>
								<Form.Group as={Col} controlId="username">
									<Form.Label>Username</Form.Label>
	 								<FormControl type="text" value={this.state.user.username} onChange={this.onChange} placeholder="Username" aria-label="Username" aria-describedby="username" />
									<Form.Text className="text-muted">This is your unique identifier across the site.</Form.Text>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>Password</Form.Label>
	 								<FormControl type="password" placeholder="Password" aria-label="password" aria-describedby="password" />
									<Form.Text className="text-muted">Never share your password with anyone else.</Form.Text>
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col} controlId="email">
									<Form.Label>Email Address</Form.Label>
	 								<FormControl type="email" value={this.state.user.email} onChange={this.onChange} placeholder="Email" aria-label="Email" aria-describedby="email" />
									<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
								</Form.Group>
							</Form.Row>

							<Form.Row border="primary">
								<Form.Group as={Col}>
									<Form.Label>First Name</Form.Label>
  								<FormControl placeholder="First Name" aria-label="Firstname" aria-describedby="firstname" />
									<Form.Text className="text-muted">This is for billing purposes only</Form.Text>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>Last Name</Form.Label>
   								<FormControl placeholder="Last Name" aria-label="Lastname" aria-describedby="lastname" />
									<Form.Text className="text-muted">This is for billing purposes only</Form.Text>
								</Form.Group>
							</Form.Row>
							<Button>Update</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		) ;
	}
}

export default Profile ;