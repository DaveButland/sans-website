import React from "react";
import { Container, CardColumns, Card } from "react-bootstrap";

class Albums extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			selectedFolderId: "#62040a6c-5bb7-47a0-bd2e-5637bfba1e96",
			images: []
		}

		this.getImages = this.getImages.bind(this) ;

		this.getImages() ;
	}

	onDragStart = (ev, id) => {
			console.log('dragstart:',id);
			ev.dataTransfer.setData("id", id);
	}

	onDragOver = (ev) => {
			ev.preventDefault();
	}

	onDrop = (ev, cat) => {
		 let id = ev.dataTransfer.getData("id");
		 
		 let images = this.state.images.filter((image) => {
				 if (image.imageId == id) {
						 image.category = cat;
				 }
				 return image;
		 });

		 this.setState({
				 ...this.state,
				 images
		 });
	}

	getImages() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+this.state.selectedFolderId.slice(1)+'/images', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.onload = function () {
			var images = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.setState( { images: images, refreshImages: false } ) ;
			} else {
				alert( "Error getting images") ;
			}
		}.bind(this);
		xhr.send();
	}


  render() {

    return (
			<Container>
				<div
//					className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
//					onDragOver={this.onDragOver}
//					onDragLeave={this.onDragLeave}
//					onDrop={this.onDrop}
//					style={{ cursor: this.props.disabled ? "default" : "pointer" }}
				>					
						<CardColumns>
            	{this.state.images.map( image => {
             		return (
									<Card key={image.imageId}
                    onDragStart = {(e) => this.onDragStart(e, image.imageId)}
										draggable
									>
										<Card.Img src={"/private/"+image.folderId+"/"+image.imageId+".jpeg"} alt="Card Image"
										    onDragStart = {(e) => this.onDragStart(e, image.imageId)}
												draggable
										/>
									</Card>
             		);
							})}
						</CardColumns>
				</div>
			</Container>		
		) ;
	}
}

export default Albums ;