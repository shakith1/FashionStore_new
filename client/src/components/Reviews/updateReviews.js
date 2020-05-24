import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class UpdateReviews extends Component {

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
            image: '',
            name: '',
            price: '',
            user: '',
            comments: '',
            rating: ''

        }
    }

    //display the already added reviews
    componentDidMount() {
        axios.get('/review/n/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    image: res.data.image,
                    name: res.data.name,
                    price: res.data.price,
                    user: res.data.user,
                    comments: res.data.comments,
                    rating: res.data.rating
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

        //update reviews
        axios.put('/review//update/' + this.props.match.params.id, obj)
            .then((res) => {
                console.log(res.data)
                console.log('Review successfully updated!')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to review page
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

                    <Form.Group controlId="Name">
                        <Form.Label align="left">User Name
                            <Form.Control type="text" value={this.state.user} onChange={this.onChangeUserName} />
                        </Form.Label>
                    </Form.Group>

                    </fieldset>

                    <Form.Group controlId="Name">
                        <Form.Label align="left">Comment
                            <textarea className="form-control" value={this.state.comments} onChange={this.onChangeComment} rows="3"></textarea>
                        </Form.Label>
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label align="left">Rating (1-10)
                            <Form.Control type="number" value={this.state.rating} onChange={this.onChangeRating} />
                        </Form.Label>
                    </Form.Group>

                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-outline-primary"/>
                    </div>

                </Form>
            </div>
        );
    }
}
