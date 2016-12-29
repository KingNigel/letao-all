# 乐淘商城接口文档
## 测试地址

# 商城前台接口汇总

###用户模块

- [注册接口](#register)
- [登录接口](#login)
- [登出接口](#logout)
- [修改密码](#updatepassword)

###产品模块

- [搜索产品](#queryProduct)  排序 价格、图片、名称
- [产品详情](#queryProductDetail) 

###分类模块

- [一级分类查询](#queryTopCategory)  
- [二级分类查询](#querySecondCategory)

###购物车

- [添加](#addCart)  件、尺码   尺码 string 区间 ？
- [修改](#updateCart) 件、尺码
- [删除](#deleteCart) 单删、全删
- [查询](#queryCart) 带产品信息

###收货地址模块  三级联动  要一个树状对象

- [添加](#addAddress) 
- [修改](#updateAddress) 
- [删除](#deleteAddress) 
- [查询](#queryAddress) 
- [查询](#queryAddressTree) 

## 商城后台接口汇总

###员工模块

- [登录接口](#employeeLogin)
- [登出接口](#employeeLogout)

###产品模块

- [产品新增](#addProduct)  
- [产品修改](#updateProduct) 
- [产品详情](#queryProductDetailList)

###分类模块

- [一级分类新增](#addTopCategory)   
- [一级分类修改](#updateTopCategory)
- [一级分类查询](#queryTopCategoryPaging)   分页  页数、每页条数
- [二级分类新增](#addSecondCategory)  
- [二级分类修改](#updateSecondCategory)  
- [二级分类查询](#querySecondCategoryPaging)   分页  页数、每页条数

###用户模块
- [用户查询](#queryUser)  
- [用户启用停用](#updateUser)
- [品牌销量比较]()  写死
- [某产品按时间的销量图]()    写死

#网站前台接口描述信息
## 用户模块
### register 
+ 接口名称
  注册接口
+ 接口地址
  /user/register
+ 请求方式
    POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
username|是|用户名
password|是|用户密码
mobile|是|用户手机号
+ 示例
```javascript
{"username":"zhoushugang","password","123456","mobile":"15111111111"}
```
+ 返回说明
参数|说明
--|--
success|注册成功
error|操作失败
+ 示例
```javascript
{"success":true}
{ "error": 403, "message": "用户名未填写！" }
{ "error": 403, "message": "密码未填写！" }
{ "error": 403, "message": "用户名已经存在!!!" }
{ "error": 403, "message": "手机号已注册过!!!" }
{ "error": 403, "message": "数据库异常！" }
```

### login
+ 接口名称
  登录接口
+ 接口地址
   /user/login
+ 请求方式
    POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
username|是|用户名
password|是|用户密码
+ 示例
```javascript
{"username":"zhoushugang","password","123456"}
```
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
//error 同上个接口
```

### logout
+ 接口名称
  登出接口
+ 接口地址
  /user/logout
+ 请求方式
  GET
+ 参数说明
  无
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
//error 同上个接口
```

### updatePassword
+ 接口名称
  修改密码 （需要登录）
+ 接口地址
  /user/updatePassword
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
oldPassword|是|用户密码
newPassword|是|用户密码
+ 示例

```javascript
{"oldPassword":"123456","newPassword":"456789"}
```
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
//error 同上个接口
```

### 产品模块

### queryProduct
+ 接口名称
  搜索产品
+ 接口地址
  /product/queryProduct
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
proName |否|产品名称
brandId |否|pin
price   |否|使用价格排序（1升序，2降序）
num     |否|产品库存排序（1升序，2降序）
page    |是|第几页
pageSize|是|每页的条数
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{
  "page": "1",
  "size": "3",
  "count": 4,
  "data": [
    {
      "id": 1,
      "proName": "羽绒服",
      "price": 600,
      "pic": "/pic/1.jpg",
      "num": 1
    },
    {
      "id": 2,
      "proName": "羽绒服",
      "price": 599,
      "pic": "非常厚实~~~漂漂亮亮~~~",
      "num": 2
    },
    {
      "id": 3,
      "proName": "羽绒服",
      "price": 499,
      "pic": "非常厚实~~~漂漂亮亮~~~",
      "num": 3
    }
  ]
}
```

### queryProductDetail
+ 接口名称
  产品详情
+ 接口地址
  /product/queryProductDetail
+ 请求方式
  GET  
+ 参数说明
参数名称|是否必须|说明
--|--|--
id |是|产品id
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{
  "id": 1,
  "proName": "羽绒服",
  "oldPrice": 998,
  "price": 600,
  "pic": "/pic/1.jpg",
  "proDesc": null,
  "size": "170-195",
  "statu": 1,
  "updateTime": "2012-12-01T04:05:23.000Z",
  "num": 1,
  "brandId": 1
}
```

### 分类模块
### queryTopCategory
+ 接口名称
  一级分类查询
+ 接口地址
   /category/queryTopCategory
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
[
  {
    "id": 1,
    "categoryName": "女装",
    "isDelete": 1
  },
  {
    "id": 2,
    "categoryName": "男装",
    "isDelete": 1
  },
  {
    "id": 3,
    "categoryName": "家电",
    "isDelete": 1
  },
  {
    "id": 4,
    "categoryName": "家具",
    "isDelete": 1
  },
  {
    "id": 5,
    "categoryName": "箱包",
    "isDelete": 1
  },
  {
    "id": 6,
    "categoryName": "珠宝",
    "isDelete": 1
  }
]
```
### querySecondCategory
+ 接口名称
  二级分类查询
+ 接口地址
   /category/querySecondCategory
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
id |是|一级分类id
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
[
  {
    "id": 1,
    "brandName": "耐克",
    "categoryId": 1,
    "brandLogo": "/pic/1.jpg",
    "isDelete": 1
  },
  {
    "id": 2,
    "brandName": "阿迪",
    "categoryId": 1,
    "brandLogo": "/pic/2.jpg",
    "isDelete": 1
  },
  {
    "id": 3,
    "brandName": "新百伦",
    "categoryId": 1,
    "brandLogo": "/pic/3.jpg",
    "isDelete": 1
  },
  {
    "id": 4,
    "brandName": "哥伦比亚",
    "categoryId": 1,
    "brandLogo": "/pic/4.jpg",
    "isDelete": 1
  },
  {
    "id": 5,
    "brandName": "匡威",
    "categoryId": 1,
    "brandLogo": "/pic/5.jpg",
    "isDelete": 1
  }
]
```
### 购物车
### addCart
+ 接口名称
  添加购物车 （需要登录）
+ 接口地址
   /cart/addCart
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
productId |是|产品id
num|是|产品数量
size|是|产品尺码
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{ "success": true }
```
### updateCart
+ 接口名称
  修改购物车 （需要登录）
+ 接口地址
   /cart/updateCart
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id|是|购物车数据id
size      |是|产品尺码
num      |是|产品数量
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{"success":true}
```

### deleteCart
+ 接口名称
  删除购物车 （需要登录）
+ 接口地址
   /cart/deleteCart
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id    |是|购物车id 数组
+ 示例
```javascript
{"id":[1,2,3]}
```
+ 返回说明

参数|说明
--|--
+ 示例

```javascript
{"success":true}
```
### queryCart
+ 接口名称
  查询购物车 （需要登录）
+ 接口地址
   /cart/queryCart
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
page  |是|页数
pageSize  |是|每页条数
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{
  "page": 1,
  "size": 1,
  "count": 2,
  "data":
   [ {
       "id": 1,
       "productId": 1,
       "num": 2,
       "size": '1',
       "proName": '羽绒服',
       "price": 600,
       "pic": '/pic/1.jpg' } ]
   }
```
###收货地址
### addAddress
+ 接口名称
  添加收货地址 （需要登录）
+ 接口地址
  /address/addAddress
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id  字段id 
userId  与user 表关联
address  三级联动地址
addressDetail  详细地址
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{"success":true}
```
### updateAddress
+ 接口名称
  修改收货地址 （需要登录）
+ 接口地址
   /address/updateAddress
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id  字段id 
userId  与user 表关联
address  三级联动地址
addressDetail  详细地址
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{"success":true}
```

###  deleteAddress
+ 接口名称
  删除收货地址 （需要登录）
+ 接口地址
   /address/deleteAddress
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id|是|地址id 
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{"success":true}
```
### queryAddress
+ 接口名称
  查询用户存储的收货地址 （需要登录）
+ 接口地址
  /address/queryAddress
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
[{
    id: 1,
    userId: 2,
    address: '北京市海淀区',
    addressDetail: '西三旗建材城西路',
    isDelete: 1 },
    {
    id: 2,
    userId: 2,
    address: '天津市南开区',
    addressDetail: '红旗南路',
    isDelete: 1 
}]
```
### queryAddressTree
+ 接口名称
  查询收货地址树 （需要登录）
+ 接口地址
   /address/queryAddressTree
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
[{
  "id": 1, "areaName": "北京", "child": [
   { "id": 11, "areaName": "东城区", "child": [{ "id": 111, "areaName": "安定门街道" }, { "id": 112, "areaName": "建国门街道" }] },
   { "id": 12, "areaName": "西城区", "child": [{ "id": 121, "areaName": "德外街道" }, { "id": 122, "areaName": "金融街" }] },
   { "id": 13, "areaName": "朝阳区", "child": [{ "id": 131, "areaName": "朝外街道" }, { "id": 132, "areaName": "劲松街道" }] }]
  }, {
   "id": 2, "areaName": "天津", "child": [
     { "id": 21, "areaName": "和平区", "child": [{ "id": 211, "areaName": "南市街道" }, { "id": 212, "areaName": "新兴街道" }] },
     { "id": 22, "areaName": "南开区", "child": [{ "id": 221, "areaName": "八里台街" }, { "id": 222, "areaName": "王顶堤街" }] },
     { "id": 23, "areaName": "红桥区", "child": [{ "id": 231, "areaName": "西于庄街道" }, { "id": 232, "areaName": "双环村街道" }] }]
}]
```


#网站后台接口描述信息
##员工模块
### employeeLogin
+ 接口名称
  登录接口
+ 接口地址
   /employee/employeeLogin
+ 请求方式
    POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
username|是|用户名
password|是|用户密码
+ 示例
```javascript
{"username":"root","password","123456"}
```
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
//error 同上个接口
```

### employeeLogout
+ 接口名称
  登出接口
+ 接口地址
  /employee/employeeLogout
+ 请求方式
  GET
+ 参数说明
  无
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```
 
##产品模块    
### addProduct
+ 接口名称
  产品新增 （需要登录）
+ 接口地址
  /product/addProduct
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
proId|是|产品id
proName|是|产品名称
oldPrice|是|老价格
price|是|价格
pic|是|图片地址
proDesc|是|产品描述
size|是|产品尺寸
statu|是|产品上下架
num|是|用户库存
brandId|是|归属品牌
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```

### updateProduct
+ 接口名称
  产品修改 （需要登录）
+ 接口地址
  /product/updateProduct
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
proId|是|产品id
proName|是|产品名称
oldPrice|是|老价格
price|是|价格
pic|是|图片地址
proDesc|是|产品描述
size|是|产品尺寸
statu|是|产品上下架
num|是|用户库存
brandId|是|归属品牌
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```
### queryProductDetailList
+ 接口名称
  产品列表查询 （需要登录）
+ 接口地址
  /product/queryProductDetailList
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
page|是|页数
pageSize|是|每页条数

+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
[{
    "id": 1,
    "proName": '羽绒服',
    "oldPrice": 998,
    "price": 600,
    "pic": '/pic/1.jpg',
    "proDesc": null,
    "size": '170-195',
    "statu": 1,
    "updateTime": 2012-12-01T04:05:23.000Z,
    "num": 1,
    "brandId": 1 },
   {
    "id": 2,
    "proName": '羽绒服',
    "oldPrice": 998,
    "price": 599,
    "pic": '非常厚实~~~漂漂亮亮~~~',
    "proDesc": '/pic/1.jpg',
    "size": '170-195',
    "statu": 1,
    "updateTime": 2012-12-01T04:05:23.000Z,
    "num": 2,
    "brandId": 1 } ]
```
##分类模块
### addTopCategory
+ 接口名称
  添加1级分类 （需要登录）
+ 接口地址
  /category/addTopCategory
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
categoryName|是|分类名称
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```
### updateTopCategory
+ 接口名称
  更新1级分类 （需要登录）
+ 接口地址
  /category/addTopCategory
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id|是|分类id
categoryName|是|分类名称
isDelete|是|是否启用
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```
### queryTopCategoryPaging
+ 接口名称
  查询1级分类列表 （需要登录）
+ 接口地址
  /category/queryTopCategoryPaging
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
[
  {
    "id": 1,
    "categoryName": "女装",
    "isDelete": 1
  },
  {
    "id": 2,
    "categoryName": "男装",
    "isDelete": 1
  },
  {
    "id": 3,
    "categoryName": "家电",
    "isDelete": 1
  },
  {
    "id": 4,
    "categoryName": "家具",
    "isDelete": 1
  },
  {
    "id": 5,
    "categoryName": "箱包",
    "isDelete": 1
  },
  {
    "id": 6,
    "categoryName": "珠宝",
    "isDelete": 1
  }
]
```
### addSecondCategory
+ 接口名称
  添加二级分类 （需要登录）
+ 接口地址
  /category/addSecondCategory
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
brandName|是|品牌名称
categoryId|是|所属分类id
brandLogo|是|品牌logo图片地址
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```
### updateSecondCategory
+ 接口名称
  更新2级分类（需要登录）
+ 接口地址
  /category/updateSecondCategory
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id|是|品牌id
brandName|是|品牌名称
categoryId|是|所属分类id
brandLogo|是|品牌logo图片地址
isDelete|是|是否启用
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```
### querySecondCategoryPaging
+ 接口名称
  查询2级分类 （需要登录）
+ 接口地址
  /category/querySecondCategoryPaging
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
[
  {
    "id": 1,
    "brandName": "耐克",
    "categoryId": 1,
    "brandLogo": "/pic/1.jpg",
    "isDelete": 1
  },
  {
    "id": 2,
    "brandName": "阿迪",
    "categoryId": 1,
    "brandLogo": "/pic/2.jpg",
    "isDelete": 1
  },
  {
    "id": 3,
    "brandName": "新百伦",
    "categoryId": 1,
    "brandLogo": "/pic/3.jpg",
    "isDelete": 1
  },
  {
    "id": 4,
    "brandName": "哥伦比亚",
    "categoryId": 1,
    "brandLogo": "/pic/4.jpg",
    "isDelete": 1
  },
  {
    "id": 5,
    "brandName": "匡威",
    "categoryId": 1,
    "brandLogo": "/pic/5.jpg",
    "isDelete": 1
  }
]
```

### queryUser
+ 接口名称
  查询用户 （需要登录）
+ 接口地址
  /user/queryUser
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
page|是|页码
pageSize|是|每页条数
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```
### updateUser
+ 接口名称
  产品修改 （需要登录）
+ 接口地址
  /user/updateUser
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id|是|用户id
isDelete|是|是否启停
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
```