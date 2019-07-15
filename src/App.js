import React from "react"; //basic react
import { withRouter, Route, Switch } from "react-router-dom" ; //react routing
import ReactGA from "react-ga" ; //google analytics
import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap" ; //react-bootstrap
import { LinkContainer } from "react-router-bootstrap";

import AppliedRoute from "./AppliedRoute" ; //Don't need this really?

import SignIn from "./website/signin" ;
import SignUp from "./website/signup" ;
import Home from "./website/home" ;
import Media from "./website/media" ;
import Profile from "./website/profile" ;
import Albums from "./website/albums" ;
import Pages from "./website/pages" ;
import NotFound from "./website/notfound" ;
import Drag from "./website/drag" ;

import Security from "./website/Security" ;

ReactGA.initialize('UA-143274884-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends React.Component {

	constructor(props, context) {
		super(props, context);
		
		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};
	}

	async componentDidMount() {

		var security = new Security() ;
		var session = await security.getSession() ;

//		var session = await Security.getSession() ;
			
		if ( session ) {
			this.setState( { security: security, session: session, accessToken: session.getAccessToken().getJwtToken(), idToken: session.getIdToken().getJwtToken() } ) ;
			this.userHasAuthenticated( true ) ;
		} 

		this.setState( { isAuthenticating: false } ) ;
	}

	/*
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
				alert( 'Get Session ' + e );
			}
		}
	
		this.setState({ isAuthenticating: false });
	}
	*/

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	}

	handleLogout = async (event) => {
		this.userHasAuthenticated(false);

		await this.state.security.signOut();
		this.props.history.push( "/signin" ) ;
	}

 	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated,
			accessToken: this.state.accessToken,
			idToken: this.state.idToken,
			session: this.state.session,
			security: this.state.security
		};

//		console.log( "App: "+this.state.isAuthenticated+" "+Date.now() ) ;
		
		return (
			!this.state.isAuthenticating &&
      <Container fluid>
        <Navbar variant="light" bg="light" expand="lg" fixed="top">
					<LinkContainer to="/">
  	        <Navbar.Brand href="/">Sans Website</Navbar.Brand>
					</LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
							<NavDropdown title="My Portfolio" id="portfolio">
								<LinkContainer to="/profile">
				        	<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/pages">
        					<NavDropdown.Item>Pages</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/media">
        					<NavDropdown.Item>Media</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/albums">
       				 		<NavDropdown.Item>Albums</NavDropdown.Item>
								</LinkContainer>
				      </NavDropdown>
							<NavDropdown title="Tests" id="test">
							</NavDropdown>
            </Nav>
            <Form inline>
              <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
        	    <Button variant="outline-success" size="sm">Search</Button>
            </Form>
						{this.state.isAuthenticated
           	 	? <Button variant="default" onClick={this.handleLogout}>Signout</Button>
            	: <LinkContainer to="/signin"><Nav.Link>Signin</Nav.Link></LinkContainer>
	         	 	}
    	  	</Navbar.Collapse>
        </Navbar>
			
				<Switch>
          <Route exact path="/" component={Home} />
					<Route path="/profile" component={Profile} />
					<AppliedRoute path="/pages" component={Pages} props={childProps}/>
					<AppliedRoute path="/media" component={Media} props={childProps}/>
					<AppliedRoute path="/albums" component={Albums} props={childProps}/>
					<Route path="/image" component={Image} />
					<Route path="/drag" component={Drag} />
					<AppliedRoute path="/signin" exact component={SignIn} props={childProps}/>
					<AppliedRoute path="/signup" component={SignUp}  props={childProps}/>
					<Route component={NotFound} />
				</Switch>
			</Container>
 
    );
  }
}

export default withRouter( App );