import React, { Fragment } from "react";
import { Row, Col, Image, Card } from 'react-bootstrap' ;

class Portfolio extends React.Component {

  render() {
    return (
      <Fragment>
				<h1 id="portfolio" align="center">Portfolio</h1>
				<Row>
					<Col>
					<Card className="card-yellow">
							<Card.Img className="portfolioImage portfolioImageDisabled" width="97.5%" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Art Nude
							</Card.Footer>
					</Card>
					<p></p>
					<Card className="card-yellow">
							<Card.Img className="portfolioImage" width="97.5%" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Fashion
							</Card.Footer>
					</Card>
					</Col>
					<Col>
					<h4 align="center">Water</h4>
						<Image className="portfolioImage" width="97.5%" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
						<h4 align="center">Water</h4>
						<Image className="portfolioImage" width="97.5%" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
					</Col>
					<Col>
					<h4 align="center">Fashion</h4>
						<Image className="portfolioImage" width="97.5%" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
						<h4 align="center">Fashion</h4>
						<Image className="portfolioImage" width="97.5%" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
					</Col>
					<Col>
						<h4 align="center">Lifestyle</h4>
						<Image className="portfolioImage" width="97.5%" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
						<h4 align="center">Lifestyle</h4>
						<Image className="portfolioImage" width="97.5%" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
					</Col>
				</Row>
			</Fragment>
		) ;
	}
}

export default Portfolio ;