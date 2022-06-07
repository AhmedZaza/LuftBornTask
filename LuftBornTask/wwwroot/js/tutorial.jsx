const data = [
    { id: 1, author: 'Daniel Lo Nigro', text: 'Hello ReactJS.NET World!' },
    { id: 2, author: 'Pete Hunt', text: 'This is one comment' },
    { id: 3, author: 'Jordan Walke', text: 'This is *another* comment' },
];
class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    loadCommentsFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.fetchUrl, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        window.setInterval(
            () => this.loadCommentsFromServer(),
            this.props.pollInterval,
        );
    }
    render() {
        return (
            <div className="container">
                <h1>Users</h1>
                <UserList data={this.state.data} />
                <UserForm submitUrl="/User/Add" />
            </div>
        );
    }
}
class UserList extends React.Component {
    render() {
        const commentNodes = this.props.data.map(user => (
            <User firstName={user.firstName} key={user.id} id={user.id} lastName={user.lastName} email={user.email}>
            </User>
        ));
        return <table>
            {this.props.data.map((user =>
                <tr key={user.id}>{user.firstName}</tr>
            ))}
        </table>;
        //return <div className="userList">{commentNodes}</div>;
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
        // TODO: send request to the server
        const data = new FormData();
        data.append('FirstName', firstName);
        data.append('LastName', lastName);
        data.append('Email', email);

        const xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        //xhr.onload = () => this.loadCommentsFromServer();
        xhr.send(data);
        this.setState({ firstName: '', lastName: '', email: '' });
    }
    render() {
        return (
            <form className="userForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your First Name" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                <input type="text" placeholder="Your Last Name" value={this.state.lastName} onChange={this.handleLastNameChange} />
                <input type="text" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailChange} />
                <input type="submit" value="Post" />
            </form>
        );
    }
}

ReactDOM.render(<Container fetchUrl="/User/All" pollInterval={2000} />, document.getElementById('content'));