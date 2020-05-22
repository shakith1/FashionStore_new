import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';

const DropDownItems = () => {

    const items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Profile',
            link: '/user',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Admins',
            link: '/user/register',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Login',
            link: '/login',
            restricted: false,
            exclude: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My reviews',
            link: '/user/user-reviews',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add reviews',
            link: '/user/add',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Logout',
            link: '/user/logout',
        }
    ]

    const element = (item, i) => (
        
             <Dropdown.Item >{item.text}</Dropdown.Item>
        
    )

    const showItems = () => {
        
        items.map((item,i)=>{
            return element(item,i)
        })
    }


    return (
        <div>
            {showItems()}
        </div>
    );
};

export default DropDownItems;