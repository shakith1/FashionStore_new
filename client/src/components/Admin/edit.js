import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser, deleteUser, clearUser } from '../../actions';

class EditUser extends PureComponent {

    state = {
        formdata: {
            _id: this.props.match.params.id,
            name: '',
            lastname: '',
            email: '',
            password: '',
            role: '',
            error: ''
        }
    }

    handleInput = (event, name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value

        this.setState({
            formdata: newFormdata
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateUser(this.state.formdata))
    }

    deleteUser = () => {
        this.props.dispatch(deleteUser(this.props.match.params.id))
    }

    componentWillMount() {
        this.props.dispatch(getUser(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps) {
        let user = nextProps.user.user;
        this.setState({
            formdata: {
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        })
    }

    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/users')
        },1000)
    }

    componentWillUnmount() {
        this.props.dispatch(clearUser())
    }

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container article">
                {
                    user.updateUser ?
                        <div className="edit_confirm">
                            User updated Successfully!!!
                            {this.redirectUser()}
                        </div>
                        : null
                }
                {
                    user.userDeleted ?
                        <div className="red_tag">
                            User Deleted
                            {this.redirectUser()}
                        </div>
                        : null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit User</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.formdata.name}
                            onChange={(event) => this.handleInput(event, 'name')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Lastname"
                            value={this.state.formdata.lastname}
                            onChange={(event) => this.handleInput(event, 'lastname')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.formdata.email}
                            onChange={(event) => this.handleInput(event, 'email')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.formdata.password}
                            onChange={(event) => this.handleInput(event, 'password')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="input"
                            placeholder="Enter Role"
                            value={this.state.formdata.role}
                            onChange={(event) => this.handleInput(event, 'role')}
                        />
                    </div>

                    <button type="submit">Edit User</button>

                    <div className="delete_post">
                        <div className="button"
                            onClick={this.deleteUser}
                        >
                            Delete User
                        </div>
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

export default connect(mapStateToProps)(EditUser)