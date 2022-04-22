import React, { useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        axios.get('/api/product/products').then((res) => {
            if(res.data.success) {
                console.log(res.data)
            } else alert('상품을 가져오지 못했습니다.')
        });
    },[]);
    return (
        <div>
            하이
        </div>
    )
}

export default LandingPage
