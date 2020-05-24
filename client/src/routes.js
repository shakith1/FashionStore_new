import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ShoppingCart from './components/shopping-cart';
import Home from './components/home';
import Layout from './HOC/layout';
import Register from './containers/Admin/register';
import Signup from './containers/signup';
import AddCategory from './containers/addCategory';
import Login from './containers/Admin/login';
import Users from './components/Admin/users';
import EditUser from './components/Admin/edit';
import User from './components/Admin';
import Auth from './HOC/auth';
import Logout from './components/Admin/logout';
import UserProdcutList from "./components/user_component/userProdcutList";
import ProductList from "./components/manager_components/productList";
import AddProducts from "./components/manager_components/addProducts";
import EditProducts from "./components/manager_components/editProducts";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/shopping-cart" exact component={Auth(ShoppingCart,true)} />
                <Route path="/user/register" exact component={Auth(Signup,false)} />
                <Route path="/register" exact component={Auth(Register,true)} />
                <Route path="/login" exact component={Auth(Login,false)} />
                <Route path="/user" exact component={Auth(User,true)} />
                <Route path="/user/logout" exact component={Auth(Logout,true)} />
                <Route path="/addCategory" exact component={Auth(AddCategory,true)} />
                <Route path="/users" exact component={Auth(Users,true)} />
                <Route path="/user/edit-user/:id" exact component={Auth(EditUser,true)}/>
                <Route path="/" exact component={Auth(Home,null)} />

                <Route path={"/"} exact component={Auth(UserProdcutList)} />
                <Route path={"/manager"} component={Auth(ProductList)} />
                <Route path={"/create"} component={Auth(AddProducts)} />
                <Route path={"/edit/:id"} component={Auth(EditProducts)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;