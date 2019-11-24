import React from "react";
import { Container, CardColumns, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap' ;

import Sidebar from './sidebar' ;

class PortfolioAlbum extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			albums: [],
		}
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		this.getAlbums() ;
	}
	
	getAlbums() {
		var xhr = new XMLHttpRequest();

		xhr.onerrror = function( error ) {
			console.log( "Error getting albums", error ) ;
		}

		xhr.onload = function () {
			var albums = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState( { albums: albums, isLoading: false } ) ;
			} else {
				console.log( "Error getting albums") ;
			}
		}.bind(this) ;

		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/albums', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.send() ;
	} 

  render() {

		var album = this.state.albums.filter( album => album.albumid === this.props.match.params.albumid ) ;

		return( 
			( album.length > 0 ) && 
			<Container fluid>
				<Row>
					<Col className="sidebar">
						<Sidebar />
					</Col>
					<Col>
					<h4>{album[0].title}</h4>
					<CardColumns>
						{ album[0].images.map( image => {
							return (
								<Card id={image.image} key={image.image} className={"px-1 py-1 mb-3"} >
									<LinkContainer to={"/images/"+image.image}>
										<Card.Img key={image.image} id={image.image} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/"+image.folder+"/"+image.image+'-300' } alt="image.name" />
									</LinkContainer>
								</Card>
							) ;
						})}
					</CardColumns>
					</Col>
					<Col className="sidebar">
					</Col>
				</Row>
			</Container>
		) ;
	}

}

export default PortfolioAlbum ;