import React, {Component} from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";

export default class AddProducts extends Component{

    constructor(props){
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

    onChangeImagePath(e){
        this.setState({
            image_path: e.target.value
        });
    }

    onChangeProductName(e){
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductPrice(e){
        this.setState({
            product_price: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj = {
            image_path: this.state.image_path,
            product_name: this.state.product_name,
            product_price: this.state.product_price
        };

        //add new products to the database
        axios.post('/product/add', obj)
            .then(res =>
                console.log(res.data)
            );

        this.setState({
            image_path: '',
            product_name: '',
            product_price: ''
        })
    }

    render() {
        return(
            <div style={{marginTop: 10}} align="center">
                <h4 align="center">Add New Products</h4><br/>
                <form onSubmit={this.onSubmit}>

                    <Form.Group controlId="Name">
                        <Form.Label align="left">Add image path :
                            <Form.Control type="text" value={this.state.image_path} onChange={this.onChangeImagePath} />
                        </Form.Label>
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label align="left">Add product name :
                            <Form.Control type="text" value={this.state.product_name} onChange={this.onChangeProductName} />
                        </Form.Label>
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label align="left">Add product price :
                            <Form.Control type="text" value={this.state.product_price} onChange={this.onChangeProductPrice} />
                        </Form.Label>
                    </Form.Group>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            <svg className="bi bi-plus" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                                                   xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                            <path fill-rule="evenodd"
                                  d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                        </svg>
                            Add Product
                        </button >
                    </div>

                </form>
            </div>
        )
    }
}
