import React from "react";
import { Container, Row, Card, Button }  from "react-bootstrap";
import "./images.css" ;

class Images extends React.Component {

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

		this.onBack = this.onBack.bind(this);
	}

	componentDidMount() {
		this.setState( { isLoading: true } ) ;

		this.getImage() ;
	}

	componentWillUnmount() {
	}

	getImage() {
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
		xhr.send() ;
	}

	onBack = event => {
		event.preventDefault() ;

		this.props.history.goBack()
	}

  render() {

//		var imgStyle = { width:'100%', marginLeft: 'auto', marginRight: 'auto'} ;
		var imgClass = "card-img-portrait" ;

		if ( this.state.image )
		{
			if ( this.state.image.height / this.state.image.width > 0.75 )
			{
//				imgStyle = { height:'80vh', marginLeft: 'auto', marginRight: 'auto'} ;
				imgClass = "card-img-portrait" ;
			}
		}

//		console.log( imgStyle ) ;

		return (
			!(this.state.isLoading) &&
			<Container fluid>
				<Row className="justify-content-md-center">
					<Card>
						<Card.Header>
						<h3 className="d-inline">{this.state.image.title}</h3>
						<Button className="float-right" variant="success" onClick={this.onBack} size="sm">Back</Button>
						<Button className="float-right mr-2" variant="secondary" size="sm">Fit</Button>
						<Button className="float-right mr-2" variant="secondary" size="sm">Fill</Button>
						<Button className="float-right mr-2" variant="secondary" size="sm">1:1</Button>
						</Card.Header>
						<Card.Img className={imgClass} src={"https://"+process.env.REACT_APP_HTML_DOMAIN+"/thumbnail/"+this.state.image.folderId+"/"+this.state.image.imageId+'-1800'} />
					</Card>
				</Row>
			</Container>
		) ;
	}
			
	/*
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

		);
	}
	*/
}

export default Images ;