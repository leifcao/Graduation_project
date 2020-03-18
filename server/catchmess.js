/*
* 获取手机商品全部信息 爬虫
* */

var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_35579_list_1.html';
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

  for (let i = 0; i < ele.length; i++) {
    old_urls.push(fetch(urlRoot + $(ele[i]).attr('href')).then(res => res.text()))
  }
  url_Array = await Promise.all(old_urls)
  for (let i = 0; i < url_Array.length; i++) {
    var $1 = cheerio.load(url_Array[i])
    old_urls1.push(urlRoot + $1(".section-more").attr('href'))
  }
  url_Array2 = await Promise.all(old_urls1)
  // console.log(url_Array2)
  for (let i = 0; i < url_Array2.length; i++) {
    UrlRequest(url_Array2[i])
  }
  // UrlRequest(url_Array2[0])
  nextUrl = $("a.next").attr('href');
  console.log(nextUrl, '数据');
  if(nextUrl){
    let next = urlRoot + nextUrl;
    getMessage(next);
  }
  return data
}

//回调函数
function UrlRequest(url) {
  myRequest(url, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      var html = iconv.decode(body, 'gbk');
      var $2 = cheerio.load(html, {decodeEntities: false});
      var screenType;//屏幕类型
      var OperatingSystem;  //操作系统
      var Unlock;  //解锁方式
      var cpuModel;  //CPU型号
      var cpuFrequen;  //cpu频率
      var batteryType;  //电池类型
      var navigation;  //导航
      var bluetooth;  //蓝牙
      var NFC;  //NFC
      var Aperture;  //光圈

      if ($2("#newPmName_3").text() == '屏幕类型') {
        screenType = $2("#newPmVal_3").text();
      }
      if ($2("#newPmName_5").text() == '操作系统') {
        OperatingSystem = $2("#newPmVal_5").text();
      }
      if ($2("#newPmName_8").text() == '解锁方式') {
        Unlock = $2("#newPmVal_8").text();
      }
      if ($2("#newPmName_6").text() == 'CPU型号') {
        cpuModel = $2("#newPmVal_6").text();
      } else if ($2("#newPmName_3").text() == 'CPU型号') {
        cpuModel = $2("#newPmVal_3").text();
      }
      if ($2("#newPmName_15").text() == 'CPU频率') {
        cpuFrequen = $2("#newPmVal_15").text();
      } else if ($2("#newPmName_17").text() == 'CPU频率') {
        cpuFrequen = $2("#newPmVal_17").text();
      }
      if ($2("#newPmName_23").text() == '电池类型') {
        batteryType = $2("#newPmVal_23").text();
      } else if ($2("#newPmName_19").text() == '电池类型') {
        batteryType = $2("#newPmVal_19").text();
      }
      if ($2("#newPmName_33").text() == '导航') {
        navigation = $2("#newPmVal_33").text();
      } else if ($2("#newPmName_30").text() == '导航') {
        navigation = $2("#newPmVal_30").text();
      }
      if ($2("#newPmName_35").text() == '蓝牙') {
        bluetooth = $2("#newPmVal_35").text();
      } else if ($2("#newPmName_34").text() == '蓝牙') {
        bluetooth = $2("#newPmVal_34").text();
      }
      if ($2("#newPmName_35").text() == 'NFC') {
        NFC = $2("#newPmVal_35").text();
      } else if ($2("#newPmName_33").text() == 'NFC') {
        NFC = $2("#newPmVal_33").text();
      }
      if ($2("#newPmName_42").text() == '光圈') {
        Aperture = $2("#newPmVal_42").text();
      } else if ($2("#newPmName_41").text() == '光圈') {
        Aperture = $2("#newPmVal_41").text();
      }

      var object = {
        name: $2(".product-model__name").text(),
        type: '一加',
        imgsrc: $2(".big-pic-fl img").attr('src'), //图片
        price: $2("#newPmVal_1 #param-list-b2c-jd").text(),  //价格
        screenType: screenType,  //屏幕类型
        phoneSize: $2(".t-shuangshou .box-item-fl .product-link").text(),  //屏幕大小
        resolution: $2(".t-fenbianlv-hd .box-item-fl .product-link").text(), //分辨率
        OperatingSystem: OperatingSystem, //操作系统
        cpuModel: cpuModel, //cpu模型
        Unlock: Unlock,  //解锁方式
        cpuFrequen: cpuFrequen,  //cpu频率
        batteryType: batteryType,  //电池类型
        navigation: navigation,  //导航
        bluetooth: bluetooth,  //蓝牙
        NFC: NFC,  //NFC
        Aperture: Aperture,  //光圈
      };
      let connection = new DBHelper().getConn();
      connection.query('insert into phonemessage set ?', object, (err, result) => {
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
