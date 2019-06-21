import React from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import Gallery from "react-grid-gallery" ;

class Albums extends React.Component {

  render() {
		const	imagesData = [ { caption: "Annie Bridge", src: "/private/email_9154.jpg", thumbnail:"/private/email_9154.jpg"}
									 , { caption: "Annie Door", src: "/private/email_9241.jpg", thumbnail: "/private/email_9241.jpg"}
							 		 , { caption: "Annie Bike", src: "/private/email_9346.jpg", thumbnail: "/private/email_9346.jpg" }
		               , { caption: "White Gate", src: "/private/email_9536.jpg", thumbnail: "/private/email_9536.jpg" }
		               , { caption: "White Step", src: "/private/email_9597.jpg", thumbnail: "/private/email_9597.jpg" }
									 , { caption: "White Road", src: "/private/email_9617.jpg", thumbnail: "/private/email_9617.jpg" }
									 , { caption: "Black", src: "/private/edMarkFiddianImg0895x.jpg", thumbnail: "/private/edMarkFiddianImg0895x.jpg" }
									 , { caption: "White", src: "/private/edMarkFiddianImg1054x.jpg", thumbnail: "/private/edMarkFiddianImg1054x.jpg" }
									 , { caption: "Asian", src: "/private/edMarkFiddianImg1460x.jpg", thumbnail: "/private/edMarkFiddianImg1460x.jpg" }
									 , { caption: "Kimono", src: "/private/edMarkFiddianImg1477x4.jpg", thumbnail: "/private/edMarkFiddianImg1477x4.jpg" }
//									 , { caption: "Chain Colour", src: "/private/Quyen_001.jpg", thumbnail: "/private/Quyen_001.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_001a.jpg", thumbnail: "/private/Quyen_001a.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_002.jpg", thumbnail: "/private/Quyen_002.jpg" }
//									 , { caption: "Hill", src: "/private/Quyen_003.jpg", thumbnail: "/private/Quyen_003.jpg" }
//									 , { caption: "Autumn", src: "/private/Quyen_004.jpg", thumbnail: "/private/Quyen_004.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_005.jpg", thumbnail: "/private/Quyen_005.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_006.jpg", thumbnail: "/private/Quyen_006.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_007.jpg", thumbnail: "/private/Quyen_007.jpg" }
									 , { caption: "Chain B&W", src: "/private/Quyen_008.jpg", thumbnail: "/private/Quyen_008.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_009.jpg", thumbnail: "/private/Quyen_009.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_010.jpg", thumbnail: "/private/Quyen_010.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_007.jpg", thumbnail: "/private/Quyen_007.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_011.jpg", thumbnail: "/private/Quyen_011.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_012.jpg", thumbnail: "/private/Quyen_012.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_013.jpg", thumbnail: "/private/Quyen_013.jpg" }
									 , { caption: "Chain B&W", src: "/private/Quyen_014.jpg", thumbnail: "/private/Quyen_014.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_015.jpg", thumbnail: "/private/Quyen_015.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_017.jpg", thumbnail: "/private/Quyen_017.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_018a.jpg", thumbnail: "/private/Quyen_018a.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_018b.jpg", thumbnail: "/private/Quyen_018b.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_019.jpg", thumbnail: "/private/Quyen_019.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_020.jpg", thumbnail: "/private/Quyen_020.jpg" }
//									 , { caption: "Chain B&W", src: "/private/Quyen_021.jpg", thumbnail: "/private/Quyen_021.jpg" }
									 ] ;

    return (
			<Container fluid>
				<Tabs defaultActiveKey="Simon-May-2019" id="uncontrolled-tab-example">
  				<Tab eventKey="Simon-May-2019" title="Simon-May-2019">
						<Row>
							<Col sm={2}></Col>
							<Col>
								<Gallery 
									images={imagesData}             
									showLightboxThumbnails={true}
								/>
							</Col>
						</Row>
  				</Tab>
  				<Tab eventKey="Jamie-February-2019" title="Jamie-Feburary-2019">
  				</Tab>
  				<Tab eventKey="Kestrel-May-2019" title="Kestrel-May-2019" >
  				</Tab>
				</Tabs>
			</Container>		
		) ;
	}
}

export default Albums ;