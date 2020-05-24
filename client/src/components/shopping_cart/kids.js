import React, {useState} from 'react';
import kids8 from './images/kids8.jpg';
import kids6 from './images/kids6.jpg';
import kids7 from './images/kids7.jpg';
import kids2 from './images/kids2.jpg';
import { connect } from 'react-redux';
import { addCart} from "./actions/addAction";


const Kids = (props) => {
    console.log(props);

    return(
        <div className="container1">
            <div className="products1">
                 <img src={kids8} alt="kids8" />
                 <h4>Rose Frock</h4>
                <h4>850</h4>
                <button onClick={() => props.addCart('roseFrock')} type="button" className="btn btn-primary"> Add to Cart</button>
            </div>


                <div className="products1">
                    <img src={kids6} alt="kids6" />
                    <h4>Yellow Frock</h4>
                    <h4>350</h4>
                    <button onClick={() => props.addCart('yellowFrock')} type="button" className="btn btn-primary"> Add to Cart</button>
                </div>


                    <div className="products1">
                        <img src={kids7} alt="kids7" />
                        <h4>  Blue Frock</h4>
                        <h4>1000</h4>
                        <button onClick={() => props.addCart('blueFrock')} type="button" className="btn btn-primary"> Add to Cart</button>
                    </div>


                        <div className="products1">
                            <img src={kids2} alt="kids2" />
                            <h4> Blue Kit</h4>
                            <h4>450</h4>
                            <button onClick={() => props.addCart('blueKit')} type="button" className="btn btn-primary"> Add to Cart</button>

                        </div>

        </div>


    );

}


export default connect(null, {addCart})(Kids);
