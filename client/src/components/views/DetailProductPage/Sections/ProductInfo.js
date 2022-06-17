import React, { useEffect, useState } from 'react'
import { Badge, Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {
  const [Product, setProduct] = useState({})
  const dispatch = useDispatch();
  const clickHandler = () => {
    const dataToSubmit = {
      productId: Product._id
    }
    dispatch(addCart(dataToSubmit))
  }
  useEffect(() => {
    setProduct(props.product)
  }, [props.product])
  return (
    <div>
      {
        Object.keys(props.product).length > 0
          ?<div>
            <Descriptions title="Product Info" bordered>
              <Descriptions.Item label="Product Title">{Product.title}</Descriptions.Item>
              <Descriptions.Item label="Product Price">$ {Product.price}</Descriptions.Item>
              <Descriptions.Item label="Product Views">{Product.views}</Descriptions.Item>
              <Descriptions.Item label="Descriptions">{Product.description}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button shape="round" type="danger" size='large' onClick={clickHandler}>Add Cart+</Button>
            </div>
          </div>
          : null
      }

    </div>
  )
}

export default ProductInfo