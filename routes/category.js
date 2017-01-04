var express = require('express'),
    router = express.Router(),
    Category = require('../models/category.js');
function checkRootLogin(req, res, next) {
    if (!req.session.employee) {
       return res.send({ "error": 400, "message": "未登录！" });
    }
    next();
}
router.get("/queryTopCategory",function(req,res) {
    Category.queryTopCategory(function(err,data){
      if (err) return res.send({ "error": 403, "message": "数据库异常！" });
      res.send(data);
    })
});

router.get("/querySecondCategory",function(req,res) {
    Category.querySecondCategory(req.query.id,function(err,data){
      if (err)  return res.send({ "error": 403, "message": "数据库异常！" });
        res.send(data);
    })
});
router.get("/queryHotSecondCategory",function(req,res) {
    Category.queryHotSecondCategory(req.query.id,function(err,data){
      if (err)  return res.send({ "error": 403, "message": "数据库异常！" });
        res.send(data);
    })
});
router.post("/addTopCategory",checkRootLogin)
router.post("/addTopCategory",function(req,res) {
      console.log(req.body.categoryName);
     var category=new Category({
        categoryName: req.body.categoryName ? req.body.categoryName : '',
     })
    Category.addTopCategory(category,function(err,data){
        console.log(err);
      if (err)  return res.send({ "error": 403, "message": "数据库异常！" });
        res.send({ "success": true });
    })
});
router.post("/updateTopCategory",checkRootLogin)
router.post("/updateTopCategory",function(req,res) {
     var category=new Category({
        id: req.body.id ? req.body.id : '',
        categoryName: req.body.categoryName ? req.body.categoryName : '',
        isDelete: req.body.isDelete ? req.body.isDelete : ''
     })
    Category.updateTopCategory(category,function(err,data){
      if (err)  return res.send({ "error": 403, "message": "数据库异常！" });
        res.send({ "success": true });
    })
});
module.exports = router;