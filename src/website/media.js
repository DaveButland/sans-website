import React from "react";
import { Container, Row, Col, ButtonToolbar, Button, ListGroup, Tab, Modal, InputGroup, FormControl, Image, ProgressBar, Form }  from "react-bootstrap";
//import Gallery from "react-grid-gallery" ;
import Dropzone from "../dropzone/Dropzone" ;
import ImageFile from "./imageFile" ;

function compareFolders(a, b) {
  // Use toUpperCase() to ignore character casing
  const folderNameA = a.folderName.toUpperCase();
  const folderNameB = b.folderName.toUpperCase();

	let comparison = 0;
	
  if (folderNameA > folderNameB) {
    comparison = -1 ;
  } else if (folderNameA < folderNameB) {
    comparison = 1;
  }
  return comparison;
}

class Media extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.fileInputRef = React.createRef();

		this.state = {
			showAddFolder: false,
			showRenameFolder: false, 
			showDeleteFolder: false,
			showDeleteImage: false,
			folders: [],
			images: [],
			files: [],
			refreshImages: true, 
			addFolderName: '',
			renameFolderName: '',
			selectedFolderId: '',
			selectedFolderName: 'Images',
			selectedFolder: null,
			deleteImageId: 0, 
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false		};

    this.handleShowAddFolder = this.handleShowAddFolder.bind(this);
		this.handleCancelAddFolder = this.handleCancelAddFolder.bind(this);
		this.handleActionAddFolder = this.handleActionAddFolder.bind(this);
		
    this.handleShowDeleteFolder = this.handleShowDeleteFolder.bind(this);
    this.handleCancelDeleteFolder = this.handleCancelDeleteFolder.bind(this);
		this.handleActionDeleteFolder = this.handleActionDeleteFolder.bind(this);
		
    this.handleShowRenameFolder = this.handleShowRenameFolder.bind(this);
    this.handleCancelRenameFolder = this.handleCancelRenameFolder.bind(this);
		this.handleActionRenameFolder = this.handleActionRenameFolder.bind(this);
		
    this.handleShowDeleteImage = this.handleShowDeleteImage.bind(this);
    this.handleCancelDeleteImage = this.handleCancelDeleteImage.bind(this);
		this.handleActionDeleteImage = this.handleActionDeleteImage.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleFolderSelect = this.handleFolderSelect.bind(this);

		this.getFolders = this.getFolders.bind(this);
		this.addImage = this.addImage.bind(this);
		this.getImages = this.getImages.bind(this);
		this.deleteImage = this.deleteImage.bind(this);

		this.onFilesAdded = this.onFilesAdded.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this); 
		this.sendRequest = this.sendRequest.bind(this);
		this.renderActions = this.renderActions.bind(this) ;

		this.getFolders() ;
	}
	
	addFolder( name ) {
		var folder = {};
		folder.folderName = name ;
		var json = JSON.stringify(folder);

		var xhr = new XMLHttpRequest();
		xhr.open("POST", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.onerror = function () {
			alert( "Error" ) ;
		}
		xhr.onload = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				// get the folder id and set it as the current folder
				this.getFolders() ;
			} else {
				alert( "Error creating folder") ;
			}
		}.bind(this);
		xhr.send(json);
	}

	getFolders() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.onload = function () {
			var folders = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				if ( folders.length > 0 ) {
					folders.sort( compareFolders ) ;
					this.setState({ folders: folders, selectedFolderId: '#'+folders[0].folderId, selectedFolderName: folders[0].folderName, selectedFolder: folders[0] } );
				} else {
					this.setState({ folders: folders, selectedFolderId: '', selectedFolder: null } );
				}

			} else {
				alert( "Error getting folders") ;
			}
		}.bind(this);
		xhr.send();
	}

	renameFolder = folder => {
		folder.folderName = this.state.renameFolderName ;
		var json = JSON.stringify( folder );
	
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+folder.folderId, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.onload = function () {
//			var folders = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.getFolders() ;
			} else {
				alert( "Error getting folders") ;
			}
		}.bind(this);
		xhr.send(json);
	}

	deleteFolder = folder => {
//		var json = JSON.stringify(folder);

		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+folder.folderId, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.onload = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.getFolders() ;
			} else {
				alert( "Error deleting folder") ;
			}
		}.bind(this);
		xhr.send();
	}

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.addImage(file));
    });
    try {
			await Promise.all(promises);

			//remove files and refresh images
			
      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
	}
	
	addImage = file => {
		return new Promise((resolve, reject) => {

			var image = { folderId: this.state.selectedFolderId.slice(1), name: file.name, type: file.type, size: file.size } ;

			var json = JSON.stringify(image);

			var xhr = new XMLHttpRequest();
			xhr.open( "POST", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/images', true ) ;
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
			xhr.onload = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var signedURL = JSON.parse( xhr.response ).signedURL ;
					this.sendRequest(signedURL, file).then( function( value )
						{ resolve(xhr.response); }
					) ;
				} else {
					alert( "Error creating new image") ;
					reject(xhr.response);
				}
			}.bind(this);
			xhr.send(json);
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

	// call delete image which will also delete the image from the S3 bucket.
	deleteImage() {
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+this.state.selectedFolderId.slice(1)+'/images/'+this.state.deleteImageId, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.onload = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
			  this.setState( { deleteImageId: '', refreshImages: true } );
			} else {
				alert( "Error deleting folder") ;
			}
		}.bind(this);
		xhr.send();
	}

	sendRequest(signedURL, file) {
    return new Promise((resolve, reject) => {
      
			const req = new XMLHttpRequest();
//			const reqsigned = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
			});
			
			// Tempted to use both signed URL and custom authenticator here
			// It is both belt and braces, and unnecessary as you won't be able to get the signed URL without the JWT token
			// but it will demonstrate the security of the platform and mean that we generate unique 
			// also want to use Federated Identity Pools to ensure that only the right people can write files

			req.open("PUT", signedURL );
//			req.setRequestHeader( "Authorization", "Bearer "+this.props.token );
			req.send(file) ;
    });
  }

	handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
	}
	
	handleFolderSelect = key => {
		var folder = this.state.folders.find( function( folder ) {
			return '#'+folder.folderId === key ;
		}) ;

		this.setState({ selectedFolderId: key, selectedFolderName: folder.folderName, selectedFolder: folder, refreshImages: true } ) ;
	}

  handleShowAddFolder() {
    this.setState({ addFolderName: '', showAddFolder: true });
  }

  handleCancelAddFolder() {
    this.setState({ showAddFolder: false });
  }

  handleActionAddFolder() {
		this.addFolder( this.state.addFolderName ) ;

		this.setState({ showAddFolder: false });
  }

  handleShowDeleteFolder() {
    this.setState({ showDeleteFolder: true });
  }

  handleCancelDeleteFolder() {
    this.setState({ showDeleteFolder: false });
  }

	handleActionDeleteFolder() {
		this.deleteFolder( this.state.selectedFolder ) ;

		this.setState({ showDeleteFolder: false });
  }

  handleShowRenameFolder() {
		this.setState( { renameFolderName: this.state.selectedFolderName } ) ;
    this.setState({ showRenameFolder: true });
  }

  handleCancelRenameFolder() {
    this.setState({ showRenameFolder: false });
  }

	handleActionRenameFolder() {
		this.renameFolder( this.state.selectedFolder ) ;

		this.setState({ showRenameFolder: false });
  }

  handleShowDeleteImage = event => {
    this.setState({ deleteImageId: event.target.id, showDeleteImage: true });
  }

  handleCancelDeleteImage() {
    this.setState({ showDeleteImage: false });
  }

	handleActionDeleteImage() {
		this.deleteImage( this.state.deleteImageId ) ;

		this.setState({ showDeleteImage: false });
  }

	renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <ProgressBar progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

	/*
  renderProgress(file) {
		const uploadProgress = this.state.uploadProgress[file.name];
		return (
			<ProgressBar variant="secondary" now={uploadProgress ? uploadProgress.percentage : 0} label={`${uploadProgress ? Math.round(uploadProgress.percentage) : 0}%`} />
		)
	}
  */

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length === 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {

		if ( ( this.state.refreshImages ) && ( this.state.selectedFolder ) ) {
			this.getImages() ;
		}

//		const folders = this.state.folders ;
//		const images = this.state.images ;

		let disabled = true ;
		if ( this.state.folders.length > 0 ) {
			disabled = false ;
		}

    return (
      <div>
			<Container fluid>
					<h3>Media Library</h3>
					<Tab.Container id="folders" 
	        	activeKey={this.state.selectedFolderId}
						onSelect={key => this.handleFolderSelect( key )}
					>
  				<Row>
    				<Col sm={3}>
							<h4>Folders</h4>
							<ButtonToolbar>
								<Button name="Add" onClick={this.handleShowAddFolder} size="sm">Add</Button>
								<Button name="Rename" variant="secondary" onClick={this.handleShowRenameFolder} size="sm" disabled={disabled}>Rename</Button>
								<Button name="Delete" variant="danger" onClick={this.handleShowDeleteFolder} size="sm" disabled={disabled}>Delete</Button>
							</ButtonToolbar>
							<ListGroup>
								{this.state.folders.map( folder => {
									return ( 
										<ListGroup.Item id={folder.folderId} key={folder.folderId} action href={ "#"+folder.folderId }>{folder.folderName}</ListGroup.Item>
									) ;									
								})}
   			   		</ListGroup>
    				</Col>
    				<Col sm={9}>
						<h4>{this.state.selectedFolderName}</h4>
						<Row>
						<div className="Content">
          		<div>
            		<Dropzone
              		onFilesAdded={this.onFilesAdded}
              		disabled={this.state.uploading || this.state.successfullUploaded}
            		/>
          		</div>
						</div>
						</Row>
						<div className="Actions">{this.renderActions()}</div>
            {this.state.files.map(file => {
              return (
								<div>
								<Row key={file.name}>
									<Col>
										<ImageFile file={file}/>
									</Col>
									<Col>
										<Form.Group controlId={file.name}>
											<Form.Label>Title</Form.Label>
											<Form.Control type="text" placeholder="Enter Title" value={this.state.title} onChange={this.handleChange} />
					            <Form.Label>Description</Form.Label>
											<Form.Control type="text" placeholder="Enter Description" value={this.state.description} onChange={this.handleChange} />
											<Button size="sm" disabled>Save</Button>
											<Button size="sm" variant="danger" disabled>Delete</Button>
					          </Form.Group>
									</Col>
								</Row>
								<Row key={'progress'+file.name}>
									<Col>
										{this.renderProgress(file)}
									</Col>
								</Row>
								</div>
              );
						})}
            {this.state.images.map( image => {
              return (
								<Row key={image.imageId}>
									<Col md={4}>
										<Image style={{height:200}} src={'https://'+process.env.REACT_APP_HTML_DOMAIN+'/private/'+image.folderId+'/'+image.imageId} />
									</Col>
									<Col>
										<Form.Group controlId={image.imageId}>
											<Form.Label>Title</Form.Label>
											<Form.Control type="text" placeholder="Enter Title" value={this.state.title} onChange={this.handleChange} />
					            <Form.Label>Description</Form.Label>
											<Form.Control type="text" placeholder="Enter Description" value={this.state.description} onChange={this.handleChange} />
											<Button size="sm" disabled>Save</Button>
											<Button id={image.imageId} size="sm" variant="danger" onClick={this.handleShowDeleteImage}>Delete</Button>
					          </Form.Group>
									</Col>
								</Row>
              );
						})}
			 			<Tab.Content>
								{this.state.folders.map( folder => {
									return ( 
		        				<Tab.Pane key={folder.folderId} eventKey={"#"+folder.id}>
    	 				   		</Tab.Pane>
									) ;
									})}	
    					</Tab.Content>
    				</Col>
 					</Row>
				</Tab.Container>
			</Container>
			        
			<Modal show={this.state.showAddFolder} onHide={this.handleCancelAddFolder}>
				<Modal.Header closeButton>
					<Modal.Title>Create Folder</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
			    	<InputGroup.Prepend>
      				<InputGroup.Text id="folderlabel">Folder Name</InputGroup.Text>
    				</InputGroup.Prepend>
   		 			<FormControl
							id="addFolderName"
      				placeholder="Folder Name"
      				aria-label="FolderName"
							aria-describedby="folderlabel"
							value={this.state.addFolderName}
							onChange={this.handleChange}
    				/>
				  </InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelAddFolder}>Cancel</Button>
					<Button variant="primary" onClick={this.handleActionAddFolder}>Create</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={this.state.showRenameFolder} onHide={this.handleCancelRenameFolder}>
				<Modal.Header closeButton>
					<Modal.Title>Rename Folder</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
			    	<InputGroup.Prepend>
      				<InputGroup.Text id="folderlabel">Folder Name</InputGroup.Text>
    				</InputGroup.Prepend>
   		 			<FormControl
							id="renameFolderName"
      				placeholder="Folder Name"
      				aria-label="FolderName"
							aria-describedby="folderlabel"
							value={this.state.renameFolderName}
							onChange={this.handleChange}
    				/>
				  </InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelRenameFolder}>Cancel</Button>
					<Button variant="primary" onClick={this.handleActionRenameFolder}>Rename</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={this.state.showDeleteFolder} onHide={this.handleCancelDeleteFolder}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Folder</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
			    	<InputGroup.Prepend>
      				<InputGroup.Text id="folderlabel">Folder Name</InputGroup.Text>
    				</InputGroup.Prepend>
   		 			<FormControl
							id="selectedFolderName"
      				placeholder="Folder Name"
      				aria-label="FolderName"
							aria-describedby="folderlabel"
							value={this.state.selectedFolderName}
							disabled
    				/>
				  </InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelDeleteFolder}>Cancel</Button>
					<Button variant="danger" onClick={this.handleActionDeleteFolder}>Delete</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={this.state.showDeleteImage} onHide={this.handleCancelDeleteImage}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Image</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCancelDeleteImage}>Cancel</Button>
					<Button variant="danger" onClick={this.handleActionDeleteImage}>Delete</Button>
				</Modal.Footer>
			</Modal>
      </div>
		) ;
	}
}

export default Media ;