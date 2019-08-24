import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from './sidebar' ;
import { addDays } from 'date-fns'
import moment from 'moment' ;
import './contact.css' ;

//import 'react-dates/initialize';
//import { SingleDatePicker } from 'react-dates';
//import 'react-dates/lib/css/_datepicker.css';

import DatePicker from "react-datepicker" ;
import "react-datepicker/dist/react-datepicker.css";

//import DateRangePicker from 'react-daterange-picker'
//import 'react-daterange-picker/dist/css/react-calendar.css' // For some basic styling. (OPTIONAL)

class Contact extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			events: [] 
		, message: { date: null }
		};

		this.stateDefinitions = {
			available: {
				color: null,
				label: 'Available',
			},
			location: {
				color: '#ff33ff',
				label: 'On Tour',
			},
			unavailable: {
				selectable: false,
				color: '#78818b',
				label: 'Unavailable',
			},
		};

		this.dateRanges = [
//			{
//				state: 'location',
//				range: moment.range(
//					moment().add(2, 'weeks').subtract(5, 'days'),
//					moment().add(2, 'weeks').add(6, 'days')
//				),
//			},
//			{
//				state: 'unavailable',
//				range: moment.range(
//					moment().add(3, 'weeks'),
//					moment().add(3, 'weeks').add(5, 'days')
//				),
//			},
//			{
//				state: 'location',
//				range: moment.range( new Date( 'September 13 2019' ), new Date( 'September 16 2019')),
//			}
		];

//		const start = new Date( 'September 13 2019 00:00:00'  ) ;
//		const end   = new Date( 'September 16 2019 00:00:00' ) ;
//		const range = moment.range( start, end ) ;

