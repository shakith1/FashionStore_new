import React, {Component} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

const Product = props => (
    <div className={"card w-25"}>
        <div className={"card-body"}>
            <img src={require("../../images/"+props.product.productImage)} width={"250"} height={"250"}/>
            <h4>{props.product.productName}</h4>
            <p>{props.product.description}</p>
            <p> Color : <input type={"color"} defaultValue={props.product.color} disabled={true}/></p>
            <p> Size : {props.product.size}</p>
            <p> Price : {props.product.price}</p>
            <p> Discount : {props.product.discount}% OFF</p>
            <Link to={"/edit/" +props.product._id}>Edit</Link> | <a href={"#"} onClick={() => {props.deleteProduct(props.product._id)}}>DELETE</a>
        </div>

    </div>
);

class ProductList extends Component{

    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {products : []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/')
            .then(response => {
                this.setState({products : response.data})
            })
            .catch(error => {
                console.log(error);
            })

    }

    deleteProduct(id){
        axios.delete('http://localhost:5000/products/' +id)
            .then(res => console.log(res.data))
        this.setState({
            products: this.state.products.filter(el => el._id !== id)
        })
    }


    productList(){
        return this.state.products.map(currentproduct => {
            return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
        })
    }

    render() {
        return(
            <div>
                <h3>Products In Database</h3>
                <div className={"row"}>
                    {this.productList()}
                </div>
            </div>
        );
    }

}

export default ProductList;