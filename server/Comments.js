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
  // console.log(mysql,message);
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
    let list =[];
    Object.assign(list,result);
    // console.log(list)
    // 评论数组
    var newlist=[];
    // 回复数组
    var oldlist = [];
    // 分类评论和回复内容
    for(var i=0;i<list.length;i++){
      //  targetName 为空表示为直接留遗言
      if(list[i].targetName==''){
        newlist.push(list[i]);
      }else{
        // 回复数组
        oldlist.push(list[i]);
      }
    }
    for(var i=0;i<newlist.length;i++){
      for(var j=0;j<oldlist.length;j++){
        // 判断回复的目标和直接留言的人id是否相等
        if(newlist[i].cid == oldlist[j].tag ){
          if(newlist[i].target == undefined){
            newlist[i].target =[];
            newlist[i].target.push(oldlist[j]);
            continue;
          }
          newlist[i].target.push(oldlist[j]);
        }
      }
    }

    // console.log(newlist);
    res.json(newlist);
  });
  connection.end();
});




module.exports = router;
