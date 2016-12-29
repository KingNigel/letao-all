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
router.post("/addTopCategory",checkRootLogin)
router.post("/addTopCategory",function(req,res) {
     var category=new Category({
        proName: req.query.categoryName ? req.query.categoryName : '',
     })
    Category.addTopCategory(category,function(err,data){
      if (err)  return res.send({ "error": 403, "message": "数据库异常！" });
        res.send(data);
    })
});
router.post("/updateTopCategory",checkRootLogin)
router.post("/updateTopCategory",function(req,res) {
     var category=new Category({
        id: req.query.id ? req.query.id : '',
        proName: req.query.categoryName ? req.query.categoryName : '',
        isDelete: req.query.isDelete ? req.query.isDelete : ''
     })
    Category.updateTopCategory(category,function(err,data){
      if (err)  return res.send({ "error": 403, "message": "数据库异常！" });
        res.send(data);
    })
});




module.exports = router;