class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    loadUsersFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.fetchUrl, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }
    componentDidMount() {
        this.loadUsersFromServer();
        window.setInterval(
            () => this.loadUsersFromServer(),
            this.props.pollInterval,
        );
    }
    render() {
        return (
            <div className="container">
                <h1>Users</h1>
                <UserList data={this.state.data} />
                <hr />
                <UserForm submitUrl="/User/Add" />
            </div >
        );
    }
}
class UserList extends React.Component {
    render() {
        const Users = this.props.data.map(user => (
            <User firstName={user.firstName} key={user.id} id={user.id} lastName={user.lastName} email={user.email}>
            </User>
        ));
        return <table>
            <thead>
                <tr>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.props.data.map((user =>
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td><DeleteBtn id={user.id} /></td>
                    </tr>
                ))}
            </tbody>
        </table >;
        return <div className="userList">{Users}</div>;
    }
}
class User extends React.Component {
    render() {
        return (
            <div className="user">
                <h2 className="id">{this.props.id}</h2>
                <h2 className="firstName">{this.props.firstName}</h2>
                <h2 className="lastName">{this.props.lastName}</h2>
                <h2 className="email">{this.props.email}</h2>
            </div>
        );
    }
}
class DeleteBtn extends React.Component {
    handleClick = () => {
        console.log(this.props.id);
        const data = new FormData();
        data.append('Id', this.props.id);
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/User/Delete', true);
        xhr.send(data);
        this.setState({ firstName: '', lastName: '', email: '' });
    }
    render() {
        return (
            <button type="button" onClick={this.handleClick}>Delete</button>
        );
    }
}
class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', email: '' };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    handleFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
    }
    handleLastNameChange(e) {
        this.setState({ lastName: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const firstName = this.state.firstName.trim();
        const lastName = this.state.lastName.trim();
        const email = this.state.email.trim();
        if (!firstName || !lastName || !email) {
            return;
        }
        const data = new FormData();
        data.append('FirstName', firstName);
        data.append('LastName', lastName);
        data.append('Email', email);

        const xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.send(data);
        this.setState({ firstName: '', lastName: '', email: '' });
    }
    render() {
        return (
            <form className="userForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your First Name" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                <input type="text" placeholder="Your Last Name" value={this.state.lastName} onChange={this.handleLastNameChange} />
                <input type="text" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailChange} />
                <input type="submit" value="Add User" />
            </form>
        );
    }
}

ReactDOM.render(<Container fetchUrl="/User/All" pollInterval={2000} />, document.getElementById('content'));