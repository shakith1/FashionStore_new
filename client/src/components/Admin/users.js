import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions';
import { Link } from 'react-router-dom';

class Users extends Component {

    componentWillMount() {
        this.props.dispatch(getUsers())
    }

    showUsers = (user) => (
        user.users ? 
            user.users.map(item => (
                <tr key={item._id}>
                    <td><Link to={
                        `/user/edit-user/${item._id}`
                    }>
                        {item.name}
                    </Link></td>
                    <td>{item.lastname}</td>
                    <td>
                        {item.email}
                    </td>
                    
                    <td>
                        {item.role}
                    </td>
                </tr>
            ))
        :null
    )

    
    render() {
        let user = this.props.user;
        return (
            <div className="users">
                <h4>Users</h4><br/>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUsers(user)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Users)