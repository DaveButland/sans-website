import React from "react";
import { Image } from "react-bootstrap" ;

//import Container from "react-bootstrap/Container";
//import Hermite_class from 'hermite-resize';
//import { AutoScaling } from "aws-sdk/clients/all";

/**
 * ReactJS implementation of http://jsfiddle.net/LvsYc/
 * @uses Foundation 6
 * @see http://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
 */
class ImageFile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id : "someUniqueId", // I would use this.props.id for a real world implementation
			imageURI : null,
		}
		
		this.readURIName(this.props.file) ;
  }
  
  buildImgTag(){
    let imgTag = null;
		if (this.state.imageURI !== null)
			return ( <Image style={{height:200}} alt={this.state.id} src={this.state.imageURI}/> ) ;
//			imgTag = ( <img className="thumbnail" alt={this.state.id} src={this.state.imageURI}></img> );
    return imgTag;
	}
	
	readURIName(name)
	{
    if(name){
      let reader = new FileReader();
      reader.onload = function(ev){
        this.setState({imageURI:ev.target.result});
      }.bind(this);
      reader.readAsDataURL(name);
    }
	}
  
  readURI(e){
    if(e.target.files && e.target.files[0]){
      let reader = new FileReader();
      reader.onload = function(ev){
        this.setState({imageURI:ev.target.result});
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  
  handleChange(e){
    this.readURI(e); // maybe call this with webworker or async library?
    if (this.props.onChange !== undefined)
      this.props.onChange(e); // propagate to parent component
  }

  render() {
    const imgTag = this.buildImgTag();

    return(
			<div> 
				{imgTag}
			</div>
		) ;
  }
}

export default ImageFile ;
