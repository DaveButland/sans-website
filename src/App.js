import React from "react"; //basic react
import { Link, withRouter } from "react-router-dom" ; //react routing
import ReactGA from "react-ga" ; //google analytics
import AppliedRoute from "./AppliedRoute" ; //

import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap" ;

import config from "./website/config" ;
import { Auth } from "aws-amplify" ;

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

ReactGA.initialize('UA-140067414-1');
ReactGA.pageview(window.location.pathname + window.location.search);

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
		reqsigned.open( "GET", 'https://4uwwpb6ojf.execute-api.eu-west-2.amazonaws.com/live/getsignedcookie?domain=d31ajfwgnb8bq0.cloudfront.net', false ) ;
		reqsigned.setRequestHeader( "Authorization", "Bearer "+accessToken ) ;
//		reqsigned.send() ;
//		let signedURL = reqsigned.response ;
	}

	async componentDidMount() {
		try {
			let session = await Auth.currentSession();
			let accessToken = session.getAccessToken().getJwtToken() ;
			let idToken = session.getIdToken().getJwtToken() ;
			this.setState({ accessToken: accessToken, idToken: idToken });

			this.userHasAuthenticated(true);
//			await this.getCookies(accessToken) ;
		}
		catch(e) {
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

		console.log( "App: "+this.state.isAuthenticated+" "+Date.now() ) ;
		
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