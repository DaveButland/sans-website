import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import "./header.css";

class FrontPageMenu extends Component {

	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<Navbar className="py-0 py-md-0" expand="collapse" fixed="top">
				<LinkContainer to="/">
					<Navbar.Brand className="ThuFaphBrand" href="/">Quyen Le</Navbar.Brand>
				</LinkContainer>

				<Navbar.Toggle aria-controls="basic-navbar-nav" toggle="collapse" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Item>
							<LinkContainer to="/home">
								<Nav.Link href="/home">Home</Nav.Link>
							</LinkContainer>
						</Nav.Item>
						<Nav.Item>
							<LinkContainer to="/portfolio">
								<Nav.Link href="/portfolio">Portfolio</Nav.Link>
							</LinkContainer>
						</Nav.Item>
						<Nav.Item>
							<LinkContainer to="/booking">
								<Nav.Link href="/booking">Booking</Nav.Link>
							</LinkContainer>
						</Nav.Item>
						<Nav.Item>
							<LinkContainer to="/calendar">
								<Nav.Link href="/calendar">Calendar</Nav.Link>
							</LinkContainer>
						</Nav.Item>
						<Nav.Item>
							<LinkContainer to="/contact">
								<Nav.Link href="/contact">Contact</Nav.Link>
							</LinkContainer>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default FrontPageMenu ;