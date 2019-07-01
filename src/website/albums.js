import React from "react";
import { Container, Row, Col, Tabs, Tab, Image } from "react-bootstrap";
import Gallery from "react-grid-gallery" ;

//const imageURL = "https://4uwwpb6ojf.execute-api.eu-west-2.amazonaws.com/live/getsignedurl" ;
//const domain    = "https://d31ajfwgnb8bq0.cloudfront.net" ;
const domain = '' ;

const	localImages = [ { caption: "Annie Bridge", src: domain+"/private/email_9154.jpg", thumbnail: domain+"/private/email_9154.jpg"}
, { caption: "Annie Door", src: domain+"/private/email_9241.jpg", thumbnail: domain+"/private/email_9241.jpg"}
, { caption: "Annie Bike", src: domain+"/private/email_9346.jpg", thumbnail: domain+"/private/email_9346.jpg" }
, { caption: "White Gate", src: domain+"/private/email_9536.jpg", thumbnail: domain+"/private/email_9536.jpg" }
, { caption: "White Step", src: domain+"/private/email_9597.jpg", thumbnail: domain+"/private/email_9597.jpg" }
, { caption: "White Road", src: domain+"/private/email_9617.jpg", thumbnail: domain+"/private/email_9617.jpg" }
] ;

class Albums extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
			images: localImages
		}

//		this.getImages = this.getImages.bind(this) ;

//		this.getImages() ;
	}

	/*
	async getImages() {
    const promises = [];
    localImages.forEach( image => {
      promises.push(this.addImage(image));
    });
    try {
      await Promise.all(promises);
    } catch (e) {
			console.log( JSON.stringify( e ) ) ;
    }
	}
	
	getImage = imageRef => {
		return new Promise((resolve, reject) => {

//			var json = JSON.stringify(image);
			var xhr = new XMLHttpRequest();
			xhr.open( "GET", imageURL, true ) ;
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
			xhr.onload = function () {
				if (xhr.readyState == 4 && xhr.status == "200") {
					imageRef.src = JSON.parse( xhr.response ).signedURL ;
					resolve(xhr.response);
				} else {
					alert( "Error getting signed url") ;
					reject(xhr.response);
				}
			}.bind(this);
			xhr.send();
		});
	}
*/

  render() {

    return (
			<Container fluid>
				<Tabs defaultActiveKey="Simon-May-2019" id="uncontrolled-tab-example">
  				<Tab eventKey="Simon-May-2019" title="Simon-May-2019">
						<Row>
							<Col sm={2}></Col>
							<Col>
								<Gallery 
									images={localImages}             
									showLightboxThumbnails={true}
								/>
							</Col>
						</Row>
  				</Tab>
  				<Tab eventKey="Jamie-February-2019" title="Jamie-Feburary-2019">
						<Row>
						{localImages.map( image => {
              return (
								<div>
										<Col key={image.caption} md={4}>
											<Image style={{height:200}} src={image.src} />
										</Col>
								</div>
							);
						})}
						</Row>
  				</Tab>
  				<Tab eventKey="Kestrel-May-2019" title="Kestrel-May-2019" >
  				</Tab>
				</Tabs>
			</Container>		
		) ;
	}
}

export default Albums ;