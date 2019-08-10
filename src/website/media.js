import React from "react";
import { Container, Row, Col, ButtonToolbar, Button, ListGroup, Tab, Modal, InputGroup, FormControl, Card, CardColumns, ProgressBar }  from "react-bootstrap";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar" ;
import "./media.css";
import EXIF from "exif-js" ;

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
			successfullUploaded: false,	
			hightlight: false,
			selectedImages: 0,
			isLoading: true 
		};

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
//		this.handleDeleteImages = this.handleDeleteImages.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleFolderSelect = this.handleFolderSelect.bind(this);

		this.getFolders = this.getFolders.bind(this);
		this.addImage = this.addImage.bind(this);
		this.getImages = this.getImages.bind(this);
		this.deleteImage = this.deleteImage.bind(this);

		this.onFilesAdded = this.onFilesAdded.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this); 
		this.uploadFilesNow = this.uploadFilesNow.bind(this);
		this.sendRequest = this.sendRequest.bind(this);
		this.renderActions = this.renderActions.bind(this) ;

    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
		
		this.onSelectImage = this.onSelectImage.bind(this);

		this.fileInputRef = React.createRef();

		this.openFileDialog = this.openFileDialog.bind(this);
		this.onFilesAddedButton = this.onFilesAddedButton.bind(this) ;

		this.getFolders() ;
	}
	
	openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onDragOver(evt) {
    evt.preventDefault();

    if (this.state.uploading) return;

    this.setState({ hightlight: true });
  }

  onDragLeave() {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
		event.preventDefault();
		
		if (this.state.uploading) return;

		const files = event.dataTransfer.files;
	
		var array = this.fileListToArray(files);

		/*
		var enhancedArray = array.map( file => {
			this.getImageDimensions( file, function( newFile ) {
				return newFile ;
			}) ;
		}) ;
		*/
		
		this.onFilesAdded( array ) ;
//		this.uploadFilesNow( array ) ;

		this.setState({ hightlight: false });
	}

	getExif( files ) {
		files.map( file => {
 
	
    	var fr = new FileReader() ; // to read file contents

			fr.onload = function(ev) {
						var exif = EXIF.readFromBinaryFile( ev.target.result ) ;
//						console.log( exif ) ;
	//				var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
						file.exif = exif ;
						return file ;
			};

			fr.readAsArrayBuffer(file);

			return file ;
//    	fr.readAsBinaryString(file); // read the file
		});
	}

	getFileData( files ) 
	{
		files.map( file => {
			this.getFileDimensions( file ) ;
			return file ;
		});
	}

	getFileDimensions( file, callback ) 
	{
		var img = new Image() ;

		img.onload = function() {
			file.height = img.height ;
			file.width  = img.width ;

//			console.log( file ) ;
//			callback( file ) ;
		}

		img.src = URL.createObjectURL( file ) ;
	}

	getImageData( images )
	{
		images.map( image => {
			this.getImageDimensions( image ) ;
			return image ;
		}) ;
	}

	getImageDimensions( image ) 
	{
		var img = new Image() ;

		img.onload = function() {
			image.height = img.height ;
			image.width  = img.width ;

//			console.log( image ) ;
		}

		img.src = 'https://'+process.env.REACT_APP_HTML_DOMAIN+'/thumbnail/'+image.folderId+'/'+image.imageId+'-300' ;
	}

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
	}

	/*
  onFilesAdded(evt) {
    const files = evt.target.files;

		if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
	}
	*/

  onFilesAddedButton(evt) {
    const files = evt.target.files;

		const array = this.fileListToArray(files);
    this.onFilesAdded(array);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
		}));
		this.getFileData( files );
		this.getExif( files ) ;
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

	async uploadFilesNow ( files ) {
	this.setState({ uploadProgress: {}, uploading: true });
	const promises = [];
	files.forEach(file => {
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

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.addImage(file));
    });
		
		try {
			await Promise.all(promises);

			//remove files and refresh images
			this.getImages() ;
			
      this.setState({ successfullUploaded: true, uploading: false, refreshImages: true, files: [] });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false, refreshImages: true, files: [] });
    }
	}
	
	addImage = file => {
		return new Promise((resolve, reject) => {

			var image = { folderId: this.state.selectedFolderId.slice(1), name: file.name, type: file.type, size: file.size, height: file.height, width: file.width } ;

			var json = JSON.stringify(image);

			var xhr = new XMLHttpRequest();
			xhr.open( "POST", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/images', true ) ;
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
			xhr.onload = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var result = JSON.parse( xhr.response ) ;
					var signedURL = result.signedURL ;
					image   = result.image ;
					this.sendRequest(signedURL, file).then( function( value ) { 
	//					this.updateImage( image ).then( function( value ){
							resolve(xhr.response); 
					}) ;
//				}.bind(this)) ;
				} else {
					alert( "Error creating new image") ;
					reject(xhr.response);
				}
			}.bind(this);
			xhr.send(json);
		});
	}

	updateImage( image ) {
    return new Promise((resolve, reject) => {
			
			var xhr = new XMLHttpRequest();
			var json = JSON.stringify( image ) ;

			xhr.open("PUT", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/images/'+image.imageId, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );

			xhr.onload = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					resolve( xhr.response ) ;		
				} else {
					reject( xhr.response ) ;
				}
			} 

			xhr.send(json);
		});
	}

	getImages() {
		var xhr = new XMLHttpRequest();

		xhr.onload = function () {
			var images = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.getImageData( images ) ;
				this.setState( { images: images, refreshImages: false, selectedImages: 0, isLoading: true } ) ;
			} else {
				alert( "Error getting images") ;
			}
		}.bind(this);

		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+this.state.selectedFolderId.slice(1)+'/images', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );

		xhr.send();
	}

	// call delete image which will also delete the image from the S3 bucket.
	deleteImage( image ) {
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/folders/'+image.folderId+'/images/'+image.imageId, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.setRequestHeader('Authorization', 'Bearer '+this.props.accessToken );
		xhr.onload = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
			  this.setState( { deleteImageId: '', refreshImages: true } );
			} else {
				alert( "Error deleting image") ;
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
		this.setState( { files: [] } ) ;
		var folder = this.state.folders.find( function( folder ) {
			return '#'+folder.folderId === key ;
		}) ;

		this.setState({ selectedFolderId: key, selectedFolderName: folder.folderName, selectedFolder: folder, refreshImages: true } ) ;
		this.getImages() ;
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

		this.state.images.map( image => {
			if ( image.selected === true )
			{
				console.log( "deleting " + image.imageId ) ;
				this.deleteImage( image ) ;
			}
			return image ;
		}) ;
	
		this.setState({ showDeleteImage: false });
	}

	onSelectImage = event => {
		var selectedImages = this.state.selectedImages ;

		var image = this.state.images.find( function( image ) {
			return image.imageId === event.target.id ;
		}) ;

		image.selected = !image.selected ;

		if ( image.selected ) {
			selectedImages++ ;
		} else {
			selectedImages-- ;
		}
		
		this.setState( { selectedImages: selectedImages } ) ;
	}
	
	/*
	onSelectAllCardsClick() {
    cards.SelectCards();
	}

  onSelectAllCardsOnPageClick() {
    cards.SelectAllCardsOnPage();
	}

	onClearSelectionClick() {
    cards.UnselectCards();
	}

	onUpdateSelection(s, e) {
    btnSelectAllCards.SetEnabled(s.GetSelectedCardCount() < s.cpVisibleRowCount);
    btnClearSelection.SetEnabled(s.GetSelectedCardCount() > 0);
    btnSelectAllCardsOnPage.SetEnabled(s.GetSelectedKeysOnPage().length < s.GetVisibleCardsOnPage());
    $("#info4").html("Total cards selected: " + s.GetSelectedCardCount());
	}
	*/

	/*
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
	*/
	
	async componentDidMount() {
		try {		
			this.setState({ isLoading: false });
		} catch ( e ) {
			console.log( e ) ;
		}
	}

  renderProgress(file) {
		const uploadProgress = this.state.uploadProgress[file.name];
		return (
			<ProgressBar variant="secondary" now={uploadProgress ? uploadProgress.percentage : 0} label={`${uploadProgress ? Math.round(uploadProgress.percentage) : 0}%`} />
		)
	}

	renderProgressCircle(file) {
		const uploadProgress = this.state.uploadProgress[file.name];
		return (
			<CircularProgressBar strokeWidth="10" sqSize="200" percentage={uploadProgress ? uploadProgress.percentage : 0}/>
		) ;
	}

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

