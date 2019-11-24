import React from "react";
import { Container, CardColumns, Card, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import "./albums.css"

class Albums extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			updated: false,
			albumid: null, 
			albums: []
		}

		this.onImageSelect = this.onImageSelect.bind(this) ;
		this.onBack = this.onBack.bind(this);
	}

	componentDidMount = () => {
		this.setState({ isLoading: true });

		this.getAlbums() ;
	}

	componentWillUnmount = () => {
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {

//		console.log( 'Devived State' ) ;

		if ( nextProps.match.params.albumid !== prevState.albumid ) {
			return ( { albumid: nextProps.match.params.albumid } ) ;
		} else {
			return null ;
		}
	}
		 
	componentDidUpdate(prevProps, prevState) {
	
//		console.log( 'Did Update' ) ;

		if ( prevState.albumid !== this.props.match.params.albumid ) 
		{
			var album = this.state.albums.filter( album => album.albumid === this.props.match.params.albumid ) ;

			this.setState( { albumid: this.props.albumid, album: album[0] } )
		}
	}  
		 
	getAlbums = () => {
		var xhr = new XMLHttpRequest();

		xhr.onerrror = function( error ) {
			console.log( "Error getting albums", error ) ;
		}

		xhr.onload = function () {
			var albums = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				var album = albums.filter( album => album.albumid === this.props.match.params.albumid ) ; // in case someone hits the url directly
				this.setState( { albums: albums, album: album[0], isLoading: false  } ) ;
			} else {
				console.log( "Error getting albums") ;
			}
		}.bind(this) ;

		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/albums', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.send() ;
	} 

	updateAlbum = ( album ) => {

		var json = JSON.stringify( album ) ;

		this.props.security.getAccessToken().then( function( accessToken ) {

			var xhr = new XMLHttpRequest();

			xhr.onerror = function() {
				console.log( "Error updating album" ) ;
			} ;

			xhr.onload = function () {
//				var album = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
//					this.setState( { page: page } ) ;
				} else {
					console.log( "Error saving page") ;
				}
			} ; //.bind(this) ;

			xhr.open("PUT", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/albums/'+album.albumid, true ) ;
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+accessToken.getJwtToken() );
			xhr.send(json) ;
		}).catch ( function (error ) {
			console.log( "Error updating album", error ) ;
		});
	}

	deleteAlbum = ( album ) => {

		var json = JSON.stringify( album ) ;

		this.props.security.getAccessToken().then( function( accessToken ) {

			var xhr = new XMLHttpRequest();

			xhr.onerror = function() {
				console.log( "Error deleting album" ) ;
			} ;

			xhr.onload = function () {
//				var album = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
//					this.setState( { page: page } ) ;
				} else {
					console.log( "Error deleting album") ;
				}
			} ; //.bind(this) ;

			xhr.open("DELETE", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/albums/'+album.albumid, true ) ;
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+accessToken.getJwtToken() );
			xhr.send(json) ;
		}).catch ( function (error ) {
			console.log( "Error deleting album", error ) ;
		});
	}
	
	onBack = event => {
		event.preventDefault() ;

		this.props.history.goBack() ;
	}

	onSave = event => {
		event.preventDefault() ;

		this.updateAlbum( this.state.album ) ;
	}

	onDelete = event => {
		event.preventDefault() ;

//		this.deleteAlbum( this.state.album ) ;

//		albums = this.state.albums ;
//		albums.splice( album.albumid, 1 ) ;
	}

	onAlbumSelect = ( eventKey, event ) => {

	}

	onImageSelect = ( eventKey, event ) => {
		
		var album = this.state.album ;

		if ( eventKey === 'cover' ) {
			album.cover.folder = album.images[event.target.id].folder ;
			album.cover.image  = album.images[event.target.id].image ;
		} else if ( eventKey === 'remove' ) {
			album.images.splice( event.target.id, 1 ) ;
		}

		this.setState( { album: album } ) ;
	}

	handleChange = event => {

		var album = this.state.album ;

		album[event.target.id] = event.target.value ;

    this.setState( { album: album } ) ;		
	}

	handleChecked= event => {
		var album = this.state.album ;

		album[event.target.id] = event.target.checked ;

    this.setState( { album: album } ) ;		
	}

	handleImageClick = event => {
		if ( event.target.id === "overlay" )
		{
			this.props.history.push('/images/'+event.target.parentNode.id) ;
		}
	}

	handleAlbumClick = event => {
		if ( event.target.id === "overlay" )
		{
			this.props.history.push('/albums/'+event.target.parentNode.id) ;
		}
	}

  render() {

		var album = this.state.album ;

		return( 
			( this.state.albums.length === 0 )
			? <Container></Container>
			: ( !album )
			?	<Container>
					<Row>
						<Col>
							<h4 className="mt-3 mr-2">Albums</h4>
						</Col>
					</Row>
					<Row>
					{ this.state.albums.map( ( album, index ) => {
						return (
						<Col lg={3} key={album.albumid} className={"px-1 py-1"} >
							<Card draggable className="text-center img-container" id={album.albumid} key={album.albumid} style={{height:250+'px'}} >
								<div style={{overflow:'hidden'}} id={album.albumid} >
									<Card.Img className="img-image" key={album.albumid} style={{width:100+'%', height:'auto'}} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/"+album.cover.folder+"/"+album.cover.image+'-300' } alt="album.title" />
									<Card.ImgOverlay className="img-overlay" id="overlay" onClick={this.handleAlbumClick}>
										<Dropdown onSelect={this.onAlbumSelect} alignRight>
											<Dropdown.Toggle className="float-right" variant="outline-secondary" size="sm" id="dropdown-basic">
												Options
 									 		</Dropdown.Toggle>

	 										<Dropdown.Menu>
    										<Dropdown.Item id={index} eventKey="delete">Delete</Dropdown.Item>
 										 </Dropdown.Menu>
										</Dropdown>
										<h3 className="img-title">{album.title}</h3>
									</Card.ImgOverlay>
								</div>
							</Card>
						</Col>
					) ;
					})}
				</Row>
				</Container>
 			: <Container className="p-3">
					<Row>
					<Col>
					<Form>
						<Form.Group>
							<Form.Control type="text" placeholder="title" id='title' value={album.title} onChange={this.handleChange} />
						</Form.Group>
						<Form.Group>
							<Form.Control as="textarea" placeholder="Description" id='description' value={album.description} onChange={this.handleChange} />
						</Form.Group>
						<Form.Group>
							<Form.Check type='checkbox' inline id='private' label='private' onChange={this.handleChecked} checked={album.private}/>
							<Button className="float-right" variant="success" onClick={this.onBack} size="sm">Back</Button>
							<Button className="float-right mr-2" variant="primary" onClick={this.onSave} size="sm">Save</Button>
						</Form.Group>
						<Form.Group>
						</Form.Group>
					</Form>
					<CardColumns>
						{ album.images.map( ( image, index ) => {
							var selected = false ;
							var imgClass = "img-container" ;
							if ( ( image.folder === album.cover.folder ) && ( image.image === album.cover.image ) ) {
								imgClass = "img-container img-selected" ;
								selected = true ;
							}
							return (
								<Card className={imgClass} id={image.image} key={image.image}>
									<Card.Img className="img-image" key={image.image} id={image.image} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/"+image.folder+"/"+image.image+'-300' } alt="image.name" />
									<Card.ImgOverlay className="img-overlay" id='overlay' onClick={this.handleImageClick}>
									  { !selected &&
										<Dropdown onSelect={this.onImageSelect} alignRight>
											<Dropdown.Toggle className="float-right" variant="outline-secondary" size="sm" id="dropdown-basic">
												Options
 									 		</Dropdown.Toggle>

	 										<Dropdown.Menu>
											 	<Dropdown.Item id={index} eventKey="cover" disabled={selected}>Set as Cover</Dropdown.Item>
    										<Dropdown.Item id={index} eventKey="remove" disabled={selected}>Remove from Album</Dropdown.Item>
 										 </Dropdown.Menu>
										</Dropdown>
										}
									</Card.ImgOverlay>
								</Card>
							) ;
						})}
					</CardColumns>
					</Col>
				</Row>
				</Container>
		) ;
	}

}

export default Albums ;