import React, {Component} from 'react';
import axios from 'axios';
import WishListTable from './wishListTable';
import '../tablestyle.css';

export default class WishList extends Component{

    constructor(props) {
        super(props);
        this.state = {fashion : []};
    }

    //display the products added to the wishlist
    componentDidMount() {
        axios.get('/fashion')
            .then(response => {
                this.setState({fashion : response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabsRow(){
        return this.state.fashion.map(function (object, i) {
            return <WishListTable obj={object} key={i}/>;
        });
    }

    render() {
        return(
            <div className = "container">
                <h4 align="center">Wish List</h4><br/>
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
                            {this.tabsRow()}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        );
    }
}
