import React from 'react'
import { Icon, Col, Card, Row, Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay >
                {
                    props.images.map((img,i) => (
                        <div key={i}>
                            <img style={{width : '100%', maxHeight : '150px'}} 
                            src={`http://localhost:5000/${img}`}/>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default ImageSlider

{/* <img style={{width: '100%', maxHeight: '150px'}} src={`http://localhost:5000/${product.images[0]}`} alt='이미지'/> */ }