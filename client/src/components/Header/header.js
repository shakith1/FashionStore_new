import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import FontAwesome from 'react-fontawesome';

import DropDownItems from './Dropdown/dropdown_items';

class Header extends Component {

    state = {
        showNav: false
    }

    onHideNav = () => {
        this.setState({
            showNav: false
        })
    }

    render() {
        return (
            <div>
                <div className="open_nav">
                    <FontAwesome className="fa fa-camera-retro fa-lg"
                        onClick={() => this.setState({ showNav: true })}
                        style={{
                            color: '#ffffff',
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                    />
                </div>

                <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                    <Link className="navbar-brand" to="/" >Fashion Store</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault" >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/shopping-cart">Shopping Cart</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/user/register">User SignUp</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/addCategory">Add Category</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Users List</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/user">My Profile</Link>
                            </li>
                            {/* <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Username
                        </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <DropDownItems />
                            </Dropdown.Menu> 
                        </Dropdown> */}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}


export default Header;