import React, { Component, Fragment } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor, { Image, ImageToolbar, ImageCaption, ImageStyle } from '@ckeditor/ckeditor5-build-classic';
//import Image from '@ckeditor/ckeditor5-image/src/image';
//import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
//import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
//import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';

//const editorConfiguration = {
//  plugins: [ Image, ImageToolbar, ImageCaption, ImageStyle ],
//  image: { toolbar: [ 'imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side' ] }
//};

class MyEditor extends Component {
  render() {
    return (
			<Fragment>
        <h2>Using CKEditor 5 build in React</h2>
          <CKEditor
                    editor={ ClassicEditor }
//										config={ editorConfiguration }
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
        />
      </Fragment>
    );
  }
}

export default MyEditor;