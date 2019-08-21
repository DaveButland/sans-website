import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap' ;
import {Nav, Navbar } from 'react-bootstrap';
import './sidebar.css' ;

class Sidebar extends Component {

  render() {
    return (				
			<Navbar id="my-sidebar" className="my-navbar flex-column" expand="lg">
				<Nav.Item className="sidebar-header">
					<LinkContainer to="/">
						<a className="abc" href="/">
						<h4 className="ThuFaph4" >Quyen Le</h4>
						</a>
					</LinkContainer>
				</Nav.Item>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="flex-column">
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
		) ;
  }
}

export default Sidebar ;