import React, { useEffect } from 'react'
import "./UserCardBlock.css"


function UserCardBlock(props) {
    const renderItems = () => {
        return props.cartData && props.cartData.map((item,i) => 
            <tr key={i}>
                <td>
                    <img style={{width : '70px', height : '70px'}} alt='Product Imgs' src={`http://localhost:5000/${item.images[0]}`}/>
                </td>
                <td>
                    {item.title}
                </td>
                <td>
                    {item.quantity}
                </td>
                <td>
                    $: {item.price}
                </td>
                <td className='btn-td'>
                    <button className='btn' onClick={() => {props.removeItem(item._id)}}>Remove</button>
                </td>
            </tr>
        )
    }
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품명</th>
                        <th>상품 수량</th>
                        <th>상품 가격</th>
                        <th className='del'>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>            
        </div>
    )
}

export default UserCardBlock