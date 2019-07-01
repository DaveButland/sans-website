import React from "react"; //basic react
import { withRouter } from "react-router-dom" ; //react routing
import ReactGA from "react-ga" ; //google analytics
import AppliedRoute from "./AppliedRoute" ; //

import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap" ;

import Auth from "@aws-amplify/auth" ;
import Amplify from 'aws-amplify';
import awsconfig from './config.js'

import SignIn from "./website/signin" ;
import SignUp from "./website/signup" ;
import Home from "./website/home" ;
import Media from "./website/media" ;
import Profile from "./website/profile" ;
import Albums from "./website/albums" ;
import Articles from "./website/articles" ;
import Image from "./website/image" ;
import NotFound from "./website/notfound" ;
import Test from "./website/Test" ;

import { Route, Switch } from "react-router-dom";
//import { useCookies } from 'react-cookie';
import cookie from "react-cookies";

ReactGA.initialize('UA-140067414-1');
ReactGA.pageview(window.location.pathname + window.location.search);

Amplify.configure(awsconfig);

class App extends React.Component {

	constructor(props, context) {
		super(props, context);
		
		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};
	}

	async getCookies( accessToken ) {
		
		const reqsigned = new XMLHttpRequest();
		reqsigned.open( "GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/cookies?domain='+process.env.REACT_APP_HTML_DOMAIN, false ) ;
		reqsigned.setRequestHeader( "Authorization", "Bearer "+accessToken ) ;
		reqsigned.send() ;
		let values = JSON.parse( reqsigned.response ) ;
		
		cookie.save( "CloudFront-Key-Pair-Id", values["CloudFront-Key-Pair-Id"] ) ;
		cookie.save( "CloudFront-Policy", values["CloudFront-Policy"] ) ;
		cookie.save( "CloudFront-Signature", values["CloudFront-Signature"] ) ;
	}

	async removeCookies() {
		cookie.remove( "CloudFront-Key-Pair-Id" ) ;
		cookie.remove( "CloudFront-Policy" ) ;
		cookie.remove( "CloudFront-Signature" ) ;
	}

	getCookies1( accessToken ) {
		return new Promise((resolve, reject) => {

			var xhr = new XMLHttpRequest();
			xhr.open( "GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/cookies?domain='+process.env.REACT_APP_HTML_DOMAIN, true ) ;
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+accessToken );
			xhr.onload = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					let values = JSON.parse( xhr.response ) ;
		
					cookie.save( "CloudFront-Key-Pair-Id", values["CloudFront-Key-Pair-Id"] ) ;
					cookie.save( "CloudFront-Policy", values["CloudFront-Policy"] ) ;
					cookie.save( "CloudFront-Signature", values["CloudFront-Signature"] ) ;
					resolve(xhr.response);
				} else {
					alert( "Error creating new image") ;
					reject(xhr.response);
				}
			}
			xhr.send();
		});
	}

	async componentDidMount() {
		try {
			let session = await Auth.currentSession();
			let accessToken = session.getAccessToken().getJwtToken() ;
			let idToken = session.getIdToken().getJwtToken() ;
			this.setState({ accessToken: accessToken, idToken: idToken });

			await this.getCookies1(accessToken) ;
			this.userHasAuthenticated(true);
		}
		catch(e) {
			this.setState({accessToken: null, idToken: null });
			this.removeCookies() ;
			if (e !== 'No current user') {
				alert(e);
			}
		}
	
		this.setState({ isAuthenticating: false });
	}

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	}

	handleLogout = async (event) => {
		this.userHasAuthenticated(false);

		await Auth.signOut();
		this.props.history.push( "/signin" ) ;
	}

 	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated,
			accessToken: this.state.accessToken,
			idToken: this.state.idToken
		};

//		console.log( "App: "+this.state.isAuthenticated+" "+Date.now() ) ;
		
		return (
			!this.state.isAuthenticating &&
      <Container fluid>
        <Navbar variant="light" bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="/">Sans Caffeine</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
							<NavDropdown title="Portfolio" id="portfolio">
				        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        				<NavDropdown.Item href="/media">Media</NavDropdown.Item>
        				<NavDropdown.Item href="/articles">Articles</NavDropdown.Item>
       				 	<NavDropdown.Item href="/albums">Albums</NavDropdown.Item>
				      </NavDropdown>
            </Nav>
            <Form inline>
              <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
        	    <Button variant="outline-success" size="sm">Search</Button>
            </Form>
						{this.state.isAuthenticated
           	 	? <Button variant="default" onClick={this.handleLogout}>Signout</Button>
            	: <Nav.Link href="signin">Signin</Nav.Link>
	         	 	}
    	  	</Navbar.Collapse>
        </Navbar>
			
				<Switch>
          <Route exact path="/" component={Home} />
					<Route path="/test" component={Test} />
					<AppliedRoute path="/signin" exact component={SignIn} props={childProps}/>
					<AppliedRoute path="/media" component={Media} props={childProps}/>
					<Route path="/signup" component={SignUp} />
					<Route path="/profile" component={Profile} />
					<Route path="/albums" component={Albums} />
					<Route path="/articles" component={Articles} />
					<Route path="/image" component={Image} />
					<Route component={NotFound} />
				</Switch>
			</Container>
 
    );
  }
}

export default withRouter( App );