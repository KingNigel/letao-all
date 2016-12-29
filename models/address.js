var db = require('./db.js');

function Address(address) {
  this.id = address.id;
  this.userId = address.userId;
  this.address = address.address;
  this.addressDetail = address.addressDetail;
  this.isDelete = address.isDelete;
};

Address.addAddress = function (address, callback) {
  var selectSql = 'insert into address (id,userId,address,addressDetail,isDelete)  values (null,?,?,?,1)';
  db.query(selectSql, [cart.userId, cart.address, cart.addressDetail], function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};
Address.updateAddress = function (address, callback) {
  var selectSql = 'UPDATE address SET address =?,addressDetail=? WHERE id=?';
  db.query(selectSql, [address.address, address.addressDetail, address.id], function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Address.deleteAddress = function (id, callback) {
  var delSql = "UPDATE cart SET isDelete =0 WHERE id =?";
  db.query(delSql,function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Address.queryAddress = function (userId, callback) {
  var selectSql = 'SELECT * FROM address WHERE userId=? AND isDelete=1';
  db.query(selectSql, [userId], function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
module.exports = Address;
