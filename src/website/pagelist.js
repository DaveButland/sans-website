import React, { Fragment} from "react";
import { ButtonToolbar, Button, ListGroup } from "react-bootstrap";

class PageList extends React.Component {

	constructor(props, context) {
    super(props, context);

		this.state = {
		}
	}

	onSelectPage( name ) {
		console.log( name ) ;
	}

  render() {
		var disabled = true ;
		return(
			<Fragment> 
				<h4>Pages</h4>
				<ButtonToolbar className="mb-2">
					<Button className="mr-2" name="Add" onClick={this.handleShowAddFolder} size="sm">Add</Button>
					<Button className="mr-2" name="Rename" variant="secondary" onClick={this.handleShowRenameFolder} size="sm" disabled={disabled}>Rename</Button>
					<Button  className="mr-2" name="Delete" variant="danger" onClick={this.handleShowDeleteFolder} size="sm" disabled={disabled}>Delete</Button>
				</ButtonToolbar>
				<ListGroup>
					{this.state.pages.map( page => {
						return ( 
							<ListGroup.Item id={page.pageId} key={page.pageId} action href={"#"+page.pageId} onClick={this.onSelectPage}>{page.pageName}</ListGroup.Item>
						) ;									
					})}
				</ListGroup>
			</Fragment>
		) ;
	}
}

export default PageList ;




