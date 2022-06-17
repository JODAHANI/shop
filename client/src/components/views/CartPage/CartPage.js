import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import { Empty, Result } from 'antd';
import Pay from '../../utils/Pay';

function CartPage(props) {
    const dispatch = useDispatch()
    const [ShowTotal, setShowTotal] = useState(false)
    const [Sum, setSum] = useState(0)
    const [ShowSuccess, setShowSuccess] = useState(false)
    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData: data,
            cartData: props.user.cartData
        })).then(res => {
            if (res.payload.success) {
                setShowTotal(false)
                setShowSuccess(true)
            }
        })

    }
    const removeItem = (productId) => {
        const dataToSubmit = {
            productId: productId
        }
        dispatch(removeCartItem(dataToSubmit)).then(res => {
            if (res.payload.productInfo.length <= 0) {
                setShowTotal(false)
            }
        })
        // removeCartItem(dataToSubmit)
    }
    const showTotal = (items) => {
        let sum = 0
        items.map((item) => {
            sum += parseInt(item.price) * parseInt(item.quantity)
        })
        setSum(sum);
        setShowTotal(true)

    }
    useEffect(() => {
        let cartItems = []
        if (props.user.userData && props.user.userData.cart.length > 0) {
            let cart = props.user.userData.cart
            for (let item of cart) {
                cartItems.push(item.id)
            }
            dispatch(getCartItems(cartItems, cart)).then(res => showTotal(res.payload))
        }
    }, [props.user.userData])
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <UserCardBlock cartData={props.user.cartData} removeItem={removeItem} />
            {
                ShowTotal ?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total Amount: $:  {Sum}</h2>
                    </div>
                    : ShowSuccess ?
                        <Result
                            status="success"
                            title="Successfully!"
                        />
                    : <Empty style={{marginTop : '3rem'}}/>
            }
            {
                ShowTotal ? <Pay sum={Sum} transactionSuccess={transactionSuccess} />
                    : null

            }
        </div>
    )
}

export default CartPage