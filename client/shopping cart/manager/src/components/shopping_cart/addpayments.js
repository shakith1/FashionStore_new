import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class Addpayments extends Component {

    constructor(props) {
        super(props);
        this.onChangePname = this.onChangePname.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCnumber = this.onChangeCnumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            person_name: '',
            address: '',
            con_num: '',
            city: ''

        }
    }

    onChangePname(e){
        this.setState({
            person_name: e.target.value
        });
    }

    onChangeCity(e){
        this.setState({
            city: e.target.value
        });
    }

    onChangeCnumber(e){
        this.setState({
            con_num: e.target.value
        });
    }

    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            person_name: this.state.person_name,
            address: this.state.address,
            con_num: this.state.con_num,
            city: this.state.city

        };
        axios.post('http://localhost:5000/payment/add', obj).then(res => console.log(res.data));

        this.setState({
            person_name: '',
            address: '',
            con_num: '',
            city: ''

        })
    }



        render() {
        return (
            <div style={{marginTop: 10}}>
                <h3> Add your payment details</h3>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>
                            Enter your name
                        </label>
                        <input type="text" className="form-control" placeholder={"Name"} value={this.state.person_name} onChange={this.onChangePname}/>
                    </div>

                    <div className="form-group">
                        <label>
                            Enter your address
                        </label>
                        <input type="text" className="form-control" placeholder={"Address"}
                               value={this.state.address}
                               onChange={this.onChangeAddress}/>
                    </div>


                    <div className="form-group">
                        <label>
                            Enter your contact number
                        </label>
                        <input type="text" className="form-control" placeholder={"Contact Number"}
                               value={this.state.con_num}
                               onChange={this.onChangeCnumber}/>
                    </div>

                    <div className="form-group">
                        <label>
                            Enter your city
                        </label>
                        <input type="text" className="form-control" placeholder={"City"}
                               value={this.state.city}
                               onChange={this.onChangeCity} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="ADD PAYEMENT DETAILS" className="btn btn-primary"/>
                    </div>
                </form>

             <button ><Link to={"/payment/view" }>View Payment Details</Link></button>

            </div>
        );
    }
}

export default Addpayments;
