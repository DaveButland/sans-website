import React from "react";
import { Container, Row, Col, Button, ListGroup, Tab, Modal, InputGroup, FormControl, Nav }  from "react-bootstrap";
import { Cookies } from "react-cookie";
import Gallery from "react-grid-gallery" ;
import config from "./config" ;
import { Auth } from "aws-amplify" ;

const folderURL = "https://4uwwpb6ojf.execute-api.eu-west-2.amazonaws.com/live/folders" ;

class Media extends React.Component {

	/*
	setCookie() {
		let d = new Date();
		d.setTime(d.getTime() + (60*60*1000));
	
		let cookie = new Cookies() ;
		cookie.set("CloudFront-Policy", "eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9kM2xnaXU4NnFkY3JrMS5jbG91ZGZyb250Lm5ldC8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjAwMDAwMDAwfX19XX0_",{path: "/", expires: d});
		cookie.set("CloudFront-Key-Pair-Id","APKAJ3CMJOSKSYOQWKHQ", {path: "/", expires: d});
		cookie.set("CloudFront-Signature","f9UVeByCTArDrXJwZlcBBwkhNurf1C1TaCa18n7Z75b51zFc1Ai5ezXRizcd9vcw0y4mh~RnHkym~MV9aoPrtZVHYIVZnEwAafVuTHQtroU20TKW-j5g9t6gNozCpaYGKXLOSrUPBfjRvowIlcTE5UPUaKOn0vnbBFnpHQQrgS81SZtREEDtO0Z-lV5WSdNwaRcbI4Q0lszlfMCv-x1zAxzumjqhkvAWMMRARhlfST-9OZRSeAuj5Lp9NB4j1DzBkw6GL3MbxJLS9gUD6Zm6g4A8GH4PHUvpOkgTQascIL9XgDI53cAySPnYKQ5FFrMQNknM6dLrhABb0loYL4PH5A__", {path: "/", expires: d});
	}
	*/

	render() {

		let d = new Date();
		d.setTime(d.getTime() + (60*60*1000));
	
		let cookie = new Cookies() ;
		cookie.set("CloudFront-Policy", "eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9kM2xnaXU4NnFkY3JrMS5jbG91ZGZyb250Lm5ldC8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjAwMDAwMDAwfX19XX0_",{path: "/", domain:"d3lgiu86qdcrk1.cloudfront.net", expires: d});
		cookie.set("CloudFront-Key-Pair-Id","APKAJ3CMJOSKSYOQWKHQ",{path: "/", domain:"d3lgiu86qdcrk1.cloudfront.net", expires: d});
		cookie.set("CloudFront-Signature","f9UVeByCTArDrXJwZlcBBwkhNurf1C1TaCa18n7Z75b51zFc1Ai5ezXRizcd9vcw0y4mh~RnHkym~MV9aoPrtZVHYIVZnEwAafVuTHQtroU20TKW-j5g9t6gNozCpaYGKXLOSrUPBfjRvowIlcTE5UPUaKOn0vnbBFnpHQQrgS81SZtREEDtO0Z-lV5WSdNwaRcbI4Q0lszlfMCv-x1zAxzumjqhkvAWMMRARhlfST-9OZRSeAuj5Lp9NB4j1DzBkw6GL3MbxJLS9gUD6Zm6g4A8GH4PHUvpOkgTQascIL9XgDI53cAySPnYKQ5FFrMQNknM6dLrhABb0loYL4PH5A__",{path: "/", domain:"d3lgiu86qdcrk1.cloudfront.net", expires: d});

		const folders = [{ title: "Folder 1"}
		,{ title: "Folder 2"}
		,{ title: "Folder 3"}
		,{ title: "Folder 4"}
		,{ title: "Folder 5"}
		,{ title: "Folder 6"}
		,{ title: "Folder 7"}
		,{ title: "Folder 8"}
		,{ title: "Folder 9"}
		,{ title: "Folder 10"}
		,{ title: "Folder 11"}
		,{ title: "Folder 12"}
	] ;
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
				<h3>Media Library</h3>
				<Row>
					<Col sm={2} >
						<Button name="Add">Add Folder</Button>
					</Col>
					<Col>
						<Row>
							<Col>
								<Button name="AddImages" className="pull-right" >Add Images</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<Gallery images={imagesData} showLightboxThumbnails={true} />
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>		
		) ;
	}
}

export default Media;
