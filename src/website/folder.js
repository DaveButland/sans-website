import React, { Fragment} from "react";
import { CardColumns, Card, ButtonToolbar, Button} from "react-bootstrap" ;

class Folder extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			folder: {},
			folderId: '',
			images: [],
			files: [],
      height: window.innerHeight, 
			width: window.innerWidth, 
			idealWidth: 206
		}

		this.updateDimensions = this.updateDimensions.bind(this);
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

//		const card = document.getElementsByClassName('cardimage')[0];

//		if ( card ) {
//			console.log( card.height ) ;
//			console.log( card.width ) ;
//		}
  }

	componentDidMount() {
//		console.log( "componentDidMount" ) ;
		window.addEventListener("resize", this.updateDimensions);
		this.getImages() ;
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
									
						{this.state.images.map( image => {
							var border = "" ;
							if ( image.selected ) { border = "primary" } 

							const imageWidth = this.state.imageWidth ;
							const imageHeight = Math.floor( image.height / image.width * this.state.imageWidth ) ;

      	      return (
								<Card id={image.imageId} style={{width:this.state.col}} key={image.imageId} className={"px-1 py-1 mb-3"} bg={border} 
									draggable
//									className="draggable"
								>
									<Card.Img id={image.imageId} className="cardimage" style={{width: imageWidth, height: imageHeight }} onClick={this.onSelectImage} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/"+image.folderId+"/"+image.imageId+'-300'}/>
								</Card>
            	);
						})}
					</CardColumns>
				</div>	
			</Fragment>
		) ;
	}
}

export default Folder ;





