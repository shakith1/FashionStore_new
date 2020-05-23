import React, {Component} from "react";
import {Link} from 'react-router-dom';

class M_navbar extends Component{
    render() {
        return(
            <nav className={"navbar navbar-dark bg-info navbar-expand-lg"}>
                <Link to={"/"} className={"navbar-brand"}><i className={"fa fa-home"}/></Link>
                <div className={"collapse navbar-collapse"}>
                    <ul className={"navbar-nav mr-auto"}>
                        <li className={"navbar-item"}>
                            <Link to={"/manager"} className={"nav-link"}><span style={{color : "white"}}><i className={"fa fa-user"}/></span> Manager</Link>
                        </li>
                        <li className={"navbar-item"}>
                            <Link to={"/create"} className={"nav-link"}><span style={{color : "white"}}><i className={"fa fa-database"}/></span> Add Products</Link>
                        </li>
                        <li className={"navbar-item"}>
                            <Link to={"/addCategory"} className={"nav-link"}>Add Category</Link>
                        </li>
                    </ul>
                    <ul className={"navbar-nav"}>
                        <li className={"navbar-item"} >
                            <Link to={"/shopping-cart"} className={"nav-link"}><span style={{color : "white"}}><i className={"fa fa-shopping-cart "}/></span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default M_navbar;