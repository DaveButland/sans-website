import React, { Fragment} from "react";
import { Carousel, Button } from "react-bootstrap" ;
import cookie from "react-cookies";
import "./frontpage.css" ;

class FrontPage extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			folderId: 'be4d4ba9-388c-4715-8634-cf5cf40d0f8c',
			images: [],
      height: window.innerHeight, 
			width: window.innerWidth, 
		}

		this.updateDimensions = this.updateDimensions.bind(this);
	}

	getPublicImages = async () => {
		var xhr = new XMLHttpRequest();

		xhr.onerror = function () {
			console.log( "Error getting front page images" ) ;
		}

		xhr.onload = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let response = JSON.parse( xhr.response ) ;

//				this.props.security.getAccessToken().then( function (accessToken ) { console.log( accessToken.getJwtToken() )} ) ;
			
				// check if logged in before setting cookie. Only set these cookies if not logged in

				var key       = response.cookies["CloudFront-Key-Pair-Id"] ;
				var policy    = response.cookies["CloudFront-Policy"] ;
				var signature = response.cookies["CloudFront-Signature"] ;
				var images    = response.images ;

				try {
					cookie.save( "CloudFront-Key-Pair-Id", key ) ;
					cookie.save( "CloudFront-Policy", policy ) ;
					cookie.save( "CloudFront-Signature", signature ) ;
				} catch( err ) { 
					console.log( err ) ;
				}

				this.setState( { images: images } ) ;
			} else {
				console.log( "Error getting front page images " ) ;

				cookie.remove( "CloudFront-Key-Pair-Id" ) ;
				cookie.remove( "CloudFront-Policy" ) ;
				cookie.remove( "CloudFront-Signature" ) ;
			}
		}.bind(this) ;
		
//		this.props.security.getAccessToken().then( function (accessToken ) { 
			
		xhr.open( "GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/images/public?domain='+process.env.REACT_APP_HTML_DOMAIN, true ) ;
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
//		xhr.setRequestHeader('Authorization', 'Bearer '+accessToken ); - not required here
		
		xhr.send();
//		console.log( accessToken.getJwtToken() )} ) ;
	}
	
	getImages = () => {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			xhr.onload = function () {
				var images = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.setState( { images: images } ) ;
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

	updateDimensions() {
		const row = document.getElementsByClassName('measureRow')[0] ;

//		console.log( window.innerWidth, window.innerHeight, row.clientWidth, row.clientHeight ) ;

    this.setState({
      height: window.innerHeight, 
			width: window.innerWidth,
			rowwidth: row.clientWidth
		});
	}

	contextMenu = event => {
		event.preventDefault() ;
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
		window.addEventListener("contextmenu", this.contextMenu);
		this.getPublicImages() ;
		this.updateDimensions() ;
//		document.addEventListener('contextmenu', event => event.preventDefault());
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
		window.removeEventListener("contextmenu", this.contextMenu);
  }

	/*
	static getDerivedStateFromProps(nextProps, prevState){
	}
 
 	componentDidUpdate(prevProps, prevState) {
	}
	*/

	onClick( event ) {
		console.log( 'Clicked' ) ;
	}

	onSelect( event ) {
		console.log( event ) ;
	} 

	onSlideEnd() {
	}

	render() {
//		var imageWidth = this.state.width-20 ;
//		var imageHeight = this.state.height-20 ;
		var imgStyle ;
		const indicators = false ;
		const pauseOnHover = false ;
		const fade = true ;
		const controls = false ;
		const interval = 2000 ;
		var screenSize = this.state.width ;
		if ( this.state.height > this.state.width ) { screenSize = this.state.height } ;
		screenSize = Math.floor( screenSize / 300 + 1 ) * 300 ;
//		console.log( screenSize ) ;

		const nav = this.props.security.loggedIn() ;

		var carouselClass = "" ;
		if ( nav )
		{
			carouselClass= "carousel-nav" ;
		}
//		const interval = null ;
		return(
			<Fragment>
				<div className="measureRow">
				<Carousel 
					className={carouselClass}
					indicators={indicators} 
					fade={fade} 
					controls={controls} 
					interval={interval} 
					pauseOnHover={pauseOnHover}
//					onSelect={this.onSelect}
//					onSlideEnd={this.onSlideEnd}
				>
					{this.state.images.map( image => {
						var imageWidth = image.width ;
						var imageHeight = image.height ;

						var imageCentreX = image.centreX || ( imageWidth / 2 ) ;
						var imageCentreY = image.centreY || ( imageHeight / 2 ) ;

						var imageWidthScaled   = Math.round( imageWidth * this.state.height / imageHeight ) ;
						var imageHeightScaled   = Math.round( imageHeight * this.state.width / imageWidth ) ;
						var imageCentreXScaled = Math.round( imageCentreX * this.state.height / imageHeight ) ;
						var imageCentreYScaled = Math.round( imageCentreY * this.state.width / imageWidth ) ;

 						//If using maximum height then work out width offset otherwise work out height offset
						if ( imageWidth * this.state.height / this.state.width > imageHeight ) {
							var imageWidthOffset = Math.round( imageCentreXScaled -  ( this.state.width / 2 ) ) ;
							if ( imageWidthOffset < 0 ) { imageWidthOffset = 0 } ; 
							if ( imageWidthOffset > imageWidthScaled - this.state.width ) { imageWidthOffset = imageWidthScaled - this.state.width ; }  
							imgStyle = { height: '100vh', left: -imageWidthOffset } ;
						} else {
							var imageHeightOffset = Math.round( imageCentreYScaled -  ( this.state.height / 2 ) ) ;
							if ( imageHeightOffset < 0 ) { imageHeightOffset = 0 } ; 
							if ( imageHeightOffset > imageHeightScaled - this.state.height ) { imageHeightOffset = imageHeightScaled - this.state.height ; }  
							imgStyle = { width: '100vw', top: -imageHeightOffset } ;
						} 
      	    return (
							<Carousel.Item key={image.imageId} >
								{ screenSize > 1800 
								?	(	<img className="fullimage" id={image.imageId} style={imgStyle} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/private/"+image.folderId+"/"+image.imageId} alt={image.name} /> )
								: (	<img className="fullimage" id={image.imageId} style={imgStyle} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/"+image.folderId+"/"+image.imageId+"-"+screenSize} alt={image.name} /> )
								}
							</Carousel.Item>
						)
					})}
				</Carousel>
				<div className="btn-parent">
					<Button variant="outline-light" className="btn-wrap-text" onClick={this.onClick}>
						<span className="name-text">Quyen Le Model</span>
						<span className="soon-text">Coming Soon</span>
					</Button>
				</div>
				</div>
			</Fragment>
		) ;
	}
}

export default FrontPage ;





