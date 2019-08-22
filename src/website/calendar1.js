import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from './sidebar' ;

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

function customEvent({ event }) {
//  if ( event.type !== "Location" )
	return (
		<span>
			<strong>{event.title}</strong>
			{event.desc && ':  ' + event.desc}
		</span>
	)
}

// <em style={{ backgroundColor: 'magenta' }}>{event.title}</em>

class Calendar1 extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			events: []
		};	

		this.getEvents = this.getEvents.bind(this) ;
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
				events.map( event => {
					const start = moment( event.start, 'YYYYMMDDTHHmmss' ).toDate() ;
					const end = moment( event.end, 'YYYYMMDDTHHmmss' ).toDate() ;
					event.startDate = start ;
					event.endDate = end ;
				} ) ;

				this.setState( { events: events, isLoading: false } ) ;
			} else {
				console.log( "Error getting events" ) ;
			}
		}.bind(this) ;

		xhr.open("GET", 'https://'+process.env.REACT_APP_APIS_DOMAIN+'/events?user=quyenle', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.send() ;
	}

  render() {
    return (
      <Container fluid>
 				<Row>
					<Col className="sidebar">
						<Sidebar />
					</Col>
					<Col className="py-3">
					<h1 align="center">Calendar</h1>
       <Calendar 
          selectable
          localizer={localizer}
          defaultDate={new Date()}
					defaultView="month"
					startAccessor='startDate'
					endAccessor='endDate'
          events={this.state.events}
					style={{ height: "80vh" }}
					scrollToTime={new Date("September 16 2019 07:00:00" )}
					components={{
						event: customEvent 
					}}      
				/>
				</Col>
				<Col className="sidebar">

				</Col>
				</Row>
			</Container>
    );
  }
}

export default Calendar1 ;