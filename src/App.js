import React, {Fragment} from "react"; //basic react
import { withRouter, Route, Switch } from "react-router-dom" ; //react routing
import ReactGA from "react-ga" ; //google analytics
import AppliedRoute from "./AppliedRoute" ; //Don't need this really?

import Header from './website/header' ;
import SignIn from "./website/signin" ;
import SignUp from "./website/signup" ;
import Media from "./website/media" ;
import Profile from "./website/profile" ;
import Albums from "./website/albums" ;
import Pages from "./website/pages" ;
import Drag from "./website/drag" ;
import Folders from "./website/folders" ;
import FrontPage from "./website/frontpage" ;
import NotFound from "./website/notfound" ;

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

		const hide = !this.state.isAuthenticated ;

		var navStyle = "test-style" ;
		if( this.state.isAuthenticated )
		{
			navStyle = "test-style-nav" ;
		} 

//		console.log( "App: "+this.state.isAuthenticated+" "+Date.now() ) ;
		
		return (
			!( this.state.isAuthenticating ) &&
			<div className={navStyle}>
				{ this.state.isAuthenticated 
        ? <Header security={this.state.security} hide={hide}/>
				: <Fragment></Fragment>
				}
				<Switch>
          <AppliedRoute exact path="/" component={FrontPage} props={childProps}/>
					<AppliedRoute path="/signin" exact component={SignIn} props={childProps}/>
					<AppliedRoute path="/profile" component={Profile} props={childProps}/>
					<AppliedRoute path="/pages" component={Pages} props={childProps}/>
					<AppliedRoute path="/media" component={Media} props={childProps}/>
					<AppliedRoute path="/albums" component={Albums} props={childProps}/>
					<AppliedRoute exact path="/folders" component={Folders} props={childProps}/>
					<AppliedRoute path="/folders/:folderid" component={Folders} props={childProps}/>
					<AppliedRoute path="/frontpage" component={FrontPage} props={childProps}/>
					<Route path="/image" component={Image} />
					<Route path="/drag" component={Drag} />
					<AppliedRoute path="/signup" component={SignUp}  props={childProps}/>
					<Route component={NotFound} />
				</Switch>
			</div>
    );
  }
}

export default withRouter( App );

/*
					<AppliedRoute path="/profile" component={Profile} props={childProps}/>
					<AppliedRoute path="/pages" component={Pages} props={childProps}/>
					<AppliedRoute path="/media" component={Media} props={childProps}/>
					<AppliedRoute path="/albums" component={Albums} props={childProps}/>
					<AppliedRoute path="/folders" component={Folders} props={childProps}/>
					<AppliedRoute path="/frontpage" component={FrontPage} props={childProps}/>
					<Route path="/image" component={Image} />
					<Route path="/drag" component={Drag} />
					<AppliedRoute path="/signup" component={SignUp}  props={childProps}/>
					<Route component={NotFound} />
*/