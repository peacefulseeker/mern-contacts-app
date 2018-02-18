//ContactForm.js
import React, { Component } from 'react';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '', phone: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    let phone = this.state.phone.trim();
    if (!text || !author || !phone) {
      return;
    }
    this.props.onContactSubmit({ author: author, text: text, phone: phone });
    this.setState({ author: "", text: "", phone: "" });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="contact-box__form">
        <input
          type='text'
          placeholder='Your Name and Surname'
          value={this.state.author}
          onChange={this.handleAuthorChange} />
        <input
          type='text'
          placeholder='Your Phone'
          value={this.state.phone}
          onChange={this.handlePhoneChange} />
        <textarea
          type='text'
          placeholder='Say something…'
          value={this.state.text}
          onChange={this.handleTextChange} />
        <input
          type='submit'
          value='Add Contact' />
      </form>
    )
  }
}
export default ContactForm;
