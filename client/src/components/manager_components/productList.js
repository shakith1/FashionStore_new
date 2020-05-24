import React, {Component} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';


const Product = props => (

    <Card className={"classes.root"}>
        <CardActionArea >
            <img src={require("../../images/"+props.product.productImage)} width={"250"} height={"250"}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.product.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <p>{props.product.description}</p>
                    <p> Color : <input type={"color"} defaultValue={props.product.color} disabled={true}/></p>
                    <p> Size : {props.product.size}</p>
                    <p> Price : {props.product.price}</p>
                    <p> Discount : {props.product.discount}% OFF</p>
                </Typography>
                <Link to={"/edit/" +props.product._id}><i className={"fa fa-edit"}/> EDIT</Link> | <a href={"#"} onClick={() => {props.deleteProduct(props.product._id)}} style={{color : "red"}}><i className={"fa fa-trash"}/> DEL</a>
            </CardContent>
        </CardActionArea>
    </Card>

);

class ProductList extends Component{

    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {products : []};
    }

    componentDidMount() {
        axios.get('/products')
            .then(response => {
                this.setState({products : response.data})
            })
            .catch(error => {
                console.log(error);
            })

    }

    deleteProduct(id){
        axios.delete('/products/' +id)
            .then(res => console.log(res.data))
        this.setState({
            products: this.state.products.filter(el => el._id !== id)
        })
    }


    productList(){
        return this.state.products.map(currentproduct => {
            return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
        })
    }

    render() {
        return(
            <Container maxWidth={"lg"} className={"list"}>
                <h3>Products In Database</h3>
                <div className={"row"}>
                    {this.productList()}
                </div>
            </Container>
        );
    }

}

export default ProductList;