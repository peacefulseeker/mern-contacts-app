//ContactList.js
import React, { Component } from 'react';
import Contact from './Contact';
class ContactList extends Component {
  render() {
    const contactNodes = this.props.data.map(contact => {
      return (
        <Contact
          onContactDelete={this.props.onContactDelete}
          onContactUpdate={this.props.onContactUpdate}
          author={contact.author}
          phone={contact.phone}
          uniqueID={ contact._id }
          key={contact._id || 1} >
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
