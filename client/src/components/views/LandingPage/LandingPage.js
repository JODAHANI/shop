import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row, } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchBox from './Sections/SearchBox';
import { continents, price } from './Sections/Datas';
import { Link } from 'react-router-dom'
function LandingPage() {
    useEffect(() => {
        const body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)


    }, []);
    const [SearchValue, setSearchValue] = useState('')
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(4)
    const renderCards = Products.map((product, i) => {
        return <Col lg={6} md={8} xs={24} key={i}>
            <Link to={`/product/detail/${product._id}`}>
                <Card cover={<ImageSlider images={product.images} />}>
                    <Meta title={product.title} description={`$${product.price}`} />
                </Card>
            </Link>
        </Col>
    })
    const getFiltersProducts = (filters) => {
        const body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)
    }
    const handlePirce = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === value) {
                array = data[key].array
            }
        }
        return array
    }
    const handleFilters = (filters, catecory) => {
        let newFilters = { ...Filters }
        newFilters[catecory] = filters
        if (catecory === 'price') {
            let priceVal = handlePirce(filters);
            newFilters[catecory] = priceVal;
        }
        getFiltersProducts(newFilters)
        setFilters(newFilters)

    }
    const loadMoreHandler = () => {
        let skip = Skip + Limit;
        const body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body)
        setSkip(skip)

    }
    const getProducts = (body) => {
        axios.post('/api/product/products', body).then((res) => {
            if (res.data.success) {
                if (body.loadMore) {
                    setProducts([...Products, ...res.data.products])
                } else {
                    setProducts(res.data.products)
                }
                // let length = res.data.products.length
                setPostSize(res.data.postSize)
            } else alert('상품을 가져오지 못했습니다.')
        });
    }
    const updateSearch = (newSearchValue) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            search: newSearchValue
        }
        getProducts(body)
        setSearchValue(newSearchValue)
    }
    return (
        <div style={{ width: '75%', margin: '3rem auto', }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Go on a trip now! <Icon type='rocket' /></h2>
            </div>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} selectFilters={id => handleFilters(id, 'continents')} />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} selectFilters={id => handleFilters(id, 'price')} />
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchBox refreshFunction={updateSearch} />
            </div>
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            <br />
            {
                PostSize >= Limit
                    ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={loadMoreHandler}>더보기</button>
                    </div>
                    : null
            }
        </div>
    )
}

export default LandingPage
