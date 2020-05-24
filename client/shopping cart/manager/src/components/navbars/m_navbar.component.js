import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {getNumbers} from "../shopping_cart/actions/getAction";


function M_navbar (props){

    useEffect(()=>{
        getNumbers();
    }, []);

        return(
            <nav className={"navbar navbar-dark bg-dark navbar-expand-lg"}>



                <Link to={"/"} className={"navbar-brand"}>Home Page</Link>

                <div className={"collapse navbar-collapse"}>
                    <ul className={"navbar-nav mr-auto"}>
                        <li className={"navbar-item"}>
                            <Link to={"/manager"} className={"nav-link"}>Manager</Link>
                        </li>
                        <li className={"navbar-item"}>
                            <Link to={"/create"} className={"nav-link"}>Create Product Details</Link>
                        </li>
                        <li className={"navbar-item"}>
                            <Link to={"/kids"} className={"nav-link"}> Kids </Link>
                        </li>
                        <li className={"navbar-item"}>

                            <Link to={"/shoppingcart"} className={"nav-link1"} > <ion-icon name="cart-outline"></ion-icon>Cart<span>{props.cartProps.cartNumbers}</span></Link>
                        </li>



                    </ul>
                </div>
            </nav>
        );

}

const mapStateToProps  = state => ({
    cartProps: state.cartState
})
export default connect(mapStateToProps, {getNumbers})(M_navbar);
