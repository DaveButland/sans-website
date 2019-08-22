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
			events: [ 
				{ start: new Date('August 4, 2019 00:00:00'), end: new Date('August 5, 2019 00:00:00' ), title: "Booked" }
			,	{ start: new Date('August 8, 2019 00:00:00'), end: new Date('August 9, 2019 00:00:00' ), title: "Booked" }
			,	{ start: new Date('August 13, 2019 00:00:00'), end: new Date('August 14, 2019 00:00:00' ), title: "Booked" }
			,	{ start: new Date('August 16, 2019 10:00:00'), end: new Date('August 16, 2019 16:00:00' ), title: "Booked" }
			,	{ start: new Date('September 13, 2019 00:00:00'), end: new Date('September 16 2019 00:00:00' ), title: "Wales", type: "Location", allDay: true }
			, { start: new Date('September 14, 2019 00:00:00'), end: new Date('September 16 2019 00:00:00' ), title: "Booked" }
			, { start: new Date('September 18, 2019 10:00:00'), end: new Date('September 18 2019 18:00:00' ), title: "Booked" }
			, { start: new Date('September 20, 2019 00:00:00'), end: new Date('September 21 2019 00:00:00' ), title: "Booked" }
			, { start: new Date('October 4, 2019 00:00:00'), end: new Date('October 7 2019 00:00:00' ), title: "Somerset" }
			, { start: new Date('October 5, 2019 10:00:00'), end: new Date('October 5 2019 18:00:00' ), title: "Booked" }
			, { start: new Date('October 7, 2019 00:00:00'), end: new Date('October 13 2019 00:00:00' ), title: "Cornwall" }
			, { start: new Date('October 13, 2019 00:00:00'), end: new Date('October 14 2019 00:00:00' ), title: "Booked" }
			]
		};	
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