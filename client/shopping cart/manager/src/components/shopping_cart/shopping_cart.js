import React, {Fragment}  from 'react';
import { connect} from 'react-redux';
import {Link} from "react-router-dom";
import kids8 from './images/kids8.jpg';
import kids6 from './images/kids6.jpg';
import kids7 from './images/kids7.jpg';
import kids2 from './images/kids2.jpg';

function ShoppingCart ({cartProps}){
    console.log(cartProps.cartCost);



    let productsInCart = [];

    Object.keys(cartProps.products).forEach( function(item) {
        console.log(item);
        console.log(cartProps.products[item].inCart);

        if(cartProps.products[item].inCart) {
            productsInCart.push(cartProps.products[item])
        }

        console.log(productsInCart)
    })

    const productImages = [kids8, kids6, kids7, kids2]

    productsInCart = productsInCart.map( (product, index) => {
        console.log("My product is");
        console.log(product);
        return (
            <Fragment>

                <div className="product2"><ion-icon name="close-circle"> </ion-icon><img src={productImages[index]} />
                <span className="sm-hide" >{product.name}</span>
                </div>
                <div className="price sm-hide">${product.price},00</div>
                <div className="quantity">
                    <ion-icon className="decrease" name="arrow-back-circle-outline"></ion-icon>
                    <span> {product.numbers}</span>
                    <ion-icon className="increase" name="arrow-forward-circle-outline"></ion-icon>
                </div>
                <div className="total">${product.numbers * product.price}.00</div>
            </Fragment>
        )
    })
    return (
        <div>
               <h1> cart page</h1>
            <div className="container-products">
                <div className="product-header">
                    <h5 className="product-title">Product</h5>
                    <h5 className="price sm-hide">Price</h5>
                    <h5 className="quantity">Quantity</h5>
                    <h5 className="total">Total</h5>
                </div>
                <div className="product3">
                    {productsInCart}
                </div>

                <div className="cartTotalContainer">
                    <h4 className="cartTotalTitle">Cart Total</h4>
                    <h4 className="cartTotal">{cartProps.cartCost}.00</h4>
                </div>
            </div>
            <h2> {cartProps.cartCost}</h2>



            <Link to={"/payment/add" }>Add Payment Details</Link>

        </div>
    );

}
const mapStateToProps = state => ({
    cartProps: state.cartState
})

export default connect(mapStateToProps)(ShoppingCart);


