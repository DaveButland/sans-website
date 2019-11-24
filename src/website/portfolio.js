import React, { Fragment } from "react";
import { Row, Col, Card } from 'react-bootstrap' ;
import { LinkContainer } from 'react-router-bootstrap' ;

class Portfolio extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			albums: []
		}
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		this.getAlbums() ;
	}

	componentWillUnmount() {
	}

	getAlbums = () => {
		var xhr = new XMLHttpRequest();
		
		xhr.onload = function () {
			var albums = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState( { albums: albums, isLoading: false } ) ;
			} else {
				alert( "Error getting images") ;
			}
		}.bind(this);
		
		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/albums', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.send();
	}

	render() {
    return (
      <Fragment>
				<h1 id="portfolio" align="center">Portfolio</h1>
				<Row>
						{this.state.albums.map( album => {
							var imgClass = "portfolioImage"
							if ( album.private ) {
								return ( <Fragment key={album.albumid}></Fragment> )
							} else {
								return (
									<Col lg={3} key={album.albumid} className={"px-1 py-1"} >
										<Card className="card-yellow" style={{height:300+'px'}}>
											<div style={{overflow:'hidden', cursor:'pointer'}}>
											<LinkContainer to={"/portfolio/"+album.albumid}>
												<Card.Img className={imgClass} style={{width:100+'%', height:'auto'}} src={"https://quyen-le-model.com/thumbnail/"+album.cover.folder+"/"+album.cover.image+"-300"}/>
											</LinkContainer>
											</div>
											<Card.Footer className="portfolioName">
												{album.title}
											</Card.Footer>
										</Card>
									</Col>
								);
							}
						})}
				</Row>
			</Fragment>
		);
	}
		
}

export default Portfolio ;