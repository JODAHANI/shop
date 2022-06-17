import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CART_ADD,
    GET_CART_PAGE,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`).then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`).then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export async function addCart(dataToSubmit) {
    const request = await axios.post(`${USER_SERVER}/addcart`, dataToSubmit).then(res => res.data)
    if (request.isAuth == false) {
        alert('로그인 해주시기 바랍니다.')
    }

    return {
        type: CART_ADD,
        payload: request
    }
}

export async function getCartItems(cartItemsId, userCart) {
    const request = await axios.get(`/api/product/user-cart?id=${cartItemsId}&type=array`);
    request.data.forEach(item => {
        userCart.forEach((i, idx) => {
            if (item._id == i.id) {
                let q = userCart[idx].quantity;
                item.quantity = q
            }
        })
    });
    const newRequest = request.data;
    return {
        type: GET_CART_PAGE,
        payload: newRequest
    }
}

export async function removeCartItem(dataToSubmit) {
    const request = await axios.post(`${USER_SERVER}/remove-cart-item`,dataToSubmit).then(res => res.data)
    let cart = request.user.cart;
    let productInfo = request.productInfo;

    cart.map(item => {
        productInfo.map(i => {
            if(item.id, i._id) i.quantity = item.quantity
        })
    })
    return {
        type: REMOVE_CART_ITEM,
        payload : request
    }
    
    
}


export function onSuccessBuy(data) {
    const request =  axios.post(`${USER_SERVER}/successBuy`,data).then(res => res.data)

    return {
        type : ON_SUCCESS_BUY,
        payload : request
    }
    

}