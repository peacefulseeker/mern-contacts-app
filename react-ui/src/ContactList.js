//ContactList.js
import React, { Component } from 'react';
import Contact from './Contact';
class ContactList extends Component {
  render() {
    console.log(this.props.data);
    const contactNodes = this.props.data.map(contact => {
      return (
        <Contact
          onContactDelete={this.props.onContactDelete}
          onContactUpdate={this.props.onContactUpdate}
          fullname={contact.fullname}
          phone={contact.phone}
          email={contact.email}
          uniqueID={ contact._id }
          key={contact._id || 1} >
          Text inside component
        </Contact >
      )
    });

    return (
      <div className="contact-box__list">
        {contactNodes}
      </div>
    )
  }
}
export default ContactList;
