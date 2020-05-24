import React, {Component} from "react";
import axios from 'axios';
import Container from "@material-ui/core/Container";

class AddProducts extends Component{
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);

        this.state = {
            title : '',
            productName : '',
            description : '',
            color : '',
            size : '',
            price : 0,
            discount : 0,
            productImage : '',
            categories: []
        }
    }

    componentDidMount() {
        axios.get('/api/getCategory')
            .then(response => {
                if(response.data.length > 0 ){
                    this.setState({
                        categories : response.data.map(categories => categories.title),
                        title : response.data[0].title

                    })
                }
            })
    }

    onChangeCategory(e){
        this.setState({
            title : e.target.value
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

    onChangeImage(e){
        this.setState({
            productImage : e.target.files[0]
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

    onSubmit(e){
        e.preventDefault();
        const formData = new FormData();

        formData.set('title', this.state.title);
        formData.set('productName',this.state.productName);
        formData.set('description',this.state.description);
        formData.set('color',this.state.color);
        formData.set('size',this.state.size);
        formData.set('price',this.state.price);
        formData.set('discount',this.state.discount);
        formData.append('productImage', this.state.productImage);

console.log(formData)
        axios.post('/products/add', formData)
            .then(res => console.log(res.data));

        window.location = '/manager';


    }

    render() {
        return(
            <Container maxWidth={"md"}>
                <h5>Product Details</h5>

                <form  onSubmit={this.onSubmit} >
                    <br/>
                    <div className={"form-group "}>
                        <label className={"col-sm-2 col-form-label"}>Category </label>
                        <select required={true} className={"form-control"} onChange={this.onChangeCategory}>
                            {
                                this.state.categories.map(function (category) {
                                    return <option key={category} value={category} > {category}</option>;

                                })
                            }
                        </select>
                    </div>


                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Product Name </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} placeholder={"Product Name"} onChange={this.onChangeProductName} required={true}/>
                        </div>
                    </div>

                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Product Description </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} placeholder={"Product Description"} onChange={this.onChangeProductDescription} required={true}/>
                        </div>
                    </div>

                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Colors </label>
                        <div className={"col-sm-10"}>
                            <input type={"color"} id={"color"} className={"form-control"} onChange={this.onChangeColor}/>
                        </div>
                    </div>

                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Size </label>
                        <div className={"col-sm-10"}>
                            <select className={"form-control"} onChange={this.onChangeSize}>
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


                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Price </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} placeholder={"Price"} onChange={this.onChangePrice} required={true}/>
                        </div>

                    </div>

                    <div className={"form-group row"}>
                        <label className={"col-sm-2 col-form-label"}>Discount </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} placeholder={"Discount"} onChange={this.onChangeDiscount} required={true}/>
                        </div>

                    </div>

                    <div className={"custom-file mb-3"}>
                        <input type={"file"} name={"productImage"} className={"custom-file-input"} onChange={this.onChangeImage} required={true}/>
                        <label htmlFor={"file"} className={"custom-file-label"}>Choose a File</label>

                    </div>

                    <div className={"form-group"}>
                        <div className={"col-sm-2"}>
                            <button type={"submit"} className={"btn btn-success"} ><i className={"fa fa-database"}/> PRODUCT</button>
                        </div>

                    </div>
                </form>
            </Container>
        );
    }
}

export default AddProducts;