//		const folders = this.state.folders ;
//		const images = this.state.images ;

		let disabled = true ;
		if ( this.state.folders.length > 0 ) {
			disabled = false ;
		}

		return (
//			!this.state.isLoading &&
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
							<ButtonToolbar className="mb-2">
								<Button className="mr-2" name="Add" onClick={this.handleShowAddFolder} size="sm">Add</Button>
								<Button className="mr-2" name="Rename" variant="secondary" onClick={this.handleShowRenameFolder} size="sm" disabled={disabled}>Rename</Button>
								<Button  className="mr-2" name="Delete" variant="danger" onClick={this.handleShowDeleteFolder} size="sm" disabled={disabled}>Delete</Button>
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
						<ButtonToolbar className="mb-2" >
							<Button variant="primary" className="mr-2" size="sm" disabled={this.state.uploading} onClick={this.openFileDialog}>Add</Button>
							<Button variant="danger" className="mr-2" size="sm" disabled={this.state.selectedImages === 0} onClick={this.handleShowDeleteImage}>Delete</Button>
							<Button variant="secondary" className="mr-2" size="sm" disabled={this.state.files.length === 0||this.state.uploading} onClick={this.uploadFiles}>Upload</Button>
						</ButtonToolbar>
						<div
						  className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
							onDragOver={this.onDragOver}
							onDragLeave={this.onDragLeave}
							onDrop={this.onDrop}
							style={{ cursor: this.props.disabled ? "default" : "pointer" }}
//							onFilesAdded={this.onFilesAdded}
							disabled={this.state.uploading}
							>					
  						<div className="custom-file">
   							<input type="file" multiple className="custom-file-input" id="inputGroupFile01" ref={this.fileInputRef}
      						aria-describedby="inputGroupFileAddon01" onChange={this.onFilesAddedButton} />
  						</div>
						<CardColumns>
	            {this.state.files.map( (file, index) => {
              	return (
									<Card id={index} key={index} className={"px-1 py-1 mb-3"} >
										<Card.Img id={file.id} src={URL.createObjectURL(file)} alt="Card Image"/>
										<Card.ImgOverlay>
											{this.renderProgress(file)}
										</Card.ImgOverlay>
									</Card>
              	);
							})}
            	{this.state.images.map( (image, index) => {
								var border = "" ;
								if ( image.selected ) { border = "primary" } 
//								console.log( image.name + ' ' + image.height + ' ' + image.width ) ;
								return (
									<Card id={image.imageId} key={image.imageId} className={"px-1 py-1 mb-3"} bg={border} 
										draggable
//								className="draggable"
									>
										<Card.Img id={image.imageId} onClick={this.onSelectImage} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/"+image.folderId+"/"+image.imageId+'-300'}/>
									</Card>
             		);
							})}
						</CardColumns>
						</div>	
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
							autoFocus
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