'use strict'
var express = require('express'),
    router = express.Router(),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    Category = require('../models/category.js'),
     Brand = require('../models/brand.js');
function checkRootLogin(req, res, next) {
    if (!req.session.employee) {
        return res.send({ "error": 400, "message": "未登录！" });
    }
    next();
}
router.get("/queryTopCategory", function(req, res) {
    Category.queryTopCategory(function(err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send(data);
    })
});

router.get("/querySecondCategory", function(req, res) {
    Category.querySecondCategory(req.query.id, function(err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send(data);
    })
});
// router.get("/queryHotSecondCategory", function(req, res) {
//     Category.queryHotSecondCategory(req.query.id, function(err, data) {
//         if (err) return res.send({ "error": 403, "message": "数据库异常！" });
//         res.send(data);
//     })
// });
router.post("/addTopCategory", checkRootLogin)
router.post("/addTopCategory", function(req, res) {
    console.log(req.body.categoryName);
    var category = new Category({
        categoryName: req.body.categoryName ? req.body.categoryName : '',
    })
    Category.addTopCategory(category, function(err, data) {
        console.log(err);
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send({ "success": true });
    })
});
router.post("/updateTopCategory", checkRootLogin);
router.post("/updateTopCategory", function(req, res) {
    var category = new Category({
        id: req.body.id ? req.body.id : '',
        categoryName: req.body.categoryName ? req.body.categoryName : '',
        isDelete: req.body.isDelete ? req.body.isDelete : ''
    })
    Category.updateTopCategory(category, function(err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send({ "success": true });
    })
});
router.get("/queryTopCategoryPaging", checkRootLogin);
router.get("/queryTopCategoryPaging", function(req, res) {
    var page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
    Category.queryTopCategoryPaging(page, function(err, data) {
        console.log(err);
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        Category.countTopCategory(function(err, result) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            page.count = result.count;
            page.data = data;
            res.send(page);
        })
    })
});
router.post("/addSecondCategory", checkRootLogin)
router.post("/addSecondCategory", function(req, res) {
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "public/brand";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制 2m
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    form.parse(req, function(err, fields, files) {
        var brand = new Brand({
            brandName: fields.brandName ? fields.brandName : '',
            categoryId: fields.categoryId ? parseInt(fields.categoryId) : '',
            isDelete: fields.isDelete ? parseInt(fields.isDelete) : '',
            hot: fields.hot ? parseInt(fields.hot) : ''
        })
        Brand.addSecondCategory(brand, function(err, data) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });

            var file = files.brandLogo;
            let picName = data.insertId + path.extname(file.name);
            fs.rename(file.path, 'public\\brand\\' + picName, function(err) {
                if (err) res.send({ "error": 403, "message": "图片保存异常！" });
                var brand = new Brand({
                    id: data.insertId,
                    brandLogo: '/brand/' + picName
                })
                Brand.updateSecondCategory(brand, function() {
                    if (err) return res.send({ "error": 403, "message": "数据库异常！" });

                    res.send({ "success": true });
                })
            })
        })
    });
});
//router.post("/updateSecondCategory", checkRootLogin)
router.post("/updateSecondCategory", function(req, res) {
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "public/brand";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制 2m
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    form.parse(req, function(err, fields, files) {
        var brand = new Brand({
            id: fields.id ? fields.id : '',
            brandName: fields.brandName ? fields.brandName : '',
            categoryId: fields.categoryId ? parseInt(fields.categoryId) : '',
            isDelete: fields.isDelete ? parseInt(fields.isDelete) : '',
            hot: fields.hot ? parseInt(fields.hot) : ''
        })

        var file = files.brandLogo;
        let picName = fields.id + path.extname(file.name);
        fs.rename(file.path, 'public\\brand\\' + picName, function(err) {
            if (err) res.send({ "error": 403, "message": "图片保存异常！" });
            brand.brandLogo = '/brand/' + picName;
            Brand.updateSecondCategory(brand, function() {
                if (err) return res.send({ "error": 403, "message": "数据库异常！" });

                res.send({ "success": true });
            })
        })
    });
});
router.get("/querySecondCategoryPaging", function(req, res) {
    var page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
    Category.querySecondCategoryPaging(page, function(err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        Category.countSecondCategory(function(err, result) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            page.count = result.count;
            page.data = data;
            console.log(page);
            res.send(page);
        })
    })
});
module.exports = router;