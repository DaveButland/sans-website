import React, { Fragment} from "react";
import { FormControl, InputGroup, Button} from "react-bootstrap" ;

//import Auth from "@aws-amplify/auth" ;

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

class Page extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			editable: this.props.editable || false,
			config: {
				toolbar: false,
				readonly: true,
				showCharsCounter: false,
				showWordsCounter: false,
				showXPathInStatusbar: false,
				height: 800				
			}, 
		  page: {}
		}

		if ( this.props.page ) { this.state.page = this.props.page } ;
		if ( !this.state.page.title ) { this.state.page.title = '' } ;


		if ( !this.state.editable )
		{
			this.state.config.preset = "inline" ;
		}
		else
		{
			this.state.config.toolbar = true ;
			this.state.config.readonly = false ;
		}
	}

/**
* @property Jodit jodit instance of native Jodit
*/
jodit;
setRef = jodit => this.jodit = jodit;
 
 	updateContent = (value) => {
		var page = this.state.page ;
		
		//stop changed getting set on page change
		if ( page.content !== value )
		{
			page.content = value ;
			page.changed = true ;
			this.setState({page: page})
		}
	}

	updateTitle = (value) => {
		var page = this.state.page ;

		if ( page.title !== value )
		{
			page.title = value.target.value ;
			page.changed = true ;
			this.setState({page: page})
		}
	}

	saveUpdates = (value) => {

		var page = this.state.page ;
		delete page['changed'] ;

		var json = JSON.stringify( page ) ;

		this.props.security.getAccessToken().then( function( accessToken ) {
//		Auth.currentSession().then( function( session ) {
//		var session = this.props.getSession().then( function() {
//		let accessToken = session.getAccessToken().getJwtToken() ;

		var xhr = new XMLHttpRequest();

		// remove changed flag

		xhr.onerror = function() {
			console.log( "Error saving page" ) ;
		} ;

		xhr.onload = function () {
			var page = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				page.changed = false ;
				this.setState( { page: page } ) ;
			} else {
				console.log( "Error saving page") ;
			}
		}.bind(this) ;

		xhr.open("PUT", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/pages/'+page.pageId, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+accessToken.getJwtToken() );
		xhr.send(json) ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error saving page", error, error.stack() ) ;
			// not authenticated
		});
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}
	
	static getDerivedStateFromProps(nextProps, prevState){

//		var updated = {} ;

		if(nextProps.page!==prevState.page){
			return { page: nextProps.page };
		}
	 	else return null;

	}
 
 componentDidUpdate(prevProps, prevState) {

	if(prevProps.page!==this.props.page){
		//Perform some operation here
		 this.setState({page: this.props.page });
//		 this.classMethod();
	 }

	}  
 
 render() {
		return(
			<Fragment>
				{this.state.editable
          ? <InputGroup className="mb-2">
							<FormControl
								placeholder="Page Title"
								aria-label="Page's Title"
								aria-describedby="basic-addon2"
								value={this.state.page.title}
								onChange={this.updateTitle}
							/>
							<InputGroup.Append>
								<Button variant={this.state.page.changed ? "primary" : "secondary" } onClick={this.saveUpdates} disabled={!this.state.page.changed}>Save</Button>
							</InputGroup.Append>
						</InputGroup>
          : <InputGroup className="mb-2">
							<h4>{this.state.page.title||'No Title'}</h4>
						</InputGroup>
					}
				<JoditEditor 
    	    editorRef={this.setRef}
					config={this.state.config} 
					value={this.state.page.content} 
          onChange={this.updateContent}
				/>
			</Fragment>
		) ;
	}
}

export default Page ;




