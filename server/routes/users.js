const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addcart", auth, async (req, res) => {
    const { body: { productId } } = req;
    console.log(productId)
    let user = await User.findById(req.user._id);
    let check = false;
    if (user.cart) {
        for (let i = 0; i < user.cart.length; i++) {
            let id = user.cart[i].id;
            if (id === productId) check = true
        }
    }
    console.log(check)
    if (check) {
        let userUpdate = await User.findOneAndUpdate(
            { _id: req.user._id, "cart.id": productId},
            { $inc: { "cart.$.quantity": 1 } },
            { new: true },
        )
        if(!userUpdate) {
            return res.status(400).json({ success : false})
        } else {
            return res.status(200).send(userUpdate.cart)
        }
    }
    else {
        let item = {
            id: productId,
            quantity: 1,
            date: Date.now()
        }
        user.cart.push(item);
        await user.save();
        return res.status(200).send(user.cart)
    }
})

router.post('/remove-cart-item',auth, async (req,res) => {
    const {body: { productId }} = req;
    let user = await User.findOneAndUpdate(
        {_id : req.user._id},
        {
            "$pull":
                { "cart": { "id": productId } }
        },
        {new : true},
    );
    let cart = user.cart;
    if(cart.length > 0) {
        console.log(cart)
        let array = cart.map(item => {
            return item.id
        })
        let productInfo = await Product.find({ _id: { $in: array } })
        
        return res.status(200).json({user,productInfo});
    } else {
        let productInfo = [];
        return res.status(200).json({user,productInfo});
    }
})

router.post('/successBuy',auth, async (req,res) => {
    const { body : {cartData, paymentData} } = req
    let history = [];
    let transactionData = {};
    cartData.forEach(item => {
        history.push({
            dateOfPurchase: Date.now(),
            title : item.title,
            id : item._id,
            price : item.price,
            quantity : item.quantity,
            paymentId : paymentData.paymentID
        })
    });
    transactionData.user = {
        id : req.user._id,
        name : req.user.name,
        email : req.user.email
    }
    transactionData.data = req.body.paymentData
    transactionData.product = history
    let user = await User.findByIdAndUpdate(
        {_id: req.user._id},
        { $push : {history : history}, $set : {cart : []}},
        {new :true}
    )
    if(!user) return res.json({success : false, user})
    const payment = new Payment(transactionData)
    await payment.save()
    let products = [];
    payment.product.forEach(item => {
        products.push({id : item.id, quantity: item.quantity})
    })
    products.forEach(async item => {
        let product = await Product.findById(item.id)
        product.sold += item.quantity
        product.save()
    })
    
    return res.status(200).json({success : true, cartData : [], cart: user.cart})
    
    // user: {
    //     type: Array,
    //     default: []
    // },
    // data: {
    //     type: Array,
    //     default: []
    // },
    // product: {
    //     type: Array,
    //     default: []
    // }
    
})
module.exports = router;


