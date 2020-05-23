import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ShoppingCart from './components/shopping-cart';
import Home from './components/home';
import Layout from './HOC/layout';
import Register from './containers/Admin/register';
import Signup from './containers/signup';
import AddCategory from './containers/addCategory';
import Login from './containers/Admin/login';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/shopping-cart" exact component={ShoppingCart} />
                <Route path="/user/register" exact component={Signup} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/addCategory" exact component={AddCategory} />
                <Route path="/" exact component={Home} />
            </Switch>
        </Layout>
    );
};

export default Routes;