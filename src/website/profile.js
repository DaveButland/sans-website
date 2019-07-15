import React from "react";
import { Container, Row, Col, Form, FormControl, InputGroup, Image } from "react-bootstrap";

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			user: {},
		}
	}

	getUser() {
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

	render() {
    return (
      <Container fluid>
				<Row>
					<Col lg={3}>
						<Image src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/e1dc9d32-24d6-40c2-a3ca-12310d3325e4/29b1efb8-a449-43c6-aa00-6905b72cc1d1-300"}></Image>
					</Col>
					<Col lg={9}>
						<Form>
							<InputGroup className="mb-3">
				    		<InputGroup.Prepend>
      						<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    						</InputGroup.Prepend>
    						<FormControl
    		  				placeholder="Username"
 		    	 				aria-label="Username"
      						aria-describedby="basic-addon1"
    						/>
  						</InputGroup>
						</Form>
					</Col>
				</Row>
			</Container>
		) ;
	}
}

export default Profile ;