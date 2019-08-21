import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from './sidebar' ;

class Bookings extends React.Component {

  render() {
    return (
      <Container fluid>
				<Row>
					<Col className="sidebar">
						<Sidebar />
					</Col>
					<Col>
						<h1 align="center">Booking Information</h1>
						<h4>Communication</h4>
						<p className="hometext">
							I model because I enjoy doing it, the day I stop enjoying it will be the day I stop modelling. 
							Consequentially, I am more than happy to have long, drawn out conversations about ideas and concepts before shooting, 
							assuming you have serious intentions to shoot with me. 
						</p>
						<h4>Your Experience</h4>
						<p className="hometext">
							I have worked with all levels of photographers and you don't need to be experienced to work with me. 
							However, please be aware that I don't generally do higher levels with less experienced photographers. 
							This is both a safety aspect and a desire to ensure that images of me are always to a minimum standard. 
							I am more than happy to work with photographers until I am comfortable to shoot higher levels with them. 
						</p>
						<h4>Limitations</h4>
						<p>
							I am comfortable with almost all genre of photography but I do retain the right to control what images are in existance. 
							I have a very simple set of rules:
						</p>
						<ul>
							<li className="hometext">No Objectifying</li>
							<li className="hometext">No Pornography</li>
							<li className="hometext">Keep it Classy</li>
						</ul>
						<h4>Rates</h4>
						<p className="hometext">
							There is no simple answer to this as it very much depends on the project. I will always give better rates for longer periods and 
							repeat bookings as well as more local work. My rates include my time, makeup, hair, styling and wardrobe. I don't charge for travel time 
							under one hour. 
						</p>
						<p className="hometext">
							A deposit will be asked to cover any upfront costs like travel expenses, studios or additional costs specific to a shoot. Consequentially, 
							I will cover any of these expenses for a photographer should I have to cancel for any reason
						</p>
						<h4>Cancellation Policy</h4>
						<ul>
							<li className="hometext">under 48 hours - full fees</li>
							<li className="hometext">over 48 hours - incurred costs</li>
						</ul>
						<p className="hometext">
							If I am able to rebook after a cancellation, even within 48 hours then you will get a full refund minus any incurred costs for the rebooking
						</p>
					</Col>
					<Col className="sidebar">
					</Col>
				</Row>
					
			</Container>
		) ;
	}
}

export default Bookings ;