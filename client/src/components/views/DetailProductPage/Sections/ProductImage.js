import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {
    const [Imgs, setImgs] = useState([])
    useEffect(() => {
        const images = props.product.images;
        let imgArr = [];
        if (images) {
            images.map((i) => {
                imgArr.push({
                    original: `http://localhost:5000/${i}`,
                    thumbnail: `http://localhost:5000/${i}`
                })
            })
            setImgs(imgArr)
        }
    }, [props.product])
    return (
        <div>
            {
                Imgs.length > 0
                ? <ImageGallery items={Imgs} style={{width : '600px', height: '600px'}}/>
                : null
            }
        </div>
    )
}

export default ProductImage