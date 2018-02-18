
//Comment.js
import React, { Component } from "react";
import marked from "marked";

class Contact extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="contact-box__contact" id={this.props.id}>
        <h3>{this.props.author}</h3>
        <p>ID: {this.props.id}</p>
        <p>Phone: {this.props.phone}</p>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
}
export default Contact;
