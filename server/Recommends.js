const express = require('express');
const router = express.Router();

const DBHelper = require('./DBHelper');
const sql = require('./sqlMap');

//获取推荐手机列表
router.post('/getRecommend', (req, res) => {
  let params = req.body;
  let mysql = sql.Recommend.queryCommend;
  let mess =[];
  if(params.ptype == ''){
    mysql = sql.Recommend.querynotype;
    mess.push(params.pid);
    mess.push(params.min);
    mess.push(params.max);
  }else {
    mysql = sql.Recommend.queryCommend;
    for(let i in params){
      mess.push(params[i]);
    }
  }
  console.log(mess,mysql)
  let connection = new DBHelper().getConn();
  connection.query(mysql,mess,(err,result)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(result);
  });
  connection.end();
});


module.exports = router;
