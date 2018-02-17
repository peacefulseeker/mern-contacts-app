//ContactList.js
import React, { Component } from 'react';
import Contact from './Contact';
import style from './style';
class ContactList extends Component {
  render() {
    console.log(this.props.data);
    let commentNodes = this.props.data.map(comment => {
      return (
        <Contact author={comment.author} key={comment['_id']} id={comment['_id']}>
          {comment.text}
        </Contact >
      )
    })
    return (
      <div style={style.commentList} >
        {commentNodes}
      </div>
    )
  }
}
export default ContactList;
