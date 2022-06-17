const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage })
router.post('/', async (req, res) => {
    let product = await Product.create(req.body)
    if (!product) return res.status(400).json({ success: false })
    else return res.status(200).json({ success: true })
})

router.get('/detail/:id', async (req, res) => {
    const { params: { id } } = req
    const product = await Product.findOne({ _id: id }).populate('writer')
    if (!product) return res.json({ success: false })
    return res.json({ success: true, product })
})

router.get('/user-cart', async (req, res) => {
    let productIds = req.query.id.split(',')
    let products = await Product.find({_id: {$in : productIds}})
    if(!products) return res.status(400).send(products)
    return res.status(200).send(products)
})


router.post('/products', async (req, res) => {
    const { body: { limit, skip, filters, search } } = req
    let finds = {};
    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === 'price') {
                finds[key] = {
                    $gte: filters[key][0],
                    $lte: filters[key][1]
                }
            }
            else {
                finds[key] = filters[key]
            }
        }
    }
    if (search) {
        let products = await Product.find({ title: { $regex: new RegExp(`${search}`, "i"), } }).find(finds).skip(skip).limit(limit).populate('writer');
        // let products = await Product.find(finds).find({$text : { $search : search}}).skip(skip).limit(limit).populate('writer');
        if (!products) return res.status(400).json({ success: false })
        return res.status(200).json({ success: true, products, postSize: products.length })
    } else {
        let products = await Product.find(finds).skip(skip).limit(limit).populate('writer');
        if (!products) return res.status(400).json({ success: false })
        return res.status(200).json({ success: true, products, postSize: products.length })
    }
})


router.post('/image', upload.single('file'), (req, res) => {
    const { file: { path, filename } } = req
    return res.json({ success: true, filePath: path, fileName: filename })

})


module.exports = router