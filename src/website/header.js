import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import "./header.css";

class Header extends Component {

	constructor(props, context) {
		super(props, context);

		this.handleLogout = this.handleLogout.bind(this) ;
	}
	
	handleLogout = (event) => {
		this.props.security.signOut();
//		window.location.reload();
		this.setState( { update: true } ) ;
	//		this.props.history.push( "/" ) ;
	}

	render() {
		return (
			<Navbar className="py-0 py-md-0" variant="dark" bg="dark" expand="lg" fixed="top">
				<LinkContainer to="/">
  	      <Navbar.Brand href="/">Quyen Le</Navbar.Brand>
				</LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
						<NavDropdown title="My Portfolio" id="portfolio">
							<LinkContainer to="/profile">
			        	<NavDropdown.Item>Profile</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to="/pages">
        				<NavDropdown.Item>Pages</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to="/media">
      					<NavDropdown.Item>Media</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to="/albums">
     				 		<NavDropdown.Item>Albums</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to="/folders">
								<NavDropdown.Item>Folders</NavDropdown.Item>
							</LinkContainer>
				     </NavDropdown>
          </Nav>
          <Form inline>
            <Form.Control size="sm" type="text" placeholder="Search" className="mr-sm-2" />
      	    <Button variant="outline-success" size="sm">Search</Button>
          </Form>
					<LinkContainer to="/" activeClassName="">
	          <Button className="mx-2" variant="outline-danger" onClick={this.handleLogout} size="sm">Signout</Button>
					</LinkContainer>
      	</Navbar.Collapse>
      </Navbar>
		);
	}
}

export default Header ;