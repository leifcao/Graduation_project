const express = require('express');
const router = express.Router();

const DBHelper = require('./DBHelper');
const sql = require('./sqlMap');


//轮播图
router.get('/Swiper',(req,res)=>{
  let mysql = sql.products.PhoneSwiper;
  // console.log(mysql)
  let connection = new DBHelper().getConn();
  connection.query(mysql,(err,result)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(result);
  });
});

//搜索商品模糊查询
router.post('/PhoneSearch',(req,res)=>{
  let mysql = sql.products.querySearch;
  let params = req.body;
  let connection = new DBHelper().getConn();
  connection.query(mysql,[params.message,params.page],(err,result)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//查询商品
router.post('/Enquirygoods', (req, res) => {
  let params = req.body;
  var mysql = sql.products.queryProduct + params.pagesize + ',' + params.pagesize1;
  // var sql = 'select * from phoneproducts and select * from phonemessage';
  let connection = new DBHelper().getConn();
  connection.query(mysql, '', (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//查询类别商品 和 价格限定商品
router.post('/queryTypePrice', (req, res) => {
  var mysql; //sql语句
  // var Prices; // 价格
  var type; //类型
  let MessArray = [];
  let params = req.body;
  //根据手机类别分类查询
  if (params.Brand != '全部') {
    MessArray.push(params.Brand);
    mysql = sql.products.queryPhoneType;
  }
  //根据价格分类查询
  if (params.prices != '不限') {   //3000-4000， 4000-5000 5000以上
    if (params.prices == '5000以上') {
      mysql = sql.products.moreThan5;
      // console.log(mysql, MessArray)
    } else {
      var list = params.prices.split("-");
      MessArray.push(Number(list[0]));
      MessArray.push(Number(list[1]));
      mysql = sql.products.betweenPrice;
    }
  }
  //类型不为全部的 且 价格不为不限
  if (params.Brand != '全部' && params.prices != '不限') {
    MessArray = [];
    MessArray.push(params.Brand);
    if (params.prices == '5000以上') {
      mysql = sql.products.moreTypePrice;
    } else {
      var list = params.prices.split("-");
      MessArray.push(Number(list[0]));
      MessArray.push(Number(list[1]));
      mysql = sql.products.betweenPriceType;
    }
  }
  //分页 0，40 每次查40条
  MessArray.push(params.pagesize);
  MessArray.push(params.pagesize1);
  // console.log(MessArray, mysql);

  let connection = new DBHelper().getConn();
  connection.query(mysql, MessArray, (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
    // console.log(result)
  });
  connection.end();
});

//热评商品
router.get('/hotComment', (req, res) => {
  let connection = new DBHelper().getConn();
  let mysql = sql.products.hotComment;
  connection.query(mysql, (err, result) => {
    if (err) return;
    res.json(result);
  });
  connection.end();
});


//商品详细信息展示
router.post('/Detailed', (req, res) => {
  let params = req.body;
  let mysql = sql.DetailedMessage.detailed;

  let connection = new DBHelper().getConn();
  connection.query(mysql, [params.id], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    ;
    res.json(result);
  });
  connection.end();
});


//对比页 对比商品信息
router.post('/phoneCompare', (req, res) => {
  let params = req.body;
  let mysql = sql.ComparePage.PhoneComparsion;
  let PidList = params.array;
  if (params.array.length == 1) {
    PidList.push('');
    PidList.push('');
  } else if (params.array.length == 2) {
    PidList.push('');
  }
  let connection = new DBHelper().getConn();
  connection.query(mysql, PidList, (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//对比页弹窗信息
router.post('/popupWindow', (req, res) => {
  let params = req.body;
  let mysql;
  let connection = new DBHelper().getConn();
  if(params.phoneType == '全部'){
    mysql =  sql.ComparePage.AlertWindows1;
  }else {
    mysql = sql.ComparePage.AlertWindows;
  }
  connection.query(mysql, [params.phoneType], (err, result) => {
    if(err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});


//获取cpu列表
router.get('/GetCpu',(req,res)=>{
  let mysql = sql.ComparePage.CpuModel;
  let connection = new DBHelper().getConn();
  connection.query(mysql,(err,result)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});


module.exports = router;
