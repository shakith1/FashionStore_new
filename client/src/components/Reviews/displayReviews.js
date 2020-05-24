import React, {Component} from 'react';
import axios from 'axios';
import ReviewTable from './reviewTable';
import '../tablestyle.css';

export default class DisplayReviews extends Component{

    constructor(props) {
        super(props);
        this.state = {review : []};
    }

    //display the reviews on the table
    componentDidMount() {
        axios.get('/review')
            .then(response => {
                this.setState({review : response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabbRow(){
        return this.state.review.map(function (object, i) {
            return <ReviewTable obj={object} key={i}/>;
        });
    }

    render() {
        return(
            <div className = "container">
                <h4 align="center">Product Reviews</h4><br/>
                <div className = "row">
                    <div className = "col-12">

                        <table className = "table table-image" style={{marginTop:20}}>
                            <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price ($)</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Rating</th>
                                <th scope="col" colSpan="5">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.tabbRow()}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        );
    }
}
