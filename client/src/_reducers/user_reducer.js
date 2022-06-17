import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CART_ADD,
    GET_CART_PAGE,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case CART_ADD:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    cart : action.payload
                }}
        case GET_CART_PAGE: 
                return {...state, cartData: action.payload}
        case REMOVE_CART_ITEM : 
                return {
                    ...state,
                    userData: {
                        ...state.userData,
                        cart: action.payload.user.cart
                    },
                    cartData: action.payload.productInfo
                }
        case ON_SUCCESS_BUY : 
                return {
                    ...state,
                    userData : {
                        ...state.userData,
                        cart: action.payload.cart
                    },
                    cartData : action.payload.cartData
                }
        default:
            return state;
    }
}