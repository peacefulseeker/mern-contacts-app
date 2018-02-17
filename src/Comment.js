
//Comment.js
import React, { Component } from "react";
import style from "./style";
import marked from "marked";

class Comment extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="contant-box__contact">
        <h3>{this.props.author}</h3>
        <p>ID : {this.props.id}</p>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
}
export default Comment;
