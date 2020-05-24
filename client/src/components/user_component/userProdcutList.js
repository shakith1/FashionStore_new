import React, {Component} from "react";
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';



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
            <p><Button color={"primary"} className={"btn btn-primary form-control"}>Add To Cart</Button></p>
            </CardContent>
        </CardActionArea>
    </Card>
);

class UserProdcutList extends Component{

    constructor(props) {
        super(props);

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


    productList(){
        return this.state.products.map(currentproduct => {
            return <Product product={currentproduct} key={currentproduct._id}/>;
        })
    }

    render() {
        return(
            <Container maxWidth={"lg"}>
                <h3>Products In Store</h3>
                <div className={"row"}>
                    {this.productList()}
                </div>
            </Container>
        );
    }

}

export default UserProdcutList;