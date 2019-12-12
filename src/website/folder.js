import React, { Fragment} from "react";
import { withRouter } from "react-router-dom" ;
import { Modal, Form, InputGroup, CardColumns, Card, ButtonToolbar, Button, Dropdown } from "react-bootstrap" ;

class Folder extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			folder: {},
			folderId: '',
			images: [],
			files: [],
			albums: [],
			newAlbumTitle: '',
			showAddToAlbum: false,
			selectedAlbumIndex: -2, 
      height: window.innerHeight, 
			width: window.innerWidth, 
			idealWidth: 206
		}

		this.updateDimensions = this.updateDimensions.bind(this);

		this.handleShowAddToAlbum = this.handleShowAddToAlbum.bind(this);
		this.handleCancelAddToAlbum = this.handleCancelAddToAlbum.bind(this);
		this.handleShowAddToNewAlbum = this.handleShowAddToNewAlbum.bind(this);
		this.handleCancelAddToNewAlbum = this.handleCancelAddToNewAlbum.bind(this);
//		this.handleActionAddToAlbum = this.handleActionAddToAlbum.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	getAlbums = () => {
		var xhr = new XMLHttpRequest();

		xhr.onerrror = function( error ) {
			console.log( "Error getting albums", error ) ;
		}

		xhr.onload = function () {
			var albums = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState( { albums: albums, isLoading: false  } ) ;
			} else {
				console.log( "Error getting albums") ;
			}
		}.bind(this) ;

		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/albums', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.send() ;
	}

	createAlbum = ( album ) => {

		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();
		
			var json = JSON.stringify( album ) ;
		
			xhr.onerror = function( error ) {
				console.log( "Error creating album " + error ) ;
			}
		
			xhr.onload = function () {
				var album = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
					var albums = this.state.albums ;
					albums.push( album ) ;
					this.setState( { albums: albums } ) ;
				} else {
					console.log( "Error creating image" ) ;
				}
			}.bind(this);
		
			xhr.open("POST", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/albums', true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send(json);
		
		}.bind(this)).catch( function ( error ) {
			console.log( "Error updating image " + error ) ;
		}) ;
	}
		
	updateAlbum = ( album ) => {

		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();
		
			var json = JSON.stringify( album ) ;
		
			xhr.onerror = function( error ) {
				console.log( "Error updating album " + error ) ;
			}
		
			xhr.onload = function () {
//				var album = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
//					console.log( album ) ;
				} else {
					console.log( "Error updating image" ) ;
				}
			}; //.bind(this);
		
			xhr.open("PUT", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/albums/'+album.albumid, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send(json);
		
		}).catch( function ( error ) {
			console.log( "Error updating image " + error ) ;
		}) ;
	}
		
	getImages = () => {
//		console.log( "getImages" ) ;
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			xhr.onload = function () {
				var images = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
//					console.log( "Got images" ) ;
					this.getImageData( images ) ;
//					console.log( "Setting state for images" ) ;
//					this.setState( { images: images } ) ;
				} else {
					alert( "Error getting images") ;
				}
			}.bind(this);

			xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+this.state.folderId+'/images', true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send();

		}.bind(this)).catch( function ( error ) {
			console.log( "Error getting images from folder " + error ) ;
		}) ;
	}

	updateImage = ( image ) => {
//		console.log( "updateImage" + JSON.stringify(image) ) ;

		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			var json = JSON.stringify( image ) ;

			xhr.onerror = function( error ) {
				console.log( "Error updating image " + error ) ;
			}

			xhr.onload = function () {
				var image = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
					console.log( image ) ;
				} else {
					console.log( "Error updating image" ) ;
//					alert( "Error updating image") ;
				}
			}; //.bind(this);

			xhr.open("PUT", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/images/'+image.imageId, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send(json);

		}).catch( function ( error ) {
			console.log( "Error updating image " + error ) ;
		}) ;
	}

	getImageData = async ( images ) => {
//		console.log( "getImageData" + JSON.stringify(images) ) ;

		const promises = [];
		images.forEach( image => {
			if ( !image.width )
			{
				promises.push( this.getImageDimensions( image ) ) ;
			}
		});
		
		try {
			await Promise.all(promises);
	
			this.setState({ images: images });
		} catch (e) {
		}
	}

	/*
	getImageData = async ( images ) => {
		console.log( "Adding all Image dimensions" ) ;
		images.map( image => {
			this.getImageDimensions( image ) ;
		}) ;
		console.log( "Added all Image dimensions" ) ;
	}
  */

	getImageDimensions = async ( image ) => {
//		console.log( "getImageDimensions" + JSON.stringify(image) ) ;
		return new Promise((resolve, reject) => {
			var img = new Image() ;

			console.log( "Getting image dimensions " + image.imageId ) ;

			img.onerror = function( error ) {
				reject( error ) ;
			}

			img.onload = function() {
				image.height = img.height ;
				image.width  = img.width ;

				this.updateImage( image ) ;

				resolve( image ) ;
			}.bind(this) ;

			img.src = 'https://'+process.env.REACT_APP_HTML_DOMAIN+'/thumbnail/'+image.folderId+'/'+image.imageId+'-300' ;
		}) ;
	}

	updateDimensions() {
		const row = document.getElementsByClassName('measureRow')[0] ;
		var  cols = Math.floor( row.clientWidth / this.state.idealWidth ) ;
		if ( cols > 4 ) { cols = 4 ; }
		var col  = Math.floor( row.clientWidth / cols ) ;
		const image = col - 26 ;

//		console.log( row.clientWidth, cols, col, image ) ;

//		console.log( row ) ;
//		console.log( col ) ;
//		console.log( "row width " + row.clientWidth ) ;
//		console.log( "col width (4) " + col.clientWidth ) ;
//		console.log( "image width (4) " + image ) ; 
//		console.log( "image width (row) " + ( ( row.clientWidth / 4 ) - 34 ) ) ;

    this.setState({
      height: window.innerHeight, 
			width: window.innerWidth,
			ratio: image/this.state.idealWidth,
			colWidth: col, 
			imageWidth: image
		});
  }

	onImageSelect = ( eventKey, event ) => {
		
		var image = this.state.images[event.target.id] ;

		if ( eventKey === 'album' ) {
			this.setState( { image: image, showAddToAlbum: true })
		} else if ( eventKey === 'delete' ) {
			console.log( 'Delete ' + image.imageId ) ;
		}
	}

	componentDidMount() {
//		console.log( "componentDidMount" ) ;
		window.addEventListener("resize", this.updateDimensions);
		this.getImages() ;
		this.getAlbums() ;
		window.dispatchEvent(new Event('resize'));
	}

	componentWillUnmount() {
//		console.log( "componentWillUnmount" ) ;
    window.removeEventListener("resize", this.updateDimensions);
  }

	static getDerivedStateFromProps(nextProps, prevState){
//		console.log( "getDerivedStateFromProps" ) ;

		if(nextProps.folderId!==prevState.folderId){
			return { folderId: nextProps.folderId };
		}
	 	else return null;

	}
 
 componentDidUpdate(prevProps, prevState) {
//		console.log( "componentDidUpdate" ) ;
//		console.log( "prev : " + JSON.stringify( prevProps ) ) ;
//		console.log( "now  : " + JSON.stringify( prevState ) ) ;

		if(prevProps.folderId!==this.props.folderId){
			this.setState({folderId: this.props.folderId }); // can we rely on this? Should we pass folder to get images?
		 	this.getImages() ; 
		 	this.updateDimensions() ;
		} 
	}

	handleShowAddToAlbum() {
		this.setState( { showAddToAlbum: true } ) ;
	}
	
	handleCancelAddToAlbum() {
		this.setState( { showAddToAlbum: false } ) ;
	}
	

	handleShowAddToNewAlbum() {
		this.setState( { showAddToNewAlbum: true } ) ;
	}
	
	handleCancelAddToNewAlbum() {
		this.setState( { showAddToNewAlbum: false } ) ;
	}

	handleSubmitAddAlbum = event => {
		event.preventDefault() ;

		var album = this.state.selectedAlbum ;
		var image = { image: this.state.image.imageId, folder: this.state.image.folderId } ;

		album.images.push( image ) ;

		this.updateAlbum( album ) ;

		this.setState( { showAddToAlbum: false } ) ;
	}

	handleSubmitAddNewAlbum = event => {
		event.preventDefault() ;

		var image = { image: this.state.image.imageId, folder: this.state.image.folderId } ;
		var album = { title: this.state.newAlbumTitle, cover: image, images: [image], private: true } ;

		this.createAlbum( album ) ;

		this.setState( { showAddToNewAlbum: false } ) ;
	}

	handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
	}

	handleSelectChange = event => {
		var index = event.target.options[event.target.options.selectedIndex].value ;
		if ( index === "-2" ) {
				this.setState( { selectedAlbumIndex: -1, selectedAlbum: null }) ;
		} else if ( index === "-1" ) {
			this.setState( { showAddToAlbum: false, showAddToNewAlbum: true } ) ;
		} else {
			this.setState( { selectedAlbumIndex: index, selectedAlbum: this.state.albums[index] }) ;
		}
	}

	handleImageClick = event => {
		if ( event.target.id === "overlay" )
		{
			this.props.history.push('/images/'+event.target.parentNode.id) ;
		}
	}
	
	renderAddToAlbum() {
		var disable = ( this.state.selectedAlbumIndex === -2 ) ;
		return (
			<Modal show={this.state.showAddToAlbum} onHide={this.handleCancelAddToAlbum}>
			<Form onSubmit={this.handleSubmitAddAlbum}>
				<Modal.Header closeButton>
					<Modal.Title>Add to Album</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="albumlabel">Album Name</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control id="test" required value={this.state.selectedAlbumIndex} as="select" onChange={this.handleSelectChange}>
							<option hidden key={-2} value={-2}>select album ...</option>
							<option key={-1} value={-1}>New Album</option>
							{ this.state.albums.map( ( album, index ) => {
								return ( <option key={index} value={index}>{album.title}</option> ) ;
							})}
				    </Form.Control>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelAddToAlbum}>Cancel</Button>
					<Button variant="primary" type="submit" disabled={disable}>Add</Button>
				</Modal.Footer>
				</Form>
			</Modal>
		) ;
	}
 
	renderAddToNewAlbum() {
		var disable = this.state.newAlbumTitle === '' ;
		return (
			<Modal show={this.state.showAddToNewAlbum} onHide={this.handleCancelAddToNewAlbum}>
			<Form onSubmit={this.handleSubmitAddNewAlbum}>
				<Modal.Header closeButton>
					<Modal.Title>Add to Album</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="albumlabel">Album Name</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control id="newAlbumTitle" required placeholder="Enter New Album Name" value={this.state.newAlbumTitle} onChange={this.handleChange}>
				    </Form.Control>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelAddToNewAlbum}>Cancel</Button>
					<Button variant="primary" type="submit" disabled={disable}>Create</Button>
				</Modal.Footer>
				</Form>
			</Modal>
		) ;
	}
 
	render() {
//		console.log( "render" ) ;

		return(
			<Fragment>
				<div className="measureRow"></div>
				{this.state.editable
				? <ButtonToolbar className="mb-2" >
						<h4 className="mr-2">{this.state.folder.folderName}</h4>
						<Button variant="primary" className="mr-2" size="sm" disabled={this.state.uploading}>Add</Button>
						<Button variant="danger" className="mr-2" size="sm" disabled={this.state.selectedImages === 0} onClick={this.handleShowDeleteImage}>Delete</Button>
						<Button variant="secondary" className="mr-2" size="sm" disabled={this.state.files.length === 0||this.state.uploading} onClick={this.uploadFiles}>Upload</Button>
					</ButtonToolbar>
				: <h4 className="mr-2">{this.state.folder.folderName}</h4>
				}
				<div
					className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
					onDragOver={this.onDragOver}
					onDragLeave={this.onDragLeave}
					onDrop={this.onDrop}
					style={{ cursor: this.props.disabled ? "default" : "pointer" }}
//							onFilesAdded={this.onFilesAdded}
					disabled={this.state.uploading}
				>					
					
					<CardColumns>
						{this.state.files.map( file => {
  	          return (
								<Card id={file.id} key={file.id} className={"px-1 py-1 mb-3"} >
									<Card.Img id={file.id} src={URL.createObjectURL(file)} alt="Card Image"/>
									<Card.ImgOverlay>
										{this.renderProgress(file)}
									</Card.ImgOverlay>
								</Card>
            	);
						})}
									
						{this.state.images.map( ( image, index ) => {
							var border = "" ;
							if ( image.selected ) { border = "primary" } 

							const imageWidth = this.state.imageWidth ;
							const imageHeight = Math.floor( image.height / image.width * this.state.imageWidth ) ;

      	      return (
								<Card id={image.imageId} style={{width:this.state.col}} key={image.imageId} className="img-container" bg={border} 
									draggable
//									className="draggable"
								>
									<Card.Img className="img-image" id={image.imageId} style={{width: imageWidth, height: imageHeight }} onClick={this.onSelectImage} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/private/"+image.folderId+"/"+image.imageId}/>
									<Card.ImgOverlay className="img-overlay" id="overlay" onClick={this.handleImageClick}>
										<Dropdown onSelect={this.onImageSelect} alignRight>
											<Dropdown.Toggle className="float-right" variant="outline-secondary" size="sm" id="dropdown-basic">
												Options
 									 		</Dropdown.Toggle>

	 										<Dropdown.Menu>
												<Dropdown.Item id={index} eventKey="album">Add to Album</Dropdown.Item>
    										<Dropdown.Item id={index} eventKey="delete">Delete</Dropdown.Item>
 										 </Dropdown.Menu>
										</Dropdown>
									</Card.ImgOverlay>
								</Card>
            	);
						})}
					</CardColumns>
				</div>

				{this.renderAddToAlbum()}
				{this.renderAddToNewAlbum()}

			</Fragment>
		) ;
	}
}

export default withRouter(Folder) ;





