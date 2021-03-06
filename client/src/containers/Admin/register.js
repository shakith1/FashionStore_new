import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getManagers, userRegister, sendMail } from '../../actions';
//import SendMail from './sendmail';

class Register extends PureComponent {

    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
    }

    componentWillMount() {
        this.props.dispatch(getManagers())
    }

    handleInputEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    handleInputPassword = (event) => {
        this.setState({ password: event.target.value })
    }
    handleInputName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleInputLastname = (event) => {
        this.setState({ lastname: event.target.value })
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({ error: '' });

        this.props.dispatch(userRegister({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname,
            role: "2"
        }, this.props.user.users))

        this.props.dispatch(sendMail({
            email:this.state.email,
            password:this.state.password
        }))

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.register === false) {
            this.setState({ error: 'Error, try again' })
        } else {
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: '',
            })
        }
    }

    showUsers = (user) => (
        user.users ?
            user.users.map(item => (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
            ))
            : null
    )

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add Manager</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Lastname"
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit">Add Manager</button>
                    <div className="error">
                        {this.state.error}
                    </div>
                </form>

                <div className="current_users">
                   <br/> <h4>Current Managers:</h4><br/>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(this.props)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register)