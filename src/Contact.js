
//Contact.js
import React, { Component } from "react";
import marked from "marked";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      fullname: '',
      email: '',
      phone: ''
    };
    //binding all our functions to this class
    this.deleteContact = this.deleteContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.handleFullnameChange = this.handleFullnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleContactUpdate = this.handleContactUpdate.bind(this);
  }
  updateContact(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleContactUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if fullname or text changed, set it. if not, leave null and our PUT
    //request will ignore it.
    let fullname = (this.state.fullname) ? this.state.fullname : null;
    let email = (this.state.email) ? this.state.email : null;
    let phone = (this.state.phone) ? this.state.phone : null;
    let contact = { fullname: fullname, email: email, phone: phone };
    this.props.onContactUpdate(id, contact);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      fullname: '',
      email: '',
      phone: ''
    })
  }
  deleteContact(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onContactDelete(id);
    console.log(`Ooops, contact with id: '${id}' deleted!`);
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }
  handleFullnameChange(e) {
    this.setState({ fullname: e.target.value });
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="contact-box__contact" id={this.props.id}>
        <h3>Full Name: {this.props.fullname}</h3>
        <p>Phone: {this.props.phone}</p>
        <p>Email: {this.props.email}</p>
        <p>ID: {this.props.uniqueID}</p>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <a className="button" href='' onClick={this.updateContact}>update</a>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <a className="button" href='' onClick={this.deleteContact}>delete</a>
        {(this.state.toBeUpdated)
          ? (<form onSubmit={this.handleContactUpdate}>
            <input
              type='text'
              placeholder='Update Full Name'
              value={this.state.fullname}
              onChange={this.handleFullnameChange} />
            <input
              type='email'
              placeholder='Update Email'
              value={this.state.email}
              onChange={this.handleEmailChange} />
            <input
              type='text'
              className="danger"
              placeholder='Update Phone'
              value={this.state.phone}
              onChange={this.handlePhoneChange} />
            <input
              type='submit'
              value='Update contact' />
          </form>)
          : null}
      </div>
    )
  }
}
export default Contact;
