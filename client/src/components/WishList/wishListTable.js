import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class WishListTable extends Component {

    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(){

        //remove products added to the wishlist
        axios.delete('/fashion/delete/' + this.props.obj._id)
            .then((res) => {
                console.log('Wish List product successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (

            <tr>
                <td className="w-25">
                    <img src={this.props.obj.imagePath} className="img-fluid img-thumbnail" alt="..."/>
                </td>

                <td>
                    {this.props.obj.dressName}
                </td>

                <td>
                    {this.props.obj.dressPrice}
                </td>

                <td>
                    <button onClick={this.deleteProduct} className="btn btn-danger">
                        Remove
                        <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                            <path fill-rule="evenodd"
                                  d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                        </svg>
                    </button>
                </td>
            </tr>

        );
    }
}
