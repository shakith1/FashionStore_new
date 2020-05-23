import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addCategory, getCategories } from '../actions';

class AddCategory extends PureComponent {

    state = {
        title: '',
        description: '',
        error:''
    }

    componentWillMount() {
        this.props.dispatch(getCategories())
    }

    handleInputTitle = (event) => {
        this.setState({ title: event.target.value })
    }
    handleInputDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.category.newcategory === false){
            this.setState({error:'Error,try again'})
        } else{
            this.setState({
                title: '',
                description: '',
                error:''
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''});

        this.props.dispatch(addCategory({
            title:this.state.title,
            description:this.state.description
        }))
        
    }

    showCategories = (category) => {

    }

    render() {
        let category = this.props;
        console.log(category)
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add Category</h2><br/>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter title"
                            value={this.state.title}
                            onChange={this.handleInputTitle}
                        />
                    </div>

                    <div className="form_element">
                        <textarea
                            placeholder="Enter Description"
                            value={this.state.description}
                            onChange={this.handleInputDescription}
                        />
                    </div>

                    <button type="submit">Add Category</button>
                    <div className="error">
                        {this.state.error}
                    </div>
                </form>
                <div>
                   <br/> <h4>Categories</h4> <br/>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showCategories(category)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}
function mapStateToProps(state){
    return{
        category:state.category
    }
}

export default connect(mapStateToProps)(AddCategory)