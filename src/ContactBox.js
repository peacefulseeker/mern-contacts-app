//ContactBox.js
import React, { Component } from 'react';
import axios from 'axios'
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import style from './style';


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
  handleContactSubmit(comment) {
    let comments = this.state.data;
    comment.id = Date.now();
    let newContacts = comments.concat([comment]);
    this.setState({ data: newContacts });
    axios.post(this.props.url, comment)
      .catch(err => {
        console.error(err);
        this.setState({ data: comments });
      });
  }
  componentDidMount() {
    this.loadContactsFromServer();
    setInterval(this.loadContactsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={style.commentBox}>
        <h2>Contacts:</h2>
        <ContactList data={this.state.data} />
        <ContactForm onContactSubmit={this.handleContactSubmit} />
      </div>
    )
  }
}
export default ContactBox;
