import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import axios from 'axios';

export default class AddWishList extends Component {

    constructor(props) {
        super(props);

        this.onChangeImagePath = this.onChangeImagePath.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            image_path: '',
            product_name: '',
            product_price: ''
        }
    }

    componentDidMount() {

        //display the products
        axios.get('/product/edit/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    image_path: res.data.image_path,
                    product_name: res.data.product_name,
                    product_price: res.data.product_price
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeImagePath(e) {
        this.setState({ image_path: e.target.value })
    }

    onChangeProductName(e) {
        this.setState({ product_name: e.target.value })
    }

    onChangeProductPrice(e) {
        this.setState({  product_price: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const obj = {
            imagePath: this.state.image_path,
            dressName: this.state.product_name,
            dressPrice: this.state.product_price
        };

        //add products to wishlist
        axios.post('/fashion/add', obj)
            .then(res =>
                console.log(res.data)
            );

        // Redirect to wishlist page
        this.props.history.push('/index')
    }


    render() {
        return (
            <div className="form-wrapper" align="center">
                <Form onSubmit={this.onSubmit}>

                    <fieldset disabled>
                        <Form.Group controlId="Name">
                            <img src={this.state.image_path} className="img-fluid img-thumbnail" alt="Responsive image"/>
                        </Form.Group>

                        <Form.Group controlId="Name">
                            <Form.Label align="left">Name
                                <Form.Control type="text" value={this.state.product_name} onChange={this.onChangeProductName} />
                            </Form.Label>
                        </Form.Group>

                        <Form.Group controlId="Name">
                            <Form.Label align="left">Price $
                                <Form.Control type="text" value={this.state.product_price} onChange={this.onChangeProductPrice} />
                            </Form.Label>
                        </Form.Group>
                    </fieldset>

                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-primary">
                            Add To Wish List
                        </button>
                    </div>

                </Form>
            </div>);
    }
}
