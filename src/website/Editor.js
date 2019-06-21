import React, { Component } from 'react';
import Container from 'react-bootstrap/Container' ;
import Form from 'react-bootstrap/Form' ;
import Button from 'react-bootstrap/Button' ;
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import htmlToDraft from 'html-to-draftjs';

class MyEditor extends Component {

	state = {
		editorState: EditorState.createEmpty(),
	}
	
	constructor(props, context) {
		super(props, context);

		this.onEditorStateChange = this.onEditorStateChange.bind(this);
	}
	
	handleSubmit = (event) => {
		event.preventDefault() ;

		let title = event.target.title.value;
//		let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) ;
		let content = convertToRaw(this.state.editorState.getCurrentContent()) ;

		const req = new XMLHttpRequest();
		
		req.open("POST", "https://4uwwpb6ojf.execute-api.eu-west-2.amazonaws.com/live/articles" );
		req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		req.send(JSON.stringify({ "title": title, "content": content }));
	}

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  render() {
		const { editorState } = this.state;
		let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) ;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="Title">
          	<Form.Label>Title</Form.Label>
            <Form.Control name="title" type="title" placeholder="Enter Title" />
          </Form.Group>
        	<Form.Group controlId="Content">
            <Form.Label>Content</Form.Label>
						<Editor
         		 	editorState={editorState}
          		wrapperClassName="demo-wrapper"
          		editorClassName="demo-editor"
          		onEditorStateChange={this.onEditorStateChange}
       		 	/>
        		<textarea
							cols="100"
							rows="20"
							disabled
							value={JSON.stringify(editorState.getCurrentContent(), null, 4)}
//          		value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
       		 	/>
          </Form.Group>
          <Button variant="primary" type="submit">
          	Save
          </Button>
          </Form>
					<div dangerouslySetInnerHTML={{ __html: content }} />
			</Container>
    );
  }
}

export default MyEditor ;