import React from "react";
import Container from "react-bootstrap/Container";

class NotFound extends React.Component {
    render() {
        return (
            <Container fluid>
            <h2>Not Found</h2>
						<p>
							Something went wrong
						</p>
            </Container> 
        );
    }
}

export default NotFound;