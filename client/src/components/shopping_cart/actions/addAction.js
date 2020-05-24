import { ADD_PRODUCT_CART} from "./type";

export const addCart = (productName) => {
    return(dispatch) => {
        console.log("adding to cart");
        console.log("Product: " , productName);
        dispatch({
            type: ADD_PRODUCT_CART,
            payload: productName
        })
    }
}
