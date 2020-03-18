const express = require('express');
const router = express.Router();

const DBHelper = require('./DBHelper');
const sql = require('./sqlMap');

//发表评论
router.post('/setComment', (req, res) => {
  let params = req.body;
  let mysql = sql.CommentSql.addcomment;
  let connection = new DBHelper().getConn();
  let message = [];
  for (let i in params) {
    message.push(params[i]);
  }
  console.log(mysql,message)
  connection.query(mysql, message, (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    if (result != '') {
      res.json({mess: '发表成功，等待审核'});
    }
  });
  connection.end();
});

//获取评论列表
router.post('/getComment', (req, res) => {
  let params = req.body;
  let mysql = sql.CommentSql.querycomment;
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




module.exports = router;
