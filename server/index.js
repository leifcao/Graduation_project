// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');
const userApi = require('./userApi');
const phoneproducts = require('./phoneproduct');
const Comments = require('./Comments');
const Recommends = require('./Recommends');
const AdminProduct = require('./AdminProduct');

//实例化express
let app = express();

let server = http.createServer(app);
//创建application/json解析
app.use(badyParser.json());
/*为app添加中间件处理跨域请求*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(badyParser.urlencoded({
  extended: false
}));

// 后端api路由
app.use('/api/user', userApi);  //用户
app.use('/api/product', phoneproducts); //手机列表
app.use('/api/userComment', Comments);  //评论列表API
app.use('/api/userCommend', Recommends);  //信息推荐API
app.use('/api/AdminProduct', AdminProduct);  //管理员管理API


// 启动监听
server.listen(8888, () => {
  console.log(' success!! port:8888')
})
