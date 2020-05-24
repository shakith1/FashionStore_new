import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import ShoppingCart from './components/shopping-cart';
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

// Vageesha //

import AddProducts from './components/Products/addProducts';
import AddWishList from './components/WishList/addWishList';
import DisplayProducts from './components/Products/displayProducts';
import WishList from './components/WishList/wishList';
import AddReviews from './components/Reviews/addReviews';
import DisplayReviews from './components/Reviews/displayReviews';
import UpdateReviews from './components/Reviews/updateReviews';

// Dheeshana //

import UserProdcutList from "./components/user_component/userProdcutList";
import ProductList from "./components/manager_components/productList";
import AddProduct from "./components/manager_components/addProducts";
import EditProducts from "./components/manager_components/editProducts";

// Ushani //

import Kids from "./components/shopping_cart/kids";
import ShoppingCart from "./components/shopping_cart/shopping_cart";

import Addpayments from "./components/shopping_cart/addpayments";
import ViewPayment from "./components/shopping_cart/view.payment";
import EditPayment from "./components/shopping_cart/edit.payment";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/shopping-cart" exact component={Auth(ShoppingCart, true)} />
                <Route path="/user/register" exact component={Auth(Signup, false)} />
                <Route path="/register" exact component={Auth(Register, true)} />
                <Route path="/login" exact component={Auth(Login, false)} />
                <Route path="/user" exact component={Auth(User, true)} />
                <Route path="/user/logout" exact component={Auth(Logout, true)} />
                <Route path="/addCategory" exact component={Auth(AddCategory, true)} />
                <Route path="/users" exact component={Auth(Users, true)} />
                <Route path="/user/edit-user/:id" exact component={Auth(EditUser, true)} />
                {/* <Route path="/" exact component={Auth(Home, null)} /> */}

                {/*  Vageesha  */}

                <Route exact path='/creates' component={Auth(AddProducts, true)} />
                <Route exact path='/edits/:id' component={Auth(AddWishList, true)} />
                <Route exact path='/revs/:id' component={Auth(AddReviews, true)} />
                <Route exact path='/ind' component={Auth(DisplayProducts, null)} />
                <Route exact path='/index' component={Auth(WishList, true)} />
                <Route exact path='/view' component={Auth(DisplayReviews, true)} />
                <Route exact path='/n/:id' component={Auth(UpdateReviews, true)} />

                {/*  Dheeshana  */}

                <Route path={"/"} exact component={Auth(UserProdcutList,null)} />
                <Route path={"/manager"} component={Auth(ProductList,true)} />
                <Route path={"/create"} component={Auth(AddProduct,true)} /> 
                <Route path={"/edit/:id"} component={Auth(EditProducts,true)}/> 

                {/*  Ushani  */}

                <Route path={"/kids"} component={Auth(Kids,true)} />
                <Route path={"/shoppingcart"} component={Auth(ShoppingCart,true)} />
                <Route path={"/payment/add"} component={Auth(Addpayments,true)} />
                <Route path={"/payment/view"} component={Auth(ViewPayment,true)} />
                <Route path={"/payment/edit/:id"} component={Auth(EditPayment,true)} />
            </Switch>
        </Layout>
    );
};

export default Routes;