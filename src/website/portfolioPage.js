import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from './sidebar' ;
import Portfolio from './portfolio' ;

class PortfolioPage extends React.Component {

  render() {
    return (
      <Container fluid>
				<Row>
					<Col className="sidebar">
						<Sidebar />
					</Col>
					<Col>
						<Portfolio />
					</Col>
					<Col className="sidebar">
					</Col>
				</Row>
					
			</Container>
		) ;
	}
}

export default PortfolioPage ;