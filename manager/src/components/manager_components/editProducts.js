import React, {Component} from "react";
import axios from 'axios';

class EditProducts extends Component{

    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);

        this.state = {
            productName : '',
            description : '',
            color : '',
            size : '',
            price : 0,
            discount : 0,
            productImage: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    productName: response.data.productName,
                    description: response.data.description,
                    color: response.data.color,
                    size: response.data.size,
                    price: response.data.price,
                    discount: response.data.discount,
                })
            })
            .catch(error =>{
                console.log(error);
            })
    }

    onChangeProductName(e){
        this.setState({
            productName : e.target.value
        });
    }

    onChangeProductDescription(e){
        this.setState({
            description : e.target.value
        });
    }

    onChangeColor(e){
        this.setState({
            color : e.target.value
        });
    }

    onChangeSize(e){
        this.setState({
            size : e.target.value
        });
    }

    onChangePrice(e){
        this.setState({
            price : e.target.value
        });
    }

    onChangeDiscount(e){
        this.setState({
            discount : e.target.value
        });
    }

    onChangeImage(e){
        this.setState({
            productImage : e.target.files[0]
        });
    }

    onSubmit(e){
        e.preventDefault();
        const formData = new FormData();

        formData.set('productName',this.state.productName);
        formData.set('description',this.state.description);
        formData.set('color',this.state.color);
        formData.set('size',this.state.size);
        formData.set('price',this.state.price);
        formData.set('discount',this.state.discount);
        formData.append('productImage', this.state.productImage);

        const product = {
            productName: this.state.productName,
            description: this.state.description,
            color : this.state.color,
            size : this.state.size,
            price : this.state.price,
            discount : this.state.discount,
        }

        console.log(product);

        axios.post('http://localhost:5000/products/update/' + this.props.match.params.id, formData)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return(
            <div className={"container"}>
                <form className={"jumbotron"} onSubmit={this.onSubmit}>
                    <h5>Edit Product Details</h5>
                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Product Name </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} value={this.state.productName} onChange={this.onChangeProductName}/>
                        </div>
                    </div>
                    <hr/>
                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Product Description </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} value={this.state.description} onChange={this.onChangeProductDescription}/>
                        </div>
                    </div>
                    <hr/>
                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Colors </label>
                        <div className={"col-sm-10"}>
                            <input type={"color"} id={"color"} value={this.state.color} className={"form-control"} onChange={this.onChangeColor}/>
                        </div>
                    </div>
                    <hr/>
                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Size </label>
                        <div className={"col-sm-10"}>
                            <select className={"form-control"} value={this.state.size} onChange={this.onChangeSize}>
                                <option className={"dropdown-item"} >Select a Size</option>
                                <option className={"dropdown-item"} >XXS</option>
                                <option className={"dropdown-item"} >XS</option>
                                <option className={"dropdown-item"} >S</option>
                                <option className={"dropdown-item"} >M</option>
                                <option className={"dropdown-item"} >L</option>
                                <option className={"dropdown-item"} >XL</option>
                                <option className={"dropdown-item"} >XXL</option>
                                <option className={"dropdown-item"} >3XL</option>
                            </select>
                        </div>
                    </div>
                    <hr/>

                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Price </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} value={this.state.price} onChange={this.onChangePrice}/>
                        </div>

                    </div>
                    <hr/>
                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Discount </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} value={this.state.discount} onChange={this.onChangeDiscount}/>
                        </div>

                    </div>

                    <hr/>
                    <div className={"custom-file mb-3"}>
                        <input type={"file"} name={"productImage"} className={"custom-file-input"} onChange={this.onChangeImage}/>
                        <label htmlFor={"file"} className={"custom-file-label"}>Choose a File</label>
                    </div>

                    <div className={"form-group"}>
                        <div className={"col-sm-2"}>
                            <button type={"submit"} className={"btn btn-primary"} >Edit Product</button>
                        </div>

                    </div>
                </form>

            </div>
        );
    }
}

export default EditProducts;