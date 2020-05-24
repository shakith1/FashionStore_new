import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import axios from 'axios';

export default class AddReviews extends Component {

    constructor(props) {
        super(props);

        this.onChangeImagePath = this.onChangeImagePath.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            image_path: '',
            product_name: '',
            product_price: '',
            user: '',
            comments: '',
            rating: ''

        }
    }

    //display the image,name and the price of the products
    componentDidMount() {
        axios.get('/product/edit/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    image: res.data.image_path,
                    name: res.data.product_name,
                    price: res.data.product_price
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeImagePath(e) {
        this.setState({ image: e.target.value })
    }

    onChangeProductName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeProductPrice(e) {
        this.setState({  price: e.target.value })
    }

    onChangeUserName(e) {
        this.setState({ user: e.target.value })
    }

    onChangeComment(e) {
        this.setState({ comments: e.target.value })
    }

    onChangeRating(e) {
        this.setState({ rating: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault()

        const obj = {
            image: this.state.image,
            name: this.state.name,
            price: this.state.price,
            user: this.state.user,
            comments: this.state.comments,
            rating: this.state.rating
        };

        //add new reviews
        axios.post('/review/add', obj)
            .then(res =>
                console.log(res.data)
            );

        this.setState({
            user: '',
            comments: '',
            rating: ''
        })

        //Redirect to Reviews Page after submitting/adding
        this.props.history.push('/view')
    }

    render() {
        return (

            <div className="form-wrapper" align="center">
                <Form onSubmit={this.onSubmit}>

                    <fieldset disabled>

                        <Form.Group controlId="Name">
                            <img src={this.state.image} className="img-fluid img-thumbnail" alt="Responsive image"/>
                        </Form.Group>

                        <Form.Group controlId="Name">
                            <Form.Label align="left">Name
                                <Form.Control type="text" value={this.state.name} onChange={this.onChangeProductName} />
                            </Form.Label>
                        </Form.Group>

                        <Form.Group controlId="Name">
                            <Form.Label align="left">Price $
                                <Form.Control type="text" value={this.state.price} onChange={this.onChangeProductPrice} />
                            </Form.Label>
                        </Form.Group>

                    </fieldset>

                    <Form.Group controlId="Name">
                        <Form.Label align="left">User Name
                            <Form.Control type="text" value={this.state.user} onChange={this.onChangeUserName} />
                        </Form.Label>
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label align="left">Comment
                        <textarea className="form-control" value={this.state.comments} onChange={this.onChangeComment} rows="3"></textarea>
                        </Form.Label>
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label align="left">Rate (1-10)
                            <Form.Control type="number" value={this.state.rating} onChange={this.onChangeRating} />
                        </Form.Label>
                    </Form.Group>

                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-primary">
                            <svg className="bi bi-plus" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                                <path fill-rule="evenodd"
                                      d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                            </svg>
                            Add Review
                        </button>
                    </div>

                </Form>
            </div>
        );
    }
}
