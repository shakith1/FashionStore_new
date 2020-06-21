import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Payment = props => (

        <tr>
            <th>{props.payment.person_name}</th>
            <th>{props.payment.address}</th>
            <th>{props.payment.con_num}</th>
            <th>{props.payment.city}</th>
            <th>

                <Link to={"/payment/edit/" + props.payment._id}> Edit </Link> | <a href={"#"} onClick={() => {props.deletePayment(props.payment._id)}}>DELETE</a>
            </th>

        </tr>

)



class ViewPayment extends Component {



    constructor(props) {
        super(props);
        this.deletePayment = this.deletePayment.bind(this);
        this.state = {
            payment: []
        }
    }

    componentDidMount() {
        axios.get('/payment/view/')
            .then(response=> {
                this.setState({payment : response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deletePayment(id) {
        axios.delete('/payment/' +id)
            .then(res => console.log(res.data));
        this.setState({
            payment: this.state.payment.filter(el => el._id !== id)
        })
    }

    paymentList() {
        return this.state.payment.map(currentpayment => {
            return <Payment payment={currentpayment} deletePayment={this.deletePayment} key={currentpayment._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h1> Payment details</h1>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.paymentList() }
                    </tbody>
                </table>


            </div>
        );
    }
}

export default ViewPayment;
