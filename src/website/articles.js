import React from "react";
import { Container, Row, Col, Button, ListGroup, Tab, Modal, InputGroup, FormControl, Nav }  from "react-bootstrap";
import Gallery from "react-grid-gallery" ;

const folderURL = "https://4uwwpb6ojf.execute-api.eu-west-2.amazonaws.com/live/folders" ;

class Articles extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
			show: false,
			folders: null 
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.getFolders() ;
  }

	createFolder( name ) {
		var folder = {};
		folder.name = name ;
		var json = JSON.stringify(folder);

		var xhr = new XMLHttpRequest();
		xhr.open("POST", folderURL, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'token');
		xhr.onload = function () {
			var folders = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === "201") {
				this.setState({ folders: folders } );
			} else {
				alert( "Error creating folder") ;
			}
		}
		xhr.send(json);
	}

	getFolders() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", folderURL, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'token');
		xhr.onload = function () {
			var folders = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === "201") {
				this.setState({ folders: folders } );
			} else {
				alert( "Error creating folder") ;
			}
		}
		xhr.send();
	}

	deleteFolder() {
		//TODO
	}

	renameFoler() {
		//TODO
	}

	handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCancel() {
    this.setState({ show: false });
  }

  handleCreate() {
		this.setState({ show: false });
		
		this.createFolder( this.folderName ) ;
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {

		const	imagesNic = [ { caption: "Annie Bridge", src: "/private/email_9154.jpg", thumbnail:"/private/email_9154.jpg", thumbnailWidth: 200, thumbnailHeight: 200 }
									 		, { caption: "Annie Door", src: "/private/email_9241.jpg", thumbnail: "/private/email_9241.jpg", thumbnailWidth: 200, thumbnailHeight: 200}
							 		 		, { caption: "Annie Bike", src: "/private/email_9346.jpg", thumbnail: "/private/email_9346.jpg", thumbnailWidth: 200, thumbnailHeight: 200 }
		               		, { caption: "White Gate", src: "/private/email_9536.jpg", thumbnail: "/private/email_9536.jpg", thumbnailWidth: 200, thumbnailHeight: 200 }
		               		, { caption: "White Step", src: "/private/email_9597.jpg", thumbnail: "/private/email_9597.jpg", thumbnailWidth: 200, thumbnailHeight: 200 }
									 		, { caption: "White Road", src: "/private/email_9617.jpg", thumbnail: "/private/email_9617.jpg", thumbnailWidth: 200, thumbnailHeight: 200 } 
											] ;

		const	imagesMark = [ { caption: "Black", src: "/private/edMarkFiddianImg0895x.jpg", thumbnail: "/private/edMarkFiddianImg0895x.jpg", thumbnailWidth: 200, thumbnailHeight: 200 }
									 		 , { caption: "White", src: "/private/edMarkFiddianImg1054x.jpg", thumbnail: "/private/edMarkFiddianImg1054x.jpg", thumbnailWidth: 200, thumbnailHeight: 200 }
									 	 	 , { caption: "Asian", src: "/private/edMarkFiddianImg1460x.jpg", thumbnail: "/private/edMarkFiddianImg1460x.jpg", thumbnailWidth: 200, thumbnailHeight: 200 }
									 		 , { caption: "Kimono", src: "/private/edMarkFiddianImg1477x4.jpg", thumbnail: "/private/edMarkFiddianImg1477x4.jpg", thumbnailWidth: 200, thumbnailHeight: 200 }
											 ] ;

//		const folders = [ { id: "01230472", name: "2019-06-June Mark"}, { id: "3655234", name: "2019-06-June Nic" } ]
		const folders = [{ id: "01230472", name: "2019-06-June Mark", images: imagesMark }, { id: "3655234", name: "2019-06-June Nic", images: imagesNic }] ;

    return (
      <div>
			<Container fluid>
					<h3>Media Library</h3>
					<Tab.Container id="list-group-tabs-example" defaultActiveKey={"#"+folders[0].id}>
  				<Row>
    				<Col sm={2}>
						<Button name="AddFolder" className="pull-right" onClick={this.handleShow}>Add Folder</Button>
							<ListGroup>
								{folders.map( folder => {
									return ( 
										<ListGroup.Item action href={ "#" + folder.id}>{folder.name}</ListGroup.Item>
									) ;									
								})}
   			   		</ListGroup>
    				</Col>
    				<Col sm={8}>
						<Nav>
						<Button name="AddImages" className="pull-right" >Add Images</Button>
						</Nav>
			 			<Tab.Content>
								{folders.map( folder => {
									return ( 
		        				<Tab.Pane eventKey={"#"+folder.id}>
											<Gallery images={folder.images} showLightboxThumbnails={true} />
    	 				   		</Tab.Pane>
									) ;
									})}	
    					</Tab.Content>
    				</Col>
 					</Row>
				</Tab.Container>
			</Container>
			        
			<Modal show={this.state.show} onHide={this.handleCancel}>
				<Modal.Header closeButton>
					<Modal.Title>Create Folder</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
			    	<InputGroup.Prepend>
      				<InputGroup.Text id="folderlabel">Folder Name</InputGroup.Text>
    				</InputGroup.Prepend>
   		 			<FormControl
      				placeholder="Folder Name"
      				aria-label="FolderName"
							aria-describedby="folderlabel"
							onChange={this.handleChange}
    				/>
				  </InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancel}>Cancel</Button>
					<Button variant="primary" onClick={this.handleCreate}>Create</Button>
				</Modal.Footer>
			</Modal>
      </div>
		) ;
	}
}

export default Articles ;