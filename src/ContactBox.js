import React, { Component } from 'react';
import axios from 'axios'
import ContactList from './ContactList';
import ContactForm from './ContactForm';


class ContactBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadContactsFromServer = this.loadContactsFromServer.bind(this);
    this.handleContactSubmit = this.handleContactSubmit.bind(this);
  }
  loadContactsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handleContactSubmit(contact) {
    let contacts = this.state.data;
    contact.id = Date.now();
    let newContacts = contacts.concat([contact]);
    this.setState({ data: newContacts });
    axios.post(this.props.url, contact)
      .catch(err => {
        console.error(err);
        this.setState({ data: contacts });
      });
  }
  componentDidMount() {
    this.loadContactsFromServer();
    setInterval(this.loadContactsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div className="contact-box">
        <h2>Contacts List:</h2>
        <ContactList data={this.state.data} />
        <ContactForm onContactSubmit={this.handleContactSubmit} />
      </div>
    )
  }
}
export default ContactBox;
