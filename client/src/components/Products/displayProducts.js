import React, {Component} from 'react';
import axios from 'axios';
import ProductTable from './productTable';
import '../tablestyle.css';

export default class DisplayProducts extends Component{

    constructor(props) {
        super(props);
        this.state = {product : []};
    }

    //display the products on the products page
    componentDidMount() {
        axios.get('/product')
            .then(response => {
                this.setState({product : response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow(){
        return this.state.product.map(function (object, i) {
            return <ProductTable obj={object} key={i}/>;
        });
    }

    render() {
        return(
            <div className = "container">
                <h4 align="center">Products</h4><br/>
                <div className = "row">
                    <div className = "col-12">
                    <table className = "table table-image" style={{marginTop:20}}>

                        <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price ($)</th>
                            <th scope="col" colSpan="2">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.tabRow()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>

        );
    }
}






