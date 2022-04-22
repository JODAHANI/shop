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
    if(!product) return res.status(400).json({success : false})
    else return res.status(200).json({success : true})
})

router.get('/products', async (req, res) => {
    let products = await Product.find().populate('writer');
    if(!products) return res.status(400).json({success : false})
    return res.status(200).json({success : true, products})
})


router.post('/image', upload.single('file'),(req, res) => {
    const { file : { path, filename} } = req
    return res.json({success: true, filePath : path, fileName : filename})

})


module.exports = router