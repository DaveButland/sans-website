import React, { Fragment } from "react";
import { Container, Row, Col, ButtonToolbar, Button, ListGroup, Modal, InputGroup, FormControl }  from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap" ;
import Folder from "./folder" ;

class Folders extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			selectedFolderId: props.match.params.folderid || '',
			selectedFolder: {},
			addFolderName: '',
			selectedFolderName: '',
			folders: [],
			showAddFolder: false,
			showRenameFolder: false,
			showDeleteFolder: false,
		};

//		console.log( props.match.params.folderid ) ;

    this.handleShowAddFolder = this.handleShowAddFolder.bind(this);
		this.handleCancelAddFolder = this.handleCancelAddFolder.bind(this);
		this.handleActionAddFolder = this.handleActionAddFolder.bind(this);

    this.handleShowRenameFolder = this.handleShowRenameFolder.bind(this);
		this.handleCancelRenameFolder = this.handleCancelRenameFolder.bind(this);
		this.handleActionRenameFolder = this.handleActionRenameFolder.bind(this);

    this.handleShowDeleteFolder = this.handleShowDeleteFolder.bind(this);
		this.handleCancelDeleteFolder = this.handleCancelDeleteFolder.bind(this);
		this.handleActionDeleteFolder = this.handleActionDeleteFolder.bind(this);

		this.onSelectFolder = this.onSelectFolder.bind(this) ;
		this.handleChange = this.handleChange.bind(this) ;

		this.getFolder = this.getFolders.bind(this);
		this.addFolder  = this.addFolder.bind(this);
		this.updateFolder = this.updateFolder.bind(this);
		this.deleteFolder = this.deleteFolder.bind(this);
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		this.getFolders() ;
	}

	componentWillUnmount() {
	}

	getFolders() {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			xhr.onerrror = function( error ) {
				console.log( "Error getting folders", error, error ) ;
			}

			xhr.onload = function () {
				var folders = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.setState( { folders: folders, isLoading: false } ) ;
				} else {
					console.log( "Error getting folders" ) ;
				}
			}.bind(this) ;

			xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders', true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send() ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error getting access token", error ) ;
		});
	}

	addFolder() {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			var folder = { folderName: this.state.addFolderName } ;
			var json = JSON.stringify( folder ) ;

			xhr.onerror = function( error ) {
				console.log( "Error getting folders", error ) ;
			}

			xhr.onload = function () {
				var folder = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
					var folders = this.state.folders ;
					folders.push( folder ) ;
					this.setState( { selectedFolder: folder, pages: folders } ) ;
				} else {
					console.log( "Error getting folders") ;
				}
			}.bind(this) ;

			xhr.open("POST", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/pages', true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send( json ) ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error getting access token", error ) ;
		});
	}

	updateFolder() {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			var folder = this.state.selectedFolder ;
			folder.name = this.state.selectedFolderName ;
			var json = JSON.stringify( folder ) ;
	
			xhr.onerror = function() {
				console.log( "Error saving folder" ) ;
			} ;

			xhr.onload = function () {
//				var folder = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
//					this.setState( { folder: folder } ) ;
				} else {
					console.log( "Error saving page") ;
				}
			} ;

			xhr.open("PUT", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+folder.folderId, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send(json) ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error saving folder", error ) ;
		});
	}

	deleteFolder() {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			var folder = this.state.selectedFolder ;

			xhr.onerror = function() {
				console.log( "Error deleting folder" ) ;
			}

			xhr.onload = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.setState( { selectedPage: {} } ) ;
					// remove page from pages or refresh pages
				} else {
					console.log( "Error getting pages") ;
				}
			}.bind(this) ;

			xhr.open("DELETE", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+folder.folderId, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send() ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error getting access token", error ) ;
		});
	}

	handleShowAddFolder() {
		this.setState( { showAddFolder: true } ) ;
	}
	
	handleCancelAddFolder() {
		this.setState( { showAddFolder: false } ) ;
	}
	
	handleActionAddFolder() {
		this.addFolder() ;
		this.setState( { showAddFolder: false } ) ;
	}

	handleShowRenameFolder() {
		this.setState( { showRenameFolder: true } ) ;
	}
	
	handleCancelRenameFolder() {
		this.setState( { showRenameFolder: false } ) ;
	}
	
	handleActionRenameFolder() {
		this.updateFolder() ;
		this.setState( { showRenameFolder: false } ) ;
	}

	handleShowDeleteFolder() {
		this.setState( { showDeleteFolder: true } ) ;
	}
	
	handleCancelDeleteFolder() {
		this.setState( { showDeleteFolder: false } ) ;
	}
	
	handleActionDeleteFolder() {
		this.deleteFolder() ;
		this.setState( { showDeleteFolder: false } ) ;
	}

	handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
	}
	
	onSelectFolder = event => {
		const folderId = event.target.hash.slice(1) ;
		var selectedFolder = null ;

		this.state.folders.filter( folder => {
			if ( folder.folderId === folderId ){ selectedFolder = folder ; return folder ; } 
			return null ;
		}) ;

		this.setState( { selectedFolderId: folderId, selectedFolderName: selectedFolder.name, selectedFolder: selectedFolder } ) ;
  }

	renderAddFolder() {
		return (
			<Modal show={this.state.showAddFolder} onHide={this.handleCancelAddFolder}>
				<Modal.Header closeButton>
					<Modal.Title>Create Folder</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="folderlabel">Folder Name</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id="addFolderName"
							placeholder="Folder Name"
							aria-label="FolderName"
							aria-describedby="folderlabel"
							value={this.state.addFolderName}
							onChange={this.handleChange}
							autoFocus
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelAddFolder}>Cancel</Button>
					<Button variant="primary" onClick={this.handleActionAddFolder}>Create</Button>
				</Modal.Footer>
			</Modal>
		) ;
	}

	renderRenameFolder() {
		return (
			<Modal show={this.state.showRenameFolder} onHide={this.handleCancelRenameFolder}>
				<Modal.Header closeButton>
					<Modal.Title>Rename Folder</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="folderlabel">Page Name</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id="selectedFolderName"
							placeholder="Folder Name"
							aria-label="folderName"
							aria-describedby="folderlabel"
							value={this.state.selectedFolderName}
							onChange={this.handleChange}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelRenameFolder}>Cancel</Button>
					<Button variant="primary" onClick={this.handleActionRenameFolder}>Rename</Button>
				</Modal.Footer>
			</Modal>
		) ;
	}

	renderDeleteFolder() {
		return (
			<Modal show={this.state.showDeleteFolder} onHide={this.handleCancelDeleteFolder}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Folder</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="folderlabel">Folder Name</InputGroup.Text>
						</InputGroup.Prepend>
							<FormControl
							id="selectedFolderName"
							placeholder="Folder Name"
							aria-label="FolderName"
							aria-describedby="folderlabel"
							value={this.state.selectedFolderName}
							disabled
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelDeleteFolder}>Cancel</Button>
					<Button variant="danger" onClick={this.handleActionDeleteFolder}>Delete</Button>
				</Modal.Footer>
			</Modal>
		) ;
	}

  render() {

//		var folder = this.state.selectedFolder ;
//		var folderId = this.state.selectedFolderId ;
		var folderId = this.props.match.params.folderid ;
		var disabled = !(typeof this.props.match.params.folderid !== 'undefined') ;

		return (
      <Fragment>
				<Container fluid>
					<h3>Media Library</h3>
  				<Row>
    				<Col lg={3}>
							<ButtonToolbar className="mb-2">
								<h4 className="mr-2">Folders</h4>
								<Button className="mr-2" size="sm" variant="primary" name="Add" onClick={this.handleShowAddFolder}>Add</Button>
								<Button className="mr-2" size="sm" name="Rename" variant="secondary" onClick={this.handleShowRenameFolder} disabled={disabled}>Rename</Button>
								<Button className="mr-2" size="sm" name="Delete" variant="danger" onClick={this.handleShowDeleteFolder} disabled={disabled}>Delete</Button>
							</ButtonToolbar>
							<ListGroup>
								{this.state.folders.map( folder => {
									return ( 
										<LinkContainer key={folder.folderId} to={`/folders/${folder.folderId}`}>
											<ListGroup.Item id={folder.folderId} key={folder.folderId} action >
												{folder.folderName}
											</ListGroup.Item>
										</LinkContainer>
									) ;									
								})}
							</ListGroup>
						</Col>
						<Col lg={9}>
							{ disabled 
							?	<Fragment></Fragment>
							:	<Folder folderId={folderId} editable security={this.props.security}/>
							}
						</Col>
					</Row>
				</Container>

				{this.renderAddFolder()}
				{this.renderRenameFolder()}
				{this.renderDeleteFolder()}
			</Fragment>
		);
	}
}

export default Folders ;