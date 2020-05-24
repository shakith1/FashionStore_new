import {ADD_PRODUCT_CART , GET_NUMBERS_CART} from "../actions/type";

const initialState = {
    cartNumbers: 0,
    cartCost: 0,
    products: {
        roseFrock:{
            name: "Rose Frock",
            price: 850,
            numbers: 0,
            inCart: false
        },
        yellowFrock:{
            name: "Yellow Frock",
            price: 350,
            numbers: 0,
            inCart: false
        },
        BlueFrock:{
            name: "Blue Frock",
            price: 1000,
            numbers: 0,
            inCart: false
        },
        blueKit:{
            name: "Blue Kit",
            price: 450,
            numbers: 0,
            inCart: false
        },
    }
}

export default(state = initialState, action) => {
    switch(action.type) {
        case ADD_PRODUCT_CART:
            let addQuantity = { ...state.products[action.payload]}


            addQuantity.numbers += 1;
            addQuantity.inCart = true;
            console.log(addQuantity);

            return {
                ...state,
                cartNumbers: state.cartNumbers + 1,
                cartCost: state.cartCost + state.products[action.payload].price,
                products: {
                    ...state.products,
                    [action.payload] : addQuantity
                }

            }
        case  GET_NUMBERS_CART:
            return {
               ...state
            }

        default:
            return state;
    }
}
