// sql语句
var sqlMap = {
  //用户
  user: {
    // 添加用户
    add: 'insert into user(name,password,type,tel) values (?, ?, ?,?)',
    //查询用户id
    select: 'SELECT * FROM user WHERE id=? AND name not in("admin") LIMIT ?,15',
    // 查询用户
    select1: 'SELECT * FROM user WHERE name like "%"?"%" AND name not in("admin") LIMIT ?,15',
    //查类别
    select2: 'select * from user where type=? LIMIT ?,15',
    // login: 'select * from user where name=? and password=?',
    login: 'select * from user where name=? and password=?',
    //删除用户
    deletes: 'delete from user where id=?',
    // 更新用户信息
    updates: 'UPDATE user SET name=?,password=?,type=?,tel=? WHERE id=?',
  },
  //商品
  products: {
    //搜索查询 模糊查询
    querySearch: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND a.name LIKE "%"?"%"',
    //查询全部
    queryProduct: 'SELECT a.pid,a.name,a.type,a.imgsrc,b.prices,b.totalscore\n' +
      'FROM allphone as a,phoneproducts AS b\n' +
      'WHERE a.name = b.name\n' +
      'ORDER BY b.prices LIMIT ',
    // 查询单品分类
    queryPhoneType: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND a.type=?\n' +
      'LIMIT ?,?',
    //查询单品价格区间 >5000
    moreThan5: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND b.prices>5000\n' +
      'ORDER BY b.prices DESC\n' +
      'LIMIT ?,?',
    ///查询单品价格区间 >5000 的 品牌
    moreTypePrice: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND a.type =? AND b.prices>5000\n' +
      'ORDER BY b.prices DESC\n' +
      'LIMIT ?,?',
    //查询单品价格区间 0-5000
    betweenPrice: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b \n' +
      'WHERE a.name = b.name AND b.prices>? AND b.prices<? \n' +
      'ORDER BY b.prices DESC\n' +
      'LIMIT ?,?',
    //查询单品价格区间 + 类型
    betweenPriceType: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND a.type =? AND b.prices>? AND b.prices<?\n' +
      'ORDER BY b.prices DESC\n' +
      'LIMIT ?,?',
    //热评栏目
    hotComment: 'select allphone.pid,allphone.name,allphone.imgsrc,allphone.prices,allphone.type,phoneproducts.totalscore \n' +
      'from allphone,phoneproducts \n' +
      'WHERE allphone.name = phoneproducts.name \n' +
      'ORDER BY phoneproducts.totalscore desc LIMIT 0,15 ',
    PhoneSwiper: 'SELECT a.pid,a.name,a.imgsrc,b.prices\n' +
      'FROM allphone as a,phoneproducts as b\n' +
      'WHERE a.name = b.name\n' +
      'ORDER BY b.prices LIMIT 0,6',
  },
  //详情
  DetailedMessage: {
    detailed: 'SELECT a.*,b.psid,b.Img1,b.Img2,b.Img3,b.prices as Price,b.totalscore as score \n' +
      'FROM allphone as a,phoneproducts as b\n' +
      'WHERE a.name = b.name and a.pid =?',
  },
  // 对比页
  ComparePage: {
    //手机对比
    PhoneComparsion: 'SELECT a.*,b.prices as Price\n' +
      'FROM allphone as a,phoneproducts as b \n' +
      'WHERE a.name = b.name and a.pid in(?,?,?)',
    //弹窗信息类型查询
    AlertWindows: 'select a.*,b.totalscore as total,b.prices as Price\n' +
      'from allphone as a,phoneproducts as b\n' +
      'WHERE a.name = b.name and a.type =?',
    //弹窗信息全部查询
    AlertWindows1: 'select a.*,b.totalscore as total,b.prices as Price\n' +
      'from allphone as a,phoneproducts as b\n' +
      'WHERE a.name = b.name LIMIT 0,100',
    CpuModel: 'SELECT * FROM cpudesc',
  },
  CommentSql: {
    //添加评论
    addcomment: 'INSERT INTO comment(pid,userName,phonename,phonetype,scores,comments,createTime,pass) VALUES (?,?,?,?,?,?,?,0)',
    //超级管理检测评论
    checkcomment: '',
    //查看评论
    querycomment: 'SELECT * FROM comment WHERE pid=? AND pass=1',
    //  驳回查询
    rejectlist: 'SELECT * FROM comment WHERE userName=? AND pass=3',
  },
  Recommend: {
    //between 的用法 查找推荐啊
    queryCommend: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND a.pid not in(?) AND a.type=? AND b.prices BETWEEN ? AND ? \n' +
      'ORDER BY RAND() DESC LIMIT 0,5',
    querynotype: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND a.pid not in(?) AND b.prices BETWEEN ? AND ? \n' +
      'ORDER BY RAND() DESC\n' +
      'LIMIT 0,5',
  },
  // 管理员管理商品
  AdminManage: {
    //根据id查询
    queryID: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND a.pid=?\n' +
      'LIMIT ?,?',
    //根据名字模糊查询
    queryName: 'SELECT a.pid,a.name,a.imgsrc,a.type,b.prices,b.totalscore\n' +
      'FROM allphone AS a,phoneproducts AS b\n' +
      'WHERE a.name = b.name AND a.name like "%"?"%"\n' +
      'LIMIT ?,?',
    //批量更新手机信息
    updatePhones: 'UPDATE allphone as a,phoneproducts as b \n' +
      'set b.prices=?,a.cpuFrequen=?,a.navigation=?,a.bluetooth=?,a.OperatingSystem=?,a.Unlock=?,\n' +
      'a.imgsrc=?,a.Battery=?,a.Battery1=?,a.Battery2=?,a.CPU=?,a.CPU1=?,\n' +
      'a.CPU2=?,a.Memory=?,a.Memory1=?,a.Memory2=?,a.Postposition=?,a.Postposition1=?,\n' +
      'a.Postposition2=?,a.Preposition=?,a.Preposition1=?,a.Preposition2=?,a.Resolvingpower=?,a.Resolvingpower1=?,a.Resolvingpower2=?,a.screen=?,a.screen1=?,a.screen2=?,a.NFC=?,b.totalscore=?\n' +
      'WHERE a.name = b.name and a.pid =?',
    //  删除手机信息 以及相关的评论信息也删除
    delePhones: 'DELETE\n' +
      '\tallphone,\n' +
      '\tphoneproducts,\n' +
      '\tcomment\n' +
      'FROM\n' +
      '\tallphone\n' +
      '\tLEFT JOIN phoneproducts\n' +
      '\ton allphone.name=phoneproducts.name\n' +
      '\tLEFT JOIN comment\n' +
      '\ton allphone.pid = comment.pid\n' +
      'WHERE allphone.pid =? ',
    //  评论信息审核 列表
    getUnComment: 'SELECT * FROM comment WHERE pass=0',
    getComment: 'SELECT * FROM comment WHERE pass=1',
    //通过审核
    Audited: 'UPDATE comment SET pass=1 WHERE cid=?',
    //查询单一评论信息
    singleComment: 'SELECT * FROM comment WHERE cid=?',
    //评论驳回
    rejectQuery: 'UPDATE comment SET pass=3,rejectReason=? WHERE cid=?',
    //  用户确认驳回信息 更新状态
    suerReject: 'UPDATE comment SET pass=4 WHERE cid=?',
    deleComment:'delete from comment where cid=?'
  }

}

module.exports = sqlMap;
