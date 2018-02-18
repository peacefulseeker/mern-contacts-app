
//Contact.js
import React, { Component } from "react";
import marked from "marked";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      fullname: '',
      text: '',
      phone: ''
    };
    //binding all our functions to this class
    this.deleteContact = this.deleteContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.handleFullnameChange = this.handleFullnameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
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
    let text = (this.state.text) ? this.state.text : null;
    let phone = (this.state.phone) ? this.state.phone : null;
    let contact = { fullname: fullname, text: text, phone: phone };
    this.props.onContactUpdate(id, contact);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      fullname: '',
      text: '',
      phone: ''
    })
  }
  deleteContact(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onContactDelete(id);
    console.log(`Ooops, contact with id: '${id}' deleted!`);
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
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
        <h3>{this.props.fullname}</h3>
        <p>ID: {this.props.uniqueID}</p>
        <p>Phone: {this.props.phone}</p>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <a className="button" href='' onClick={this.updateContact}>update</a>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <a className="button" href='' onClick={this.deleteContact}>delete</a>
        {(this.state.toBeUpdated)
          ? (<form onSubmit={this.handleContactUpdate}>
            <input
              type='text'
              placeholder='Update full name'
              value={this.state.fullname}
              onChange={this.handleFullnameChange} />
            <input
              type='text'
              placeholder='Update phone'
              value={this.state.phone}
              onChange={this.handlePhoneChange} />
            <input
              type='text'
              placeholder='Update email'
              value={this.state.text}
              onChange={this.handleTextChange} />
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
