 import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import M_navbar from "./components/navbars/m_navbar.component";
import AddProducts from "./components/manager_components/addProducts";
import ProductList from "./components/manager_components/productList";
import EditProducts from "./components/manager_components/editProducts";
import UserProdcutList from "./components/user_component/userProdcutList";


import { Provider} from 'react-redux';
import store from './store';
import Kids from "./components/shopping_cart/kids";
import ShoppingCart from "./components/shopping_cart/shopping_cart";

import Addpayments from "./components/shopping_cart/addpayments";
import ViewPayment from "./components/shopping_cart/view.payment";
import EditPayment from "./components/shopping_cart/edit.payment";


function App() {
  return (
      <Provider store={store}>
      <Router>
        <div className="container">
            <M_navbar/>
            <br/>
            <Route path={"/"} exact component={UserProdcutList} />
            <Route path={"/manager"} component={ProductList} />
            <Route path={"/create"} component={AddProducts} />
            <Route path={"/edit/:id"} component={EditProducts}/>

            <Route path={"/kids"} component={Kids}/>
            <Route path={"/shoppingcart"} component={ShoppingCart}/>
            <Route path={"/payment/add"} component={Addpayments}/>
            <Route path={"/payment/view"} component={ViewPayment}/>
            <Route path={"/payment/edit/:id"} component={EditPayment}/>



        </div>
      </Router>
      </Provider>
  );
}

export default App;
