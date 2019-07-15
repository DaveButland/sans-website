import React, { Component, Fragment } from 'react';
import { Container } from "react-bootstrap" ;

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

class JEditor  extends Component {
    constructor(props) {
        super(props);
        this.state = {
					config = {
						toolbar: true,
						readonly: false,
						showCharsCounter: false,
						showWordsCounter: false,
						showXPathInStatusbar: false,
						preset: "inline"
					}, 
        	content: null,
        }
    }

  updateContent = (value) => {
    this.setState({content:value})
	}
	
  /**
  * @property Jodit jodit instance of native Jodit
  */
	//jodit;
	//setRef = jodit => this.jodit = jodit;
	
  render() {
    return (
			<Fragment>
				<Container>
	        <JoditEditor
    	      editorRef={this.setRef}
            value={this.state.content}
            config={this.state.config}
            onChange={this.updateContent}
  	      />
				</Container>
			</Fragment>
    );
  }
}

export default JEditor ;