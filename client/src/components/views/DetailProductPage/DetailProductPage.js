import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import { Col, Row } from 'antd'

function DetailProductPage(props) {
  const id = props.match.params.id
  const [Product, setProduct] = useState({})
  useEffect(() => {
    axios.get(`/api/product/detail/${id}`).then((res) => {
      if(res.data.success) {
        setProduct(res.data.product)
      } else {
        alert('상품을 가져오지 못했습니다.')
      }
    })
  },[])
  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24}>
            <ProductImage product={Product}/>
          </Col>
          <Col lg={12} sm={24}>
            <ProductInfo product={Product}/>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DetailProductPage


