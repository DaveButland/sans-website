import React from "react";
import { Container, Row, Col, Button, Form, FormControl, Image }  from "react-bootstrap";

class Folders extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			isLoading: true,
			image: {},
			width: 0, 
			height: 0, 
			centreX: 0, 
			centreY: 0, 
			title: '', 
			description: '', 
			name: '' 
		};

	}

	componentDidMount() {
		this.setState( { isLoading: true } ) ;
		this.getImage() ;
	}

	componentWillUnmount() {
	}

	getImage() {
		this.props.security.getAccessToken().then( function( accessToken ) {
			var xhr = new XMLHttpRequest();

			xhr.onerrror = function( error ) {
				console.log( "Error getting image", error ) ;
			}

			xhr.onload = function () {
				var image = JSON.parse(xhr.responseText);
				if (xhr.readyState === 4 && xhr.status === 200) {

					if (!image.description) { image.description ='' } ;
					if (!image.title) { image.title ='' } ;
					if (!image.centreX) { image.centreX = Math.round( image.width / 2 )  } ;
					if (!image.centreY) { image.centreY = Math.round( image.height / 2 )  } ;
					this.setState( { image: image, isLoading: false } ) ;
				} else {
					console.log( "Error getting image" ) ;
				}
			}.bind(this) ;

			xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/images/'+this.props.match.params.imageid, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.getJwtToken() );
			xhr.send() ;
		}.bind(this)).catch ( function (error ) {
			console.log( "Error getting access token", error ) ;
		});
	}

	onChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
	}
	
  render() {

//		console.log( this.state.image ) ;
		const imgStyle = { height: '80vh' } ;
		return (
			<Container fluid className="mt-15">
				<h3>{this.state.image.imageTitle}</h3>
				<Row>
					<Col lg={4}>
						<Image style={imgStyle} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/private/"+this.state.image.folderId+"/"+this.state.image.imageId}></Image>
					</Col>
					<Col lg={6}>
						<Form>
							<Form.Row>
								<Form.Group as={Col} controlId="Description">
									<Form.Label>Description</Form.Label>
	 								<FormControl type="text" value={this.state.image.description} onChange={this.onChange} placeholder="Description" aria-label="Description" aria-describedby="description" />
								</Form.Group>
							</Form.Row>

							<Form.Row>
							<Form.Group as={Col} controlId="width">
									<Form.Label>Width</Form.Label>
	 								<FormControl type="number" value={this.state.image.width} onChange={this.onChange} placeholder="Width" aria-label="Width" aria-describedby="width" />
								</Form.Group>
								<Form.Group as={Col} controlId="height">
									<Form.Label>Height</Form.Label>
	 								<FormControl type="number" value={this.state.image.height} onChange={this.onChange} placeholder="Height" aria-label="Height" aria-describedby="height" />
								</Form.Group>
							</Form.Row>

							<Form.Row border="primary">
								<Form.Group as={Col}>
									<Form.Label>Centre X</Form.Label>
  								<FormControl type="number" value={this.state.image.centreX} onChange={this.onChange} placeholder="CentreX" aria-label="CentreX" aria-describedby="centreX" />
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>CentreY</Form.Label>
   								<FormControl type="number" value={this.state.image.centreY} onChange={this.onChange} placeholder="CentreY" aria-label="CentreY" aria-describedby="centreY" />
								</Form.Group>
							</Form.Row>
							<Button>Update</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Folders ;