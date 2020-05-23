import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ user }) => {

    const items = [
        {
            type: 'nav-item',
            text: 'Shopping Cart',
            link: '/shopping-cart',
            restricted: true,
            manager: true,
            user: true
        },
        {
            type: 'nav-item',
            text: 'Register',
            link: '/register',
            restricted: true,
            include: false,
            manager: false
        },
        {
            type: 'nav-item',
            text: 'Sign Up',
            link: '/user/register',
            restricted: false,
            exclude: true
        },
        {
            type: 'nav-item',
            text: 'Add Category',
            link: '/addCategory',
            restricted: true,
            include: false,
            manager: false
        },
        {
            type: 'nav-item',
            text: 'Login',
            link: '/login',
            restricted: false,
            exclude: true
        },
        {
            type: 'nav-item',
            text: 'User List',
            link: '/users',
            restricted: true,
            include: false,
            manager: true
        },
        {
            type: 'nav-item',
            text: 'My Profile',
            link: '/user',
            restricted: true,
            manager: true,
            user: true
        },
        {
            type: 'nav-item',
            text: 'Logout',
            link: '/user/logout',
            restricted: true,
            manager: true,
            user: true
        },
    ]

    const element = (item, i) => (
        <li key={i} className={item.type}>
            <Link className="nav-link" to={item.link}>
                {item.text}
            </Link>
        </li>
    )
    console.log(user)
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <Link className="navbar-brand" to="/" >Fashion Store</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault" >
                    <ul className="navbar-nav mr-auto">
                        {
                            user.login ?
                                items.map((item, i) => {
                                    if (user.login.isAuth) {
                                        if (user.login.role === 1) {
                                            return !item.include && !item.exclude ?

                                                element(item, i)
                                                : null
                                        } else if (user.login.role === 0) {
                                            return !item.exclude && item.user ?

                                                element(item, i)
                                                : null
                                        } else if (user.login.role === 2) {
                                            return item.manager && !item.exclude ?

                                                element(item, i)
                                                : null
                                        }

                                    } else {
                                        return !item.restricted ?
                                            element(item, i)
                                            : null
                                    }
                                })
                                : null
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header)