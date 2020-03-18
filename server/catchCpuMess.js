/*
* 爬取cpu 评分图
* */

function remove(str) {
  str=  str.replace(/[\r\n]/g,""); //换行符号去掉
  return str.replace(/\ +/g,"")    //空格符号去掉
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
            console.log('成功',i);
          }
        });
      }
    }
  })
}
getMessage(URL);
