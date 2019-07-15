import React, { Fragment } from "react";
import { Container, Row, Col, ButtonToolbar, Button, ListGroup, Modal, InputGroup, FormControl }  from "react-bootstrap";
import Page from "./page" ;

class Pages extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			selectedPageId: '',
			selectedPage: {},
			addPageName: '',
			selectedPageName: '',
			pages: [],
			showAddPage: false,
			showRenamePage: false,
			showDeletePage: false,
		};

    this.handleShowAddPage = this.handleShowAddPage.bind(this);
		this.handleCancelAddPage = this.handleCancelAddPage.bind(this);
		this.handleActionAddPage = this.handleActionAddPage.bind(this);

    this.handleShowRenamePage = this.handleShowRenamePage.bind(this);
		this.handleCancelRenamePage = this.handleCancelRenamePage.bind(this);
		this.handleActionRenamePage = this.handleActionRenamePage.bind(this);

    this.handleShowDeletePage = this.handleShowDeletePage.bind(this);
		this.handleCancelDeletePage = this.handleCancelDeletePage.bind(this);
		this.handleActionDeletePage = this.handleActionDeletePage.bind(this);

		this.onSelectPage = this.onSelectPage.bind(this) ;
		this.handleChange = this.handleChange.bind(this) ;

		this.getPages = this.getPages.bind(this);
		this.addPage  = this.addPage.bind(this);
		this.updatePage = this.updatePage.bind(this);
		this.deletePage = this.deletePage.bind(this);
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		this.getPages() ;
	}

	componentWillUnmount() {
	}

	getPages() {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			xhr.onload = function () {
				var pages = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.setState( { pages: pages, isLoading: false } ) ;
				} else {
					console.log( "Error getting pages") ;
				}
			}.bind(this) ;

			xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/pages', true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+accessToken.getJwtToken() );
			xhr.send() ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error getting access token", error, error.stack() ) ;
		});
	}

	addPage() {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			var page = { name: this.state.addPageName } ;
			var json = JSON.stringify( page ) ;

			xhr.onload = function () {
				var page = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
					var pages = this.state.pages ;
					pages.push( page ) ;
					this.setState( { selectedPage: page, pages: pages } ) ;
				} else {
					console.log( "Error getting pages") ;
				}
			}.bind(this) ;

			xhr.open("POST", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/pages', true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+accessToken.getJwtToken() );
			xhr.send( json ) ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error getting access token", error, error.stack() ) ;
		});
	}

	updatePage() {
		var page = this.state.selectedPage ;
		delete page['changed'] ;
		page.name = this.state.selectedPageName ;

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

	deletePage() {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			var page = this.state.selectedPage ;

			xhr.onload = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.setState( { selectedPage: {} } ) ;
					// remove page from pages or refresh pages
				} else {
					console.log( "Error getting pages") ;
				}
			}.bind(this) ;

			xhr.open("DELETE", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/pages/'+page.pageId, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+accessToken.getJwtToken() );
			xhr.send() ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error getting access token", error, error.stack() ) ;
		});
	}

	handleShowAddPage() {
		this.setState( { showAddPage: true } ) ;
	}
	
	handleCancelAddPage() {
		this.setState( { showAddPage: false } ) ;
	}
	
	handleActionAddPage() {
		this.addPage() ;
		this.setState( { showAddPage: false } ) ;
	}

	handleShowRenamePage() {
		this.setState( { showRenamePage: true } ) ;
	}
	
	handleCancelRenamePage() {
		this.setState( { showRenamePage: false } ) ;
	}
	
	handleActionRenamePage() {
		this.updatePage() ;
		this.setState( { showRenamePage: false } ) ;
	}

	handleShowDeletePage() {
		this.setState( { showDeletePage: true } ) ;
	}
	
	handleCancelDeletePage() {
		this.setState( { showDeletePage: false } ) ;
	}
	
	handleActionDeletePage() {
		this.deletePage() ;
		this.setState( { showDeletePage: false } ) ;
	}

	handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
	}
	
	onSelectPage = event => {
		const pageId = event.target.hash.slice(1) ;
		var selectedPage = null ;

		this.state.pages.filter( page => {
			if ( page.pageId === pageId ){ selectedPage = page ; return page ; } 
			return null ;
		}) ;

		if ( typeof selectedPage.title === 'undefined' )
		{
			selectedPage.title = '' ;
		}

		if ( typeof selectedPage.content === 'undefined' )
		{
			selectedPage.content = '' ;
		}

		this.setState( { selectedPageId: pageId, selectedPageName: selectedPage.name, selectedPage: selectedPage } ) ;
  }

	renderAddPage() {
		return (
			<Modal show={this.state.showAddPage} onHide={this.handleCancelAddPage}>
				<Modal.Header closeButton>
					<Modal.Title>Create Page</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="pagelabel">Page Name</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id="addPageName"
							placeholder="Page Name"
							aria-label="PageName"
							aria-describedby="pagelabel"
							value={this.state.addPageName}
							onChange={this.handleChange}
							autoFocus
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelAddPage}>Cancel</Button>
					<Button variant="primary" onClick={this.handleActionAddPage}>Create</Button>
				</Modal.Footer>
			</Modal>
		) ;
	}

	renderRenamePage() {
		return (
			<Modal show={this.state.showRenamePage} onHide={this.handleCancelRenamePage}>
				<Modal.Header closeButton>
					<Modal.Title>Rename Page</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="pagelabel">Page Name</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id="selectedPageName"
							placeholder="Page Name"
							aria-label="PageName"
							aria-describedby="pagelabel"
							value={this.state.selectedPageName}
							onChange={this.handleChange}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelRenamePage}>Cancel</Button>
					<Button variant="primary" onClick={this.handleActionRenamePage}>Rename</Button>
				</Modal.Footer>
			</Modal>
		) ;
	}

	renderDeletePage() {
		return (
			<Modal show={this.state.showDeletePage} onHide={this.handleCancelDeletePage}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Page</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="pagelabel">Folder Name</InputGroup.Text>
						</InputGroup.Prepend>
							<FormControl
							id="selectedPageName"
							placeholder="Page Name"
							aria-label="PageName"
							aria-describedby="pagelabel"
							value={this.state.selectedPageName}
							disabled
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelDeletePage}>Cancel</Button>
					<Button variant="danger" onClick={this.handleActionDeletePage}>Delete</Button>
				</Modal.Footer>
			</Modal>
		) ;
	}

  render() {

		var page = this.state.selectedPage ;
		var disabled = !(typeof page !== 'undefined') ;

		return (
      <Fragment>
				<Container fluid>
  				<Row>
    				<Col lg={3}>
							<ButtonToolbar className="mb-2">
								<h4 className="mr-2">Pages</h4>
								<Button className="pull-right mr-2" name="Add" onClick={this.handleShowAddPage} size="sm">Add</Button>
								<Button className="pull-right mr-2" name="Rename" variant="secondary" onClick={this.handleShowRenamePage} size="sm" disabled={disabled}>Rename</Button>
								<Button className="pull-right mr-2" name="Delete" variant="danger" onClick={this.handleShowDeletePage} size="sm" disabled={disabled}>Delete</Button>
							</ButtonToolbar>
							<ListGroup>
								{this.state.pages.map( page => {
									return ( 
										<ListGroup.Item id={page.pageId} key={page.pageId} action href={"#"+page.pageId} onClick={this.onSelectPage}>{page.name}</ListGroup.Item>
									) ;									
								})}
							</ListGroup>
						</Col>
						<Col lg={9}>
							{ disabled 
							? <Fragment></Fragment>
							:	<Page page={page} editable security={this.props.security}/>
							}
						</Col>
					</Row>
				</Container>

				{this.renderAddPage()}
				{this.renderRenamePage()}
				{this.renderDeletePage()}
			</Fragment>
		);
	}
}

export default Pages ;