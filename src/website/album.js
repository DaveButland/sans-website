import React, { Fragment} from "react";
import { CardColumns, Card } from "react-bootstrap";

class Album extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			images: []
		}
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		this.getFolders() ;
	}

	componentWillUnmount() {
	}

	getAlbum = () => {
		var xhr = new XMLHttpRequest();
		
		xhr.onload = function () {
			var album = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState( { album: album, isLoading: false } ) ;
			} else {
				alert( "Error getting images") ;
			}
		}.bind(this);
		
		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+this.state.folderId+'/images', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.send();
	}
		
	render() {
		return(
			<Fragment> 
				<h4>{this.state.album.title}</h4>
				<CardColumns
					onDragOver={this.onDragOver}
					onDragLeave={this.onDragLeave}
					onDrop={this.onDrop}
					style={{ cursor: this.props.disabled ? "default" : "pointer" }}
				>
      		{this.props.images.map( image => {
						var border = "" ;
						return (
							<Card id={image.imageId} key={image.imageId} className={"px-1 py-1 mb-3"} bg={border} 
//									draggable
//										onDragStart = {(e) => this.onDragStart(e, image.imageId )}
							>
								<Card.Img key={image.imageid} id={image.imageid} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/"+this.props.album+"/"+image.imageId+'-300' } alt="image.name" />
							</Card>
						);
					})}
				</CardColumns>
			</Fragment>
		) ;
	}
}

export default Album ;