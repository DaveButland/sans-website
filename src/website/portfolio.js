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
							<Card.Img className="portfolioImage portfolioImage" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Fasion
							</Card.Footer>
						</Card>
						<p></p>
						<Card className="card-yellow">
							<Card.Img className="portfolioImage" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Portrait
							</Card.Footer>
						</Card>
					</Col>
					<Col>
						<Card className="card-yellow">
							<Card.Img className="portfolioImage" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Location
							</Card.Footer>
						</Card>
						<p></p>
						<Card className="card-yellow">
							<Card.Img className="portfolioImage" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Black and White
							</Card.Footer>
					</Card>
					</Col>
					<Col>
						<Card className="card-yellow">
							<Card.Img className="portfolioImage" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Narrative
							</Card.Footer>
						</Card>
						<p></p>
						<Card className="card-yellow">
							<Card.Img className="portfolioImage" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Selfies
							</Card.Footer>
						</Card>
					</Col>
					<Col>
						<Card className="card-yellow">
							<Card.Img className="portfolioImageDisabled" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Lingerie
							</Card.Footer>
						</Card>
						<p></p>
						<Card className="card-yellow">
							<Card.Img className="portfolioImageDisabled" src="https://quyen-le-model.com/thumbnail/b79d8427-8919-4e66-8af7-c0597702a812/2e9dee30-eaa0-4721-9608-67e189a33b68-900"/>
							<Card.Footer className="portfolioName">
								Art Nude
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Fragment>
		) ;
	}
}

export default Portfolio ;