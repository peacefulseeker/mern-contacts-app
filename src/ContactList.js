//CommentList.js
import React, { Component } from 'react';
import Contact from './Contact';
class ContactList extends Component {
  render() {
    const contactNodes = this.props.data.map(contact => {
      return (
        <Contact author={contact.author} phone={contact.phone} key={contact._id || 1} id={contact._id}>
          {contact.text}
        </Contact >
      )
    })
    return (
      <div className="contact-box__list">
        {contactNodes}
      </div>
    )
  }
}
export default ContactList;
