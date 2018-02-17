class ContactsApp extends React.Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    };
  }
  handleUserInput(searchTerm) {
    this.setState({ filterText: searchTerm })
  }
  render() {
    return (
      <div className="container">
        <SearchBar filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)} />
        <ContactList contacts={this.props.contacts}
          filterText={this.state.filterText} />
      </div>
    );
  }
}
ContactsApp.propTypes = {
  contacts: React.PropTypes.arrayOf(React.PropTypes.object)
}

class SearchBar extends React.Component {
  handleChange(event) {
    this.props.onUserInput(event.target.value)
  }
  render() {
    return <input className="form-control"
      type="search"
      placeholder="search"
      value={this.props.filterText}
      onChange={this.handleChange.bind(this)} />
  }
}

SearchBar.propTypes = {
  onUserInput: React.PropTypes.func.isRequired,
  filterText: React.PropTypes.string.isRequired
}

class ContactList extends React.Component {
  render() {
    let filteredContacts = this.props.contacts.filter(
      (contact) => contact.name.indexOf(this.props.filterText) !== -1
    );
    let contactItem = filteredContacts.map((item, index) => {
      return <ContactItem key={index} name={item.name} email={item.email} />
    });
    return (
      <ul>
        {contactItem}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: React.PropTypes.arrayOf(React.PropTypes.object)
}

class ContactItem extends React.Component {
  render() {
    return (
      <li>
        <strong>{this.props.name}</strong> - {this.props.email}
      </li>
    );
  }
}

ContactItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired
}

let contacts = [
  { name: "Cassio Zen", email: "cassiozen@gmail.com" },
  { name: "Dan Abramov", email: "gaearon@somewhere.com" },
  { name: "Pete Hunt", email: "floydophone@somewhere.com" },
  { name: "Paul O’Shannessy", email: "zpao@somewhere.com" },
  { name: "Ryan Florence", email: "rpflorence@somewhere.com" },
  { name: "Sebastian Markbage", email: "sebmarkbage@here.com" },
]

ReactDOM.render(
  <ContactsApp contacts={contacts} />,
  document.getElementById("container")
)
