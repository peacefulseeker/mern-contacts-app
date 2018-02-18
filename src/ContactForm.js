//ContactForm.js
import React, { Component } from 'react';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: '', text: '', phone: '' };
    this.handleFullnameChange = this.handleFullnameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFullnameChange(e) {
    this.setState({ fullname: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let fullname = this.state.fullname.trim();
    let text = this.state.text.trim();
    let phone = this.state.phone.trim();
    if (!text || !fullname || !phone) {
      return;
    }
    this.props.onContactSubmit({ fullname: fullname, text: text, phone: phone });
    this.setState({ fullname: "", text: "", phone: "" });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="contact-box__form">
        <input
          type='text'
          placeholder='Your Full Name'
          value={this.state.fullname}
          onChange={this.handleFullnameChange} />
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
