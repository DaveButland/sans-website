import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from './sidebar' ;
import moment from 'moment' ;
import './contact.css' ;

//import 'react-dates/initialize';
//import { SingleDatePicker } from 'react-dates';
//import 'react-dates/lib/css/_datepicker.css';

import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css' // For some basic styling. (OPTIONAL)

class Contact extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			type: ''
		, date: null
		, dates: null
		, starttime:''
		, endtime: ''
		, name: '' 
		, locale: 'en'
		};

		this.stateDefinitions = {
			available: {
				color: null,
				label: 'Available',
			},
			enquire: {
				color: '#ffd200',
				label: 'Enquire',
			},
			unavailable: {
				selectable: false,
				color: '#78818b',
				label: 'Unavailable',
			},
		};

		this.dateRanges = [
			{
				state: 'enquire',
				range: moment.range(
					moment().add(2, 'weeks').subtract(5, 'days'),
					moment().add(2, 'weeks').add(6, 'days')
				),
			},
			{
				state: 'unavailable',
				range: moment.range(
					moment().add(3, 'weeks'),
					moment().add(3, 'weeks').add(5, 'days')
				),
			},
		];
	}	

	validateForm() {
    return this.state.date !=='' ;
  }

  handleChange = event => {
    this.setState( { [event.target.id]: event.target.value } ) ;
  }

	handleSubmit = async event => {
		event.preventDefault();	

		console.log( this.state ) ;
	}

  handleSelect(range, states) {
    // range is a moment-range object
    this.setState({
      value: range,
      states: states,
    });
  }

	onSelect = dates => {
		this.setState({dates: dates})
	}
	
	render() {
    return (
      <Container fluid>
				<Row>
					<Col className="sidebar">
						<Sidebar />
					</Col>
					<Col>
						<Form>
						<h1 align="center">Contact</h1>
						<Row>
							<Col>
								<Form.Group controlId="name">
  	  						<Form.Label>Name <span className="mandatory">*</span></Form.Label>
									<Form.Control 
										type="text" 
										placeholder="Enter Name" 
									/>
									<Form.Text className="text-muted">Please enter your name</Form.Text>
  							</Form.Group>
								<Form.Group controlId="subject">
  		  					<Form.Label>Subject <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Subject" />
									 <Form.Text className="text-muted">Subject of your message</Form.Text>
  							</Form.Group>
								<Form.Group controlId="portfolio">
  	  					<Form.Label>Portfolio <span className="mandatory">*</span></Form.Label>
   							<Form.Control type="text" placeholder="Enter URL for your portfolio" />
								 <Form.Text className="text-muted">Please provide a link to examples of your work</Form.Text>
 							</Form.Group>
								<Form.Group controlId="email">
    							<Form.Label>Email <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Enter email address" />
									<Form.Text className="text-muted">Please provide an email address for all communication</Form.Text>
  							</Form.Group>
								<Form.Group controlId="location">
    							<Form.Label>Location <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Enter location details" />
									<Form.Text className="text-muted">Please provide the location of the shoot</Form.Text>
  							</Form.Group>
							</Col>
							<Col>
							<Row>
								<Col>
								<	Form.Group controlId="date">
    							<Form.Label>Date <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Date" 
									 value={this.state.dates ? this.state.dates.format('LL') : ""}
										readOnly={true}
									/>
   							</Form.Group>
								 </Col>
								 <Col>
						 		<Form.Group controlId="starttime">
    							<Form.Label>Time <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Time" />
									 <Form.Text className="text-muted">Enter preferred time</Form.Text>
   							</Form.Group>
								 </Col>
								 </Row>
								 <Row>
								 <Col>
								<Form.Group controlId="duration">
    							<Form.Label>Duration <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Enter duration" />
									 <Form.Text className="text-muted">Enter expected duration</Form.Text>
   							</Form.Group>
								 </Col>
								 <Col>
								 <Form.Group controlId="type">
    							<Form.Label>Type <span className="mandatory">*</span></Form.Label>
   								<Form.Control as="select" placeholder="Choose Option">
									 	<option>Select Type...</option>
			         			<option>Fashion</option>
			         			<option>Lifestyle</option>
			         			<option>Lingerie</option>
			         			<option>Artistic Nude</option>
									</Form.Control>
									<Form.Text className="text-muted">Select main type</Form.Text>
  							</Form.Group>
								</Col>
								</Row>
								<Form.Group controlId="date">
									<DateRangePicker
          					onSelect={this.onSelect}
										value={this.state.dates}
										locale={moment().locale()}
										firstOfWeek={1}
										numberOfCalendars={2}
										selectionType="single"
										stateDefinitions={this.stateDefinitions}
										dateStates={this.dateRanges}
										defaultState="available"
										showLegend={true}
										minimumDate={new Date()}
									/>   							
								</Form.Group>
					 		</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId="message">
  		  					<Form.Label>Message</Form.Label>
									<Form.Text className="text-muted">
										Please enter your preferred options above and then any flexibility around dates, times and locations in the message box below. 
										Please include as much information about concept, ideas, moodboards, theme, hair, makeup and wardrobe as this will help make sure the shoot goes smoothly from the start
									</Form.Text>									
  	 							<Form.Control as="textarea" rows="7" placeholder="Message" />
	  						</Form.Group>
							</Col>
						</Row>
						<Button 
							className="float-right"
							disabled={!this.validateForm()}
							onClick={this.handleSubmit} 
							type="submit"	
						>Submit</Button>
						</Form>
					</Col>
					<Col className="sidebar">
					</Col>
				</Row>
			</Container>
		) ;
	}
}

export default Contact ;