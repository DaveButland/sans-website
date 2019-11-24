import React from "react"; //basic react
import { withRouter, Switch } from "react-router-dom" ; //react routing
import ReactGA from "react-ga" ; //google analytics
import AppliedRoute from "./AppliedRoute" ; //Don't need this really?

import Header from './website/header' ;
import SignIn from "./website/signin" ;
//import SignUp from "./website/signup" ;
import Media from "./website/media" ;
import Images from "./website/images" ;
import Profile from "./website/profile" ;
import Content from "./website/content" ;
import Albums from "./website/albums" ;
import Pages from "./website/pages" ;
import Folders from "./website/folders" ;
import Gallery from "./website/gallery" ;
import FrontPage from "./website/frontpage" ;
import Home from "./website/home" ;
import Calendar1 from "./website/calendar1" ;
import Contact from "./website/contact" ;
import Bookings from "./website/bookings" ;
import PortfolioPage from "./website/portfolioPage" ;
import PortfolioAlbum from "./website/portfolioAlbum" ;
import TestHome from "./website/testhome" ;
import FrontPageMenu from "./website/frontpagemenu" ;
//import Test from "./website/Test" ;
//import NotFound from "./website/notfound" ;

import Security from "./website/Security" ;

ReactGA.initialize('UA-143274884-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends React.Component {

	constructor(props, context) {
		super(props, context);
		
		this.state = {
			isAuthenticated: false,
			isAuthenticating: true,
			security: new Security()
		};
	}

	async componentDidMount() {

		var security = new Security() ;
		var session = await security.getSession() ;

		if ( session ) {
			this.setState( { security: security, session: session, accessToken: session.getAccessToken().getJwtToken(), idToken: session.getIdToken().getJwtToken() } ) ;
			this.userHasAuthenticated( true ) ;
		} 

		this.setState( { isAuthenticating: false } ) ;
	}

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	}

	handleLogout = async (event) => {
		this.userHasAuthenticated(false);

		await this.state.security.signOut();
		this.props.history.push( "/" ) ;
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
			!( this.state.isAuthenticating ) &&
			<div>
				{ !this.state.isAuthenticated 
        ? <div className="test-style">
						<Switch>
							<AppliedRoute exact path="/" component={FrontPage} props={childProps}/>
							<AppliedRoute exact path="/signin" component={SignIn} props={childProps}/>
							<AppliedRoute component={FrontPage} props={childProps}/>
						</Switch>
					</div>
				: <div className="test-style-nav">
				  	<FrontPageMenu security={this.state.security} />
						<Switch>
          		<AppliedRoute exact path="/" component={FrontPage} props={childProps}/>
							<AppliedRoute exact path="/signin" component={SignIn} props={childProps}/>
							<AppliedRoute exact path="/home" component={Home} props={childProps}/>
							<AppliedRoute exact path="/gallery" component={Gallery} props={childProps}/>
							<AppliedRoute exact path="/contact" component={Contact} props={childProps}/>
							<AppliedRoute exact path="/booking" component={Bookings} props={childProps}/>
							<AppliedRoute exact path="/calendar" component={Calendar1} props={childProps}/>
							<AppliedRoute exact path="/signin" component={SignIn} props={childProps}/>
							<AppliedRoute exact path="/portfolio" component={PortfolioPage} props={childProps}/>
							<AppliedRoute path="/portfolio/:albumid" component={PortfolioAlbum} props={childProps}/>
							<AppliedRoute path="/profile" component={Profile} props={childProps}/>
							<AppliedRoute path="/pages" component={Pages} props={childProps}/>
							<AppliedRoute path="/media" component={Media} props={childProps}/>
							<AppliedRoute exact path="/folders" component={Folders} props={childProps}/>
							<AppliedRoute path="/folders/:folderid" component={Folders} props={childProps}/>
							<AppliedRoute exact path="/albums" component={Albums} props={childProps}/>
							<AppliedRoute path="/albums/:albumid" component={Albums} props={childProps}/>
							<AppliedRoute path="/images/:imageid" component={Images} props={childProps} />
							<AppliedRoute path="/content" component={Content} props={childProps} />
							<AppliedRoute path="/testhome" component={TestHome} props={childProps} />
 							<AppliedRoute component={FrontPage} props={childProps}/>
						</Switch>
					</div>
				}
			</div>
    );
  }
}

export default withRouter( App );

/*
Signup is disabled for now.
					<AppliedRoute path="/signup" component={SignUp}  props={childProps}/>
*/