//ContactForm.js
import React, { Component } from 'react';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: '', email: '', phone: '' };
    this.handleFullnameChange = this.handleFullnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFullnameChange(e) {
    this.setState({ fullname: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let fullname = this.state.fullname.trim();
    let phone = this.state.phone.trim();
    let email = this.state.email.trim();
    if (!fullname || !email || !phone) {
      return;
    }
    this.props.onContactSubmit({ fullname: fullname, email: email, phone: phone });
    this.setState({ fullname: "", email: "", phone: "" });
  }
  render() {
    return (
      <div>
        <h2>Add new contact below</h2>
        <form onSubmit={this.handleSubmit} className="contact-box__form">
          <input
            type='text'
            placeholder='Full Name'
            value={this.state.fullname}
            onChange={this.handleFullnameChange} />
          <textarea
            type='text'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleEmailChange} />
          <input
            type='text'
            placeholder='Phone'
            value={this.state.phone}
            onChange={this.handlePhoneChange} />

          <input
            type='submit'
            value='Add Contact' />
        </form>
      </div>
    )
  }
}
export default ContactForm;
