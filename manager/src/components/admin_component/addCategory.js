import React, {Component} from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";

class AddCategory extends Component{
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title : '',
            description : ''
        }
    }

    onChangeTitle(e){
        this.setState({
            title : e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        /*const formData = new FormData();
        formData.set('title', this.state.title);
        formData.set('description', this.state.description);*/

        const category = {
            title: this.state.title,
            description: this.state.description,
        }


        axios.post('http://localhost:5000/category/api/category', category)
            .then(res => console.log(res.data));

        window.location = '/';
    }


    render() {
        return(
            <div>
                <Container maxWidth={"md"}>
                <h5>Category Details</h5>

                <form onSubmit={this.onSubmit}>
                    <br/>
                    <div className={"form-group row justify-content-center"}>
                        <label className={"col-sm-2 col-form-label"}>Title </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} placeholder={"Category Title"} onChange={this.onChangeTitle} required={true}/>
                        </div>
                    </div>

                    <div className={"form-group row justify-content-center"}>
                        <label className={"col-sm-2 col-form-label"}>Description </label>
                        <div className={"col-sm-10"}>
                            <input type={"text"} className={"form-control"} placeholder={"Category Description"} onChange={this.onChangeDescription} required={true}/>
                        </div>
                    </div>

                    <div className={"form-group"}>
                        <div className={"col-sm-2"}>
                            <button type={"submit"} className={"btn btn-success"} ><i className={"fa fa-database"}/> CATEGORY</button>
                        </div>

                    </div>

                </form>
                </Container>
            </div>

        );
    }
}

export default AddCategory;