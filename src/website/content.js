import React from "react";
import { Container } from "react-bootstrap" ;
import Page from "./page" ;
import Folder from "./folder" ;
//import Album from "./album" ;

class Content extends React.Component {

  constructor(props, context) {
    super(props, context);

		this.state = {
			page: { title: 'This is a hard coded test', content: '<p>Really need to sort out tabs</p>' }, // replace this with page id and make page get it's own data
			pageId: 'e826eb83-60fb-4548-b594-120a642e5bc6',
			folderId: 'b79d8427-8919-4e66-8af7-c0597702a812'

		}
	}

	/*
	Introduction text
	two landscape pictures
	About me / Experience
	Contact / Calendar / Booking Info
	Images 
	Footer - copyright, translate, 
  */

	render() {
		return ( 
			<Container>
				<h3>Content</h3>
				<Page page={this.state.page} editable security={this.props.security} />
				<Folder folderId={this.state.folderId} security={this.props.security}/>
			</Container>		) ;
	}
}

export default Content