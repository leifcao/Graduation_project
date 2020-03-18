const express = require('express');
const router = express.Router();

const DBHelper = require('./DBHelper');
const sql = require('./sqlMap');

//管理员的查询单品
router.post('/selectPhone', (req, res) => {
  let params = req.body;
  let mysql;
  if (params.flag == 0) {
    mysql = sql.AdminManage.queryID;
  } else if (params.flag == 1) {
    mysql = sql.AdminManage.queryName;
  } else if (params.flag == 2) {
    mysql = sql.products.queryPhoneType;
  } else {
    mysql = sql.DetailedMessage.detailed;
  }
  // console.log(mysql,params.message)
  let connection = new DBHelper().getConn();
  connection.query(mysql, [params.message, params.pagesize, params.pagesize1], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//管理员的更新商品
router.post('/AdminUpdate', (req, res) => {
  let params = req.body;
  let mysql = sql.AdminManage.updatePhones;

  // console.log(mysql,params.array);
  let connection = new DBHelper().getConn();
  connection.query(mysql, params.array, (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});


//管理员删除信息商品及相关评论的
router.post('/AdminDele', (req, res) => {
  let params = req.body;
  let mysql = sql.AdminManage.delePhones;
  // console.log(mysql,params.pid);
  let connection = new DBHelper().getConn();
  connection.query(mysql, [params.pid], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//评论信息审核列表
router.post('/CommentGet', (req, res) => {
  let params = req.body;
  let mysql;
  if (params.type == 0) {
    mysql = sql.AdminManage.getUnComment;
  } else {
    mysql = sql.AdminManage.getComment
  }
  // console.log(mysql,params.type);
  let connection = new DBHelper().getConn();
  connection.query(mysql, (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//评论信息通过审核
router.post('/PassComment', (req, res) => {
  let params = req.body;
  let mysql = sql.AdminManage.Audited;
  // console.log(mysql,params.cid);
  let connection = new DBHelper().getConn();
  connection.query(mysql, [params.cid], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//管理员驳回前查看详情
router.post('/SingeComment', (req, res) => {
  let params = req.body;
  let mysql = sql.AdminManage.singleComment;
  // console.log(mysql,params.cid);
  let connection = new DBHelper().getConn();
  connection.query(mysql, [params.cid], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//管理员驳回操作 评论信息
router.post('/rejectComment', (req, res) => {
  let params = req.body;
  let mysql = sql.AdminManage.rejectQuery;
  // console.log(mysql,params.rejectReason);
  let connection = new DBHelper().getConn();
  connection.query(mysql, [params.rejectReason, params.cid], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//用户信息驳回展示列表
router.post('/RCommentList', (req, res) => {
  let params = req.body;
  let mysql = sql.CommentSql.rejectlist;
  // console.log(mysql,params.name);
  let connection = new DBHelper().getConn();
  connection.query(mysql, [params.name], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});


//用户已读驳回信息
router.post('/sureReject', (req, res) => {
  let params = req.body;
  let mysql = sql.AdminManage.suerReject;
  // console.log(mysql,params.cid);
  let connection = new DBHelper().getConn();
  connection.query(mysql, [params.cid], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});

//管理员信息删除
router.post('/deleComment', (req, res) => {
  let params = req.body;
  let mysql = sql.AdminManage.deleComment;
  let connection = new DBHelper().getConn();
  console.log(mysql,params.cid);
  connection.query(mysql, [params.cid], (err, result) => {
    if(err){
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
})

module.exports = router;