//		console.log( start, end, range ) ;
		this.handleDateChange = this.handleDateChange.bind(this) ;
		this.getEvents = this.getEvents.bind(this) ;
		this.getDateClassName = this.getDateClassName.bind(this) ;
		this.validateForm = this.validateForm.bind(this) ;
		this.validateDate = this.validateDate.bind(this) ;
		this.validateTime = this.validateTime.bind(this) ;
		this.validateDuration = this.validateDuration.bind(this) ;
		this.validateEmail = this.validateEmail.bind(this) ;
	}	

	componentDidMount() {
		this.setState({ isLoading: true });

		this.getEvents() ;
	}

	componentWillUnmount() {
	}

	getEvents() {
		var xhr = new XMLHttpRequest();

		xhr.onerrror = function( error ) {
			console.log( "Error getting folders", error, error ) ;
		}

		xhr.onload = function () {
			var events = JSON.parse(xhr.responseText);
			if (xhr.readyState === 4 && xhr.status === 200) {
				const excludeDates = [] ;
				events.map( event => {
					const start = moment( event.start, 'YYYYMMDDTHHmmss' ).toDate() ;
					const end = moment( event.end, 'YYYYMMDDTHHmmss' ).toDate() ;
					event.startDate = start ;
					event.endDate = end ;

					if ( event.type === 'Booking' || event.type === 'Unavailable' ) {
						var excludeDay = event.startDate ;
						while( excludeDay < event.endDate ) {
							excludeDates.push( excludeDay ) ;
							excludeDay = addDays( excludeDay, 1 ) ;
						}
					}

					return event ;
				} ) ;

				this.setState( { events: events, excludeDates: excludeDates, isLoading: false } ) ;
			} else {
				console.log( "Error getting events" ) ;
			}
		}.bind(this) ;

		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/events?user=quyenle', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.send() ;
	}

	validateForm() {
		return ( this.validateDate() &&
						 this.validateTime() &&
						 this.validateDuration() && 
						 this.validateName() &&
						 this.validateEmail() &&
						 this.validateType() &&
						 this.validatePortfolio() &&
						 this.validateLocation() &&
						 this.validateSubject() &&
						 this.validateContent()
						) ;
	}
	
	validateDate() {
		return this.state.message.date !== '' ;
	}

	validateTime() {
		return this.state.message.time !== '' ;
	}

	validateDuration() {
		return this.state.message.duration !== '' ;
	}

	validateEmail() {
		return this.state.message.email !== '' ;
	}

	validateName() {
		return this.state.message.name !== '' ;
	}

	validateType() {
		return this.state.message.type !== '' ;
	}

	validatePortfolio() {
		return this.state.message.portfolio !== '' ;
	}

	validateLocation() {
		return this.state.message.location !== '' ;
	}

	validateSubject() {
		return this.state.message.subject !== '' ;
	}

	validateContent() {
		return this.state.message.content !== '' ;
	}

	handleDateChange(date) {
		var message = this.state.message ;
		message.date = date ;
    this.setState({ message: message });
	}
	
  handleChange = event => {
		var message = this.state.message ;
		message[event.target.id] = event.target.value ;
    this.setState( { message: message } ) ;
  }

	handleSubmit = async event => {
		event.preventDefault()

		var message = this.state.message ;

		var json = JSON.stringify( message ) ;

		var xhr = new XMLHttpRequest();

		xhr.onerror = function() {
			console.log( "Error sending message" ) ;
		} ;

		xhr.onload = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
			} else {
				console.log( "Error saving message") ;
			}
		} ;

		xhr.open("POST", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/messages', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.send(json) ;

		this.setState( { message: { date: null } } )
	}

  isDateInEvent = ( date, event ) => {

		const startDay = date ;
		const endDay   = addDays( date, 1 ) ;
		const start = event.startDate < endDay ;
		const end   = event.endDate   > startDay ;
		const match = start && end ;

		return match ;
	}

	getDateClassName = date => {

		const day_events = this.state.events.filter( event => this.isDateInEvent( date, event ) ) ;

		const unavailable = day_events.filter( event => event.type === 'Unavailable' ) ;
		const booking = day_events.filter( event => event.type === 'Booking' ) ;
		const location = day_events.filter( event => event.type === 'Location' ) ;

		if ( unavailable.length > 0 )  {
			return 'unavailable' ;
		} else if ( booking.length > 0 ) {
			return 'booking' ; 
		} else if ( location.length > 0 ) {
			return 'location' ; 
		} else {
			return 'available' ;
		}
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
									<Form.Control type="text" placeholder="Enter Name" size="sm" onChange={this.handleChange}
									/>
									<Form.Text className="text-muted">Please enter your name</Form.Text>
  							</Form.Group>
								<Form.Group controlId="email">
    							<Form.Label>Email <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Enter email address" size="sm" onChange={this.handleChange}/>
									<Form.Text className="text-muted">Please provide an email address for all communication</Form.Text>
  							</Form.Group>
								<Form.Group controlId="portfolio">
  	  					<Form.Label>Portfolio <span className="mandatory">*</span></Form.Label>
   							<Form.Control type="text" placeholder="Enter URL for your portfolio" size="sm" onChange={this.handleChange}/>
								 <Form.Text className="text-muted">Please provide a link to examples of your work</Form.Text>
 							</Form.Group>
							</Col>
							<Col>
							<Row>
								<Col>
									<Form.Group controlId="date">
    							<Form.Label>Date <span className="mandatory">*</span></Form.Label>
 									<DatePicker
  								  selected={this.state.message.date}
										onChange={this.handleDateChange}
										dateFormat="dd/MM/yyyy"
										excludeDates={this.state.excludeDates}
										dayClassName={this.getDateClassName}
										minDate={new Date()}
										size="sm"
									>
										<div style={{textAlign: 'center'}}>
										<span>( </span>
										<span style={{color: '#fa1d1d'}}>Booked</span>
										<span>, </span>
										<span style={{color: '#2dc4ff'}}>Touring</span>
										<span>, </span>
										<span style={{color: 'grey'}}>Unavailable</span>
										<span> )</span>
										</div>
									</DatePicker>
									<Form.Text className="text-muted">Please elect an available date</Form.Text>
									</Form.Group>
								 </Col>
								 <Col>
						 		<Form.Group controlId="time">
    							<Form.Label>Time <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Time" size="sm" onChange={this.handleChange}/>
									 <Form.Text className="text-muted">Enter preferred time</Form.Text>
   							</Form.Group>
								 </Col>
								 <Col>
								<Form.Group controlId="duration">
    							<Form.Label>Duration <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Enter duration" size="sm" onChange={this.handleChange}/>
									 <Form.Text className="text-muted">Enter expected duration</Form.Text>
   							</Form.Group>
								 </Col>
								 </Row>
								 <Row>
								 <Col>
								 <Form.Group controlId="type">
    							<Form.Label>Type <span className="mandatory">*</span></Form.Label>
   								<Form.Control as="select" placeholder="Choose Option" onChange={this.handleChange} size="sm">
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
								<Form.Group controlId="location">
    							<Form.Label>Location <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Enter location details" onChange={this.handleChange} size="sm"/>
									<Form.Text className="text-muted">Please provide the location of the shoot</Form.Text>
  							</Form.Group>
					 		</Col>
						</Row>
						<Row>
						<Col>
						<Form.Group controlId="subject">
  		  					<Form.Label>Subject <span className="mandatory">*</span></Form.Label>
   								<Form.Control type="text" placeholder="Subject" onChange={this.handleChange} size="sm" />
									 <Form.Text className="text-muted">Subject of your message</Form.Text>
  						</Form.Group>
								<Form.Group controlId="content">
  		  					<Form.Label>Message</Form.Label>
									<Form.Text className="text-muted">
										Please enter your preferred options above and then any flexibility around dates, times and locations in the message box below. 
										Please include as much information about concept, ideas, moodboards, theme, hair, makeup and wardrobe as this will help make sure the shoot goes smoothly from the start
									</Form.Text>									
  	 							<Form.Control as="textarea" rows="7" placeholder="Message" onChange={this.handleChange} size="sm"/>
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