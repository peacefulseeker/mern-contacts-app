import React, { Component } from 'react';
import axios from 'axios'
import ContactList from './ContactList';
import ContactForm from './ContactForm';


class ContactBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.finalUrl = window.location.href.includes('localhost') ? this.props.urlLocal : this.props.url;
    this.loadContactsFromServer = this.loadContactsFromServer.bind(this);
    this.handleContactSubmit = this.handleContactSubmit.bind(this);
    this.handleContactDelete = this.handleContactDelete.bind(this);
    this.handleContactUpdate = this.handleContactUpdate.bind(this);
  }
  loadContactsFromServer() {
    axios.get(this.finalUrl)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handleContactSubmit(contact) {
    let contacts = this.state.data;
    contact.id = Date.now();
    let newContacts = contacts.concat([contact]);
    this.setState({ data: newContacts });
    axios.post(this.finalUrl, contact)
      .catch(err => {
        console.error(err);
        this.setState({ data: contacts });
      });
  }
  handleContactDelete(id) {
    axios.delete(`${this.finalUrl}/${id}`)
      .then(res => {
        // console.log('Contact deleted');
        // console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleContactUpdate(id, contact) {
    //sends the contact id and new fullname/text to our api
    axios.put(`${this.finalUrl}/${id}`, contact)
      .catch(err => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.loadContactsFromServer();
    setInterval(this.loadContactsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div className="contact-box">
        <h2>Contacts List:</h2>
        <ContactList
          data={this.state.data}
          onContactDelete={this.handleContactDelete}
          onContactUpdate={this.handleContactUpdate} />
        <ContactForm onContactSubmit={this.handleContactSubmit} />
      </div>
    )
  }
}
export default ContactBox;
