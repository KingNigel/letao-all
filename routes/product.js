'use strict'
var express = require('express'),
    router = express.Router(),
    Product = require('../models/product.js'),
    ProPic = require('../models/proPic.js'),
    fs = require('fs'),
    path = require('path'),
    formidable = require('formidable'),
    moment = require('moment'),
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
            if (data.length==0){
                return res.send(data);
            }
        Product.countProduct(function (err, result) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            var idStr="";
            for(let i=0;i<data.length;i++){
                if(i==0){
                    idStr+=data[i].id
                }
                else{
                    idStr+=","+data[i].id
                }
                data[i].pic=new Array();
            }
            ProPic.queryPic(idStr,function(err,picData){
                console.log(picData);
               if (err) return res.send({ "error": 403, "message": "数据库异常！" });
               for(let l=0;l<picData.length;l++){
                   for(let n=0;n<data.length;n++)
                   if(data[n].id==picData[l].productId){
                       data[n].pic[data[n].pic.length]=picData[l];
                   }
               }
            page.count = result.count;
            page.data = data;
            console.log(page);
            res.send(page);
            })

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
//router.post("/addProduct", checkRootLogin);
router.post("/addProduct", function (req, res) {
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "public/product";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制 2m
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    form.parse(req, function (err, fields, files) {
        var product = new Product({
            proName: fields.proName ? fields.proName : '',
            oldPrice: fields.oldPrice ? parseFloat(fields.oldPrice) : '',
            price: fields.price ? parseFloat(fields.price) : '',
            proDesc: fields.proDesc ? fields.proDesc : '',
            size: fields.size ? fields.size : '',
            statu: fields.statu ? parseInt(fields.statu) : '',
            updateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            num: fields.num ? parseInt(fields.num) : '',
            brandId: fields.brandId ? parseInt(fields.brandId) : ''
        })
        Product.addProduct(product, function (err, data) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            for (let i = 1; i < 4; i++) {
                var file = files['pic'+i];
                if(!file||file.name=="") break;
                let picName = data.insertId+'-' + i + path.extname(file.name);
                fs.rename(file.path, 'public\\product\\' + picName, function (err) {
                    if (err) res.send({ "error": 403, "message": "图片保存异常！" });
                    
                    ProPic.addPic({
                        picName: picName,
                        productId: data.insertId,
                        picAddr: '/product/'+picName
                    },function(err,data){
                        console.log("加入一张图片成功！");
                    })
                })
            }
            res.send({ "success": true });
        })
    });
});
router.post("/updateProduct", checkRootLogin);
router.post("/updateProduct", function (req, res) {
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "public/product";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制 2m
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    form.parse(req, function (err, fields, files) {
        var product = new Product({
             id: fields.id ? parseInt(fields.id) : '',
            proName: fields.proName ? fields.proName : '',
            oldPrice: fields.oldPrice ? parseFloat(fields.oldPrice) : '',
            price: fields.price ? parseFloat(fields.price) : '',
            proDesc: fields.proDesc ? fields.proDesc : '',
            size: fields.size ? fields.size : '',
            statu: fields.statu ? parseInt(fields.statu) : '',
            updateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            num: fields.num ? parseInt(fields.num) : '',
            brandId: fields.brandId ? parseInt(fields.brandId) : ''
        })
        Product.updateProduct(product, function (err, data) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            for (let i = 1; i < 4; i++) {
                let file = files['pic'+i];
                if(!file||file.name=="") break;
                let picName = fields.id+'-' + i + path.extname(file.name);
                fs.access('public\\product\\' + picName, (err) => {
                     if(err){
                        fs.rename(file.path, 'public\\product\\' + picName, function (err) {
                            if (err) res.send({ "error": 403, "message": "图片保存异常！" });
                            ProPic.addPic({
                                picName: picName,
                                productId: parseInt(fields.id),
                                picAddr: '/product/'+picName
                            },function(err,data){
                                console.log("修改一张图片成功！");
                            })
                        })
                     }
                     else{
                        fs.rename(file.path, 'public\\product\\' + picName, function (err) {
                            console.log(err);
                            if (err) res.send({ "error": 403, "message": "图片保存异常！" });
                        })
                     }
                });
            }
            res.send({ "success": true });
        })
    });
});
module.exports = router;