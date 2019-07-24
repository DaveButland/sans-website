import React, { Fragment} from "react";
import { CardColumns, Card } from "react-bootstrap";

class Album extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			selectedAlbumId: '',
			albums: [],
			images: [],
			disabled: false
		}
	}

  render() {
		return(
			<Fragment> 
				<h4>Title</h4>
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