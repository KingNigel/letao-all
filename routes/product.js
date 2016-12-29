var express = require('express'),
    router = express.Router(),
    Product = require('../models/product.js'),
    Page = require('../models/page.js');
function checkRootLogin(req, res, next) {
    if (!req.session.employee) {
       return res.send({ "error": 400, "message": "未登录！" });
    }
    next();
}
router.get("/queryProduct", function (req, res) {
    var product = new Product({
        proName: req.query.proName ? req.query.proName : '',
        price: req.query.price ? req.query.price : '',
        num: req.query.num ? req.query.num : '',
        brandId: req.query.brandId ? req.query.brandId : ''
    })
    var page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
    Product.queryProduct(product, page, function (err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        Product.countProduct(function (err, result) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            page.count = result.count;
            page.data = data;
         
            res.send(page);
        })
    })
});

router.get("/queryProductDetail", function (req, res) {
    Product.queryProductDetail(req.query.id, function (err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send(data);
    })
});
router.get("/queryProductDetailList", checkRootLogin);
router.get("/queryProductDetailList", function (req, res) {
    var product = new Product({
        proName: req.query.proName ? req.query.proName : '',
        price: req.query.price ? req.query.price : '',
        num: req.query.num ? req.query.num : '',
        brandId: req.query.brandId ? req.query.brandId : ''
    })
    var page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 1,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
    Product.queryProductDetailList(product, page, function (err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        Product.countProduct(function (err, result) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            page.count = result.count;
            page.data = data;
            res.send(page);
        })
    })
});
router.post("/addProduct", checkRootLogin);
router.post("/addProduct", function (req, res) {
    var product = new Product({
        proName: req.query.proName ? req.query.proName : '',
        oldPrice: req.query.oldPrice ? req.query.oldPrice : '',
        price: req.query.price ? req.query.price : '',
        pic: req.query.pic ? req.query.pic : '',
        proDesc: req.query.proDesc ? req.query.proDesc : '',
        size: req.query.size ? req.query.size : '',
        statu: req.query.statu ? req.query.statu : '',
        updateTime:moment().format("YYYY-MM-DD HH:mm:ss"),
        num: req.query.num ? req.query.num : '',
        brandId: req.query.brandId ? req.query.brandId : ''
    })
    Product.addProduct(product, function (err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
         res.send({ "success": true });
    })
});
router.post("/updateProduct", checkRootLogin);
router.post("/updateProduct", function (req, res) {
    var product = new Product({
        proName: req.query.proName ? req.query.proName : '',
        oldPrice: req.query.oldPrice ? req.query.oldPrice : '',
        price: req.query.price ? req.query.price : '',
        pic: req.query.pic ? req.query.pic : '',
        proDesc: req.query.proDesc ? req.query.proDesc : '',
        size: req.query.size ? req.query.size : '',
        statu: req.query.statu ? req.query.statu : '',
        updateTime:moment().format("YYYY-MM-DD HH:mm:ss"),
        num: req.query.num ? req.query.num : '',
        brandId: req.query.brandId ? req.query.brandId : ''
    })
    Product.updateProduct(product, function (err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
         res.send({ "success": true });
    })
});
module.exports = router;