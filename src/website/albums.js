import React from "react";
import { Container, Row, Col, ListGroup, ButtonToolbar, Button } from "react-bootstrap";
import Album from "./album" ;

class Albums extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			selectedAlbumId: "62040a6c-5bb7-47a0-bd2e-5637bfba1e96",
			albums: [],
			images: [],
			disabled: false
		}
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		this.getAlbums() ;
	}
	
	onSelectAlbum = event => {
		const albumId = event.target.hash.slice(1) ;

		this.getImages( albumId ) ;
  }

	getAlbums() {
		var xhr = new XMLHttpRequest();

		xhr.onload = function () {
			var albums = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState( { albums: albums, isLoading: false } ) ;
			} else {
				console.log( "Error getting albums") ;
			}
		}.bind(this) ;

		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.send() ;
	}

	getImages = albumid => {
	//	this.setState( { isLoading: true } ) ;
		var xhr = new XMLHttpRequest();

		xhr.onload = function () {
			var images = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState( { selectedAlbumId: albumid, images: images, isLoading: false } ) ;
			} else {
				console.log( "Error getting images") ;
			}
		}.bind(this) ;

		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+albumid+'/images', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.send() ;
	}

  render() {
		const { disabled } = this.state;

//    if (isLoading) {
//			return( <div></div> ) ;
//		}
//		else
//		{
			return( 
				<Container fluid>
  				<Row>
    				<Col sm={3}>
							<h4>Albums</h4>
							<ButtonToolbar className="mb-2">
								<Button className="mr-2" name="Add" onClick={this.handleShowAddFolder} size="sm">Add</Button>
								<Button className="mr-2" name="Rename" variant="secondary" onClick={this.handleShowRenameFolder} size="sm" disabled={disabled}>Rename</Button>
								<Button  className="mr-2" name="Delete" variant="danger" onClick={this.handleShowDeleteFolder} size="sm" disabled={disabled}>Delete</Button>
							</ButtonToolbar>
							<ListGroup>
								{this.state.albums.map( album => {
									return ( 
										<ListGroup.Item id={album.folderId} key={album.folderId} action href={"#"+album.folderId} onClick={this.onSelectAlbum}>{album.folderName}</ListGroup.Item>
									) ;									
								})}
   			   		</ListGroup>
    				</Col>
    				<Col sm={9}>
							<Album album={this.state.selectedAlbumId} images={this.state.images} />
						</Col>
					</Row>
				</Container>
			) ;
//		}
	}
}

export default Albums ;