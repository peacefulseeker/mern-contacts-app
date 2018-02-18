
//Contact.js
import React, { Component } from "react";
import marked from "marked";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: '',
      text: '',
      phone: ''
    };
    //binding all our functions to this class
    this.deleteContact = this.deleteContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
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
    //if author or text changed, set it. if not, leave null and our PUT
    //request will ignore it.
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let phone = (this.state.phone) ? this.state.phone : null;
    let contact = { author: author, text: text, phone: phone };
    this.props.onContactUpdate(id, contact);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: '',
      phone: ''
    })
  }
  deleteContact(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onContactDelete(id);
    console.log('oops, contact deleted!');
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }


  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="contact-box__contact" id={this.props.id}>
        <h3>{this.props.author}</h3>
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
              value={this.state.author}
              onChange={this.handleAuthorChange} />
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
