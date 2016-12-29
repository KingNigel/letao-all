var db = require('./db.js');
function Brand(brand) {
    this.id=brand.id;
	this.brandName = brand.brandName;
	this.categoryId = brand.categoryId;
    this.brandLogo = brand.brandLogo;
    this.isDelete = brand.isDelete;
};
Brand.addSecondCategory = function (brand, callback) {
  var selectSql = 'insert into brand (id,brandName,categoryId,brandLogo,isDelete)  values (null,?,?,?,1)';
  db.query(selectSql, [brand.brandName,brand.categoryId,brand.brandLogo], function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};
Brand.updateSecondCategory = function (brand, callback) {
  var selectSql = 'UPDATE brand SET';
  var param = new Array();
  if (brand.brandName) {
    selectSql += ' brandName=? ';
    param[param.length] = brand.brandName;
  }
   if (brand.categoryId && param.length == 0) {
    selectSql += ' categoryId=? ';
    param[param.length] = brand.categoryId;
  }
  else if (brand.categoryId && param.length != 0) {
    selectSql += ' ,categoryId=? ';
    param[param.length] = brand.categoryId;
  }
  if (brand.brandLogo && param.length == 0) {
    selectSql += ' brandLogo=? ';
    param[param.length] = brand.brandLogo;
  }
  else if (brand.brandLogo && param.length != 0) {
    selectSql += ' ,brandLogo=? ';
    param[param.length] = brand.brandLogo;
  }
   if (brand.isDelete && param.length == 0) {
    selectSql += ' isDelete=? ';
    param[param.length] = brand.isDelete;
  }
  else if (brand.isDelete && param.length != 0) {
    selectSql += ' ,isDelete=? ';
    param[param.length] = brand.isDelete;
  }
  selectSql+= ' where id=?';
  param[param.length] = brand.id;
  db.query(selectSql,param, function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};


module.exports = Brand;
