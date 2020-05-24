import React, {Component} from 'react';
import axios from "axios";

class EditPayment extends Component {

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

    componentDidMount() {
        axios.get('http://localhost:5000/payment/view/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    person_name: response.data.person_name,
                    address: response.data.address,
                    con_num: response.data.con_num,
                    city: response.data.city
                })
            })
            .catch(error =>{
                console.log(error);
            })
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

    onSubmit(e){
        e.preventDefault();
        const formData = new FormData();

        formData.set('person_name',this.state.person_name);
        formData.set('address',this.state.address);
        formData.set('con_num',this.state.con_num);
        formData.set('city',this.state.city);


        const payment = {
            person_name: this.state.person_name,
            address: this.state.address,
            con_num : this.state.con_num,
            city : this.state.city
        }

        console.log(payment);

        axios.post('http://localhost:5000/payment/update/' + this.props.match.params.id, formData)
            .then(res => console.log(res.data));


    }
    render() {
        return (
            <div>
                <h1> Edit your details </h1>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>
                            Enter your name
                        </label>
                        <input type="text" className="form-control"  value={this.state.person_name} onChange={this.onChangePname}/>
                    </div>

                    <div className="form-group">
                        <label>
                            Enter your address
                        </label>
                        <input type="text" className="form-control"
                               value={this.state.address}
                               onChange={this.onChangeAddress}/>
                    </div>


                    <div className="form-group">
                        <label>
                            Enter your contact number
                        </label>
                        <input type="text" className="form-control"
                               value={this.state.con_num}
                               onChange={this.onChangeCnumber}/>
                    </div>

                    <div className="form-group">
                        <label>
                            Enter your city
                        </label>
                        <input type="text" className="form-control"
                               value={this.state.city}
                               onChange={this.onChangeCity} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="UPDATE PAYEMENT DETAILS" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditPayment;
