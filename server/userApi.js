const express = require('express');
const router = express.Router();

const DBHelper = require('./DBHelper');
const sql = require('./sqlMap');

const request = require('request');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const iconv = require('iconv-lite');

// 增加用户
router.post('/addUser', (req, res) => {
  let sql1 = 'select name from user where name =?';
  let sqlStr = sql.user.add; //mysql添加语句
  let params = req.body;
  // console.log(req.body)
  let conn = new DBHelper().getConn(); //数据库调用
  conn.query(sql1, [params.name], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    if (result == '') {//判断表中是否有用户
      conn.query(sqlStr, [params.name, params.password, params.type, params.phonenum], (err, results) => {
        if (err) {
          res.json(err);
        } else {
          res.json({mess: '注册成功'});
        }
      });
      conn.end();
      return;
    }
    res.json({mess: '用户已存在'});
  });
});

// 查询用户
router.post('/selectUser', (req, res) => {
  let sqlStr;
  let params = req.body;
  if (params.flag == 0) {
    sqlStr = sql.user.select
  } else if (params.flag == 1) {
    sqlStr = sql.user.select1
  } else {
    sqlStr = sql.user.select2
  }
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.message,params.pagesize], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result)
    // res.json({xix:100});
    // res.send({xixixiix:100})
    // res.status(404).send()
  });
  conn.end();
});

//查询全部用户
router.post('/selectmess', (req, res) => {
  var sql;
  let params =req.body;
  if (params.name == '') {
    sql = 'SELECT * FROM user WHERE name not in("admin") LIMIT ?,15'
  }
  // console.log(sql,params.pagesize);

  let connection = new DBHelper().getConn()
  connection.query(sql, [params.pagesize], (err, result) => {
    if (err) {
      res.json(err)
    }
      res.json(result)
  })
})

//用户登录
router.post('/Userlogin', (req, res) => {
  let sqlStr = sql.user.login;
  let params = req.body;
  let connect = new DBHelper().getConn()

  connect.query(sqlStr, [params.name, params.password], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    if (result == '') {
      res.json({mess: '账号或者密码错误'});
    } else {
      res.json(result);
    }
    //   // res.sendStatus(500);
    //   console.log(res)
    //   // res.status(500).send('Sorry, we cannot find that!');
    //   return;
    // }
  });
  connect.end();
});

//删除用户
router.post('/Deleteuser', (req, res) => {
  let sqlStr = sql.user.deletes;
  let params = req.body;
  let connect = new DBHelper().getConn()
  connect.query(sqlStr, [params.id], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
      res.json(result)
  })
  connect.end();
});

//修改用户信息
router.post('/updateUser', (req, res) => {
  let sqlstr = sql.user.updates;
  let params = req.body;
  let connection = new DBHelper().getConn();
  // console.log(params.array,sqlstr)
  connection.query(sqlstr,params.array,(err,result)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
})

/*
* 爬虫*/

function remove(str) {
  str = str.replace(/[\r\n]/g, ""); //换行符号去掉
  return str.replace(/\ +/g, "")    //空格符号去掉
}

var URL = 'http://mobile.zol.com.cn/soc/';//CPU

// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_list_1.html';
var urlRoot = "http://detail.zol.com.cn"
var num = 1
var data;

function myRequest(url, callback) {
  var options = {
    url: url,
    encoding: null
  }
  request(options, callback)
}


async function getMessage(url) {
  UrlRequest(url);

  return data;
}


//回调函数
function UrlRequest(url) {
  myRequest(url, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      var html = iconv.decode(body, 'gbk');
      var $ = cheerio.load(html, {decodeEntities: false});
      let connection = new DBHelper().getConn();
      //获取所有tr
      var comm = $('.info tr');
      for (let i = 1; i < comm.length; i++) {
        var object = {
          cpu: remove($(comm[i]).children('td').eq(1).text()),
          cpuscore: remove($(comm[i]).children('td').eq(2).text()),
        }
        connection.query('insert into cpudesc set ?', object, (err, result) => {
          if (err) console.log('err', err)
          else {
            console.log('成功', i);
          }
        });
      }
    }
  })
}

// getMessage(URL);


module.exports = router;
