import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../actions';

class Signup extends Component {

    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
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
            lastname: this.state.lastname
        }, this.props.user.users))

        {this.redirectUser()}

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

    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/users')
        },1000)
    }

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Sign Up</h2>

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

                    <button type="submit">Sign Up</button>
                    <div className="error">
                        {this.state.error}
                    </div>
                </form>
                
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

export default connect(mapStateToProps)(Signup)