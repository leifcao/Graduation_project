
// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_613_list_1.html';//华为
// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_98_list_1.html';//三星
// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_1673_list_1.html';//OPPO
// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_1795_list_1.html';//vivo
// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_544_list_1.html';//苹果
// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_50840_list_1.html';//荣耀
// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_34645_list_1.html';//小米
var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_35579_list_1.html';//一加

// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_list_1.html';
var urlRoot = "http://detail.zol.com.cn"
var num = 1

var nextUrl;

function myRequest(url, callback) {
  var options = {
    url: url,
    encoding: null
  }
  request(options, callback)
}

var data = []

async function getMessage(url) {
  var old_urls = []  //商品详情页的地址
  var url_Array = []  //解析商品详情页的地址
  var old_urls1 = []  //商品显示更多参数的地址
  var url_Array2 = []  //解析商品显示更多参数的地址
  var app = await fetch(url).then(res => res.text())
  var $ = cheerio.load(app, {decodeEntities: false})
  ele = $("#J_PicMode a.pic")

  //拼接首页地址
  for (let i = 0; i < ele.length; i++) {
    // old_urls.push(fetch(urlRoot + $(ele[i]).attr('href')).then(res => res.text()));
    old_urls.push(urlRoot + $(ele[i]).attr('href'));
  }
  url_Array = await Promise.all(old_urls);
  // console.log(url_Array)

  for (let i = 0; i < url_Array.length; i++) {
    // console.log(url_Array[i])
    UrlRequest(url_Array[i]);
  }

  nextUrl = $("a.next").attr('href');
  console.log(nextUrl, '数据');
  if (nextUrl) {
    let next = urlRoot + nextUrl;
    getMessage(next);
  }
  return data;
}

// var s ="价格4500元";
// var num= s.replace(/[^0-9]/ig,"");


//回调函数
function UrlRequest(url) {
  myRequest(url, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      var html = iconv.decode(body, 'gbk');
      var $2 = cheerio.load(html, {decodeEntities: false});
      var object;
      if ($2(".text").length == 7) {
        object = {
          name: $2(".product-model__name").text(),
          type: '一加',
          prices: $2(".price-type").text(),  //价格
          totalscore: $2(".total-score").find("strong").eq(0).text(), //评分
          Img1: $2("#threeSmallPic li").eq(0).find("img").attr('src'), //图片2
          Img2: $2("#threeSmallPic li").eq(1).find("img").attr('src'), //图片2
          Img3: $2("#threeSmallPic li").eq(2).find("img").attr('src'), //图片2
          CPU: $2(".product-link").eq(0).text(), //cpu
          Postposition: $2(".product-link").eq(1).text(), //后置
          Preposition: $2(".product-link").eq(2).text(), //前置
          Memory: $2(".product-link").eq(3).text(), //内存
          Battery: $2(".product-link").eq(4).text(), //电池
          screen: $2(".product-link").eq(5).text(),  //屏幕
          Resolvingpower: $2(".product-link").eq(6).text(),  //分辨率
          CPU1: $2(".text-hui").eq(0).text(), //cpu1图标
          Postposition1: $2(".text-hui").eq(1).text(),//后置1图标
          Preposition1: $2(".text-hui").eq(2).text(),//前置1图标
          Memory1: $2(".text-hui").eq(3).text(),//内存1图标
          Battery1: $2(".text-hui").eq(4).text(),//电池1图标
          screen1: $2(".text-hui").eq(5).text(),//屏幕1图标
          Resolvingpower1: $2(".text-hui").eq(6).text(),//分辨率1图标
          CPU2: $2(".info-item .text").eq(0).text(), //cpu2条形
          Postposition2: $2(".text").eq(1).text(),//后置2条形
          Preposition2: $2(".text").eq(2).text(),//前置2条形
          Memory2: $2(".text").eq(3).text(),//内存2条形
          Battery2: $2(".text").eq(4).text(),//电池2条形
          screen2: $2(".text").eq(5).text(),//屏幕2条形
          Resolvingpower2: $2(".text").eq(6).text(),//分辨率2条形
        };
      } else {
        object = {
          name: $2(".product-model__name").text(),
          type: '一加',
          prices: $2(".price-type").text(),  //价格
          totalscore: $2(".total-score").find("strong").eq(0).text(), //评分
          Img1: $2("#threeSmallPic li").eq(0).find("img").attr('src'), //图片2
          Img2: $2("#threeSmallPic li").eq(1).find("img").attr('src'), //图片2
          Img3: $2("#threeSmallPic li").eq(2).find("img").attr('src'), //图片2
          CPU: $2(".product-link").eq(0).text(), //cpu
          Postposition: $2(".product-link").eq(1).text(), //后置
          Preposition: $2(".product-link").eq(2).text(), //前置
          Memory: $2(".product-link").eq(3).text(), //内存
          Battery: $2(".product-link").eq(4).text(), //电池
          screen: $2(".product-link").eq(5).text(),  //屏幕
          Resolvingpower: $2(".product-link").eq(6).text(),  //分辨率
          CPU1: '', //cpu1
          Postposition1: $2(".text-hui").eq(1).text(),//后置1图标
          Preposition1: $2(".text-hui").eq(2).text(),//前置1图标
          Memory1: $2(".text-hui").eq(3).text(),//内存1图标
          Battery1: $2(".text-hui").eq(4).text(),//电池1图标
          screen1: $2(".text-hui").eq(5).text(),//屏幕1图标
          Resolvingpower1: $2(".text-hui").eq(6).text(),//分辨率1
          CPU2: '', //cpu2条形
          Postposition2: $2(".text").eq(0).text(),//后置2条形
          Preposition2: $2(".text").eq(1).text(),//前置2条形
          Memory2: $2(".text").eq(2).text(),//内存2条形
          Battery2: $2(".text").eq(3).text(),//电池2条形
          screen2: $2(".text").eq(4).text(),//屏幕2条形
          Resolvingpower2: $2(".text").eq(6).text(),//分辨率2条形
        };
      }
      let connection = new DBHelper().getConn();
      connection.query('insert into phoneproducts set ?', object, (err, result) => {
        if (err) console.log('err', err)
        else {
          console.log('成功')
        }
      });
      num++;
    }
  })
}

getMessage(URL);
