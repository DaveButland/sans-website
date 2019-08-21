import React from "react";
import { Container, Navbar, Nav, Row, Col, Image, Table, Card } from "react-bootstrap";
import Sidebar from './sidebar' ;
import Portfolio from './portfolio' ;
import "./home.css" ;

class Home extends React.Component {

  render() {
    return (
			<Container fluid>
				<Row>
					<Col className="sidebar">
						<Sidebar />
					</Col>
					<Col>
						<Image className="leadimage rounded-2" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/daff3c06-980a-4899-a54c-8f346191ed00-900" />

				<h1 className="quyenlename" align="center">Quyen Le</h1>
				<p></p>
				<p className="hometext">
					I am a freelance model with a variety of experience covering a wide range of different levels. 
					I am originally from Vietnam but currently based in Cambridgeshire, UK. 
					I can travel easily to London, Birmingham and the rest of the UK easily and I am often on tour as I enjoy travelling. 
					If you would like to work with me then please check out my booking information which sets out my terms and conditions, 
					my calendar to see when and where I am touring and my contact page to get in touch and I will get back to you as soon as possible. 
				</p>
				<p className="hometext">
					I also frequently travel further afield as I have yet to fully explore this part of the world and happy to try 
					new places if there is enough interest in that location. 
					Countries I have not yet visited include Switzerland, Germany and Scandinavia. 
					If you are interest in my travelling outside of the Schengen area then I may need a visa and so plenty of notice would be appreciated. 
				</p>
				<p className="hometext">
					I am currently modelling full time, having just finished my Master’s Degree. 
					However, this is likely to change in the near future so if you would like to work with me, now is a good time to do so. 
				</p>
				<Row>
					<Col sm={true}>
						<Image width="100%" className="rounded-2" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2683f5f3-57b9-4f04-a7fb-5df20cf67594-900"/>
						<p></p>
						<p></p>
						<Card className="card-yellow">
							<Card.Header className="testimonial-header">
								Testimonials
							</Card.Header>
							<Card.Body>
							<Card.Text>
								Quyen is just a joy to work with in that she brings an undying enthusiasm and determination to work hard 
								and imaginatively for as long as it takes
							</Card.Text>
							<Card.Text>
								Having a relatively unusual look helps of course but she's a real creative. 
							</Card.Text>
							<Card.Text>
								This was my second shoot with Quyen and I'm looking forward to another.
							</Card.Text>
							<Card.Text className="testimonial-name">
								Mark Fiddian
							</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={true}>
						<Image style={{width:"97.5%"}} className="rounded-2" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900" />
						<p></p>
						<p></p>
						<Card className="card-yellow">
							<Card.Header className="testimonial-header">
								Charactersitics
							</Card.Header>
							<Card.Body>
							<Card.Text>
							I am 26 years old of South East Asian ethnicity, originally from Vietnam. I have black eyes and long straight fine dark brown hair. 
							I have a single tattoo in the centre of my chest (Unalome).
						</Card.Text>
						<Table bordered hover size="sm">
 							<thead>
    						<tr>
      						<th style={{width: 40 +'%'}}>Measurements</th>
      						<th style={{width: 20 + '%'}}>UK</th>
      						<th style={{width: 20 + '%'}}>EU</th>
      						<th style={{width: 20 + '%'}}>US</th>
    						</tr>
  						</thead>
 						 	<tbody>
    						<tr>
     						 	<td>Height</td>
      						<td>5' 3"</td>
      						<td>160cm</td>
									<td>5' 3"</td>
   						 	</tr>
								<tr>
     						 	<td>Weight</td>
      						<td>8st</td>
      						<td>50kg</td>
									<td>8st</td>
   						 	</tr>
									<tr>
     						 	<td>Dress Size</td>
      						<td>6</td>
      						<td>34</td>
									<td>2</td>
   						 	</tr>
									<tr>
     						 	<td>Shoe size</td>
      						<td>4</td>
      						<td>37</td>
      						<td>5</td>
   						 	</tr>
								<tr>
     						 	<td>Figure</td>
      						<td>34-25-36</td>
      						<td>86-63-92</td>
      						<td>34-25-36</td>
   						 	</tr>
							</tbody>
						</Table>
						</Card.Body>
						</Card>
					</Col>
				</Row>
				<hr />
				<Portfolio />
				<hr />
				<Navbar className="py-0 py-md-0 my-navbar" expand="lg">
					<Navbar.Brand>© Quyen Le 2019</Navbar.Brand>
					<Nav>
						<Nav.Item><span role="img" aria-label="language">Language 🇬🇧 🇻🇳</span></Nav.Item>
					</Nav>
				</Navbar>
			</Col>
			<Col className="sidebar">
			</Col>
			</Row>
			</Container>
		) ;
	}
}

export default Home ;