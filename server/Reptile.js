const request = require('request');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const iconv = require('iconv-lite');


// var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_613_list_1.html';
var URL = 'http://detail.zol.com.cn/cell_phone_index/subcate57_list_1.html';
var urlRoot = "http://detail.zol.com.cn"
var num = 1

function myRequest(url,callback) {
  var options = {
    url: url,
    encoding: null
  }
  request(options,callback)
}

var data = []

async function getMessage(url) {
  var old_urls = []  //商品详情页的地址
  var url_Array = []  //解析商品详情页的地址
  var old_urls1 = []  //商品显示更多参数的地址
  var url_Array2 = []  //解析商品显示更多参数的地址
  var app = await fetch(url).then(res=>res.text())
  var $ = cheerio.load(app,{decodeEntities: false})
  ele = $("#J_PicMode a.pic")

  for (let i = 0; i < ele.length; i++) {
    old_urls.push(fetch(urlRoot+$(ele[i]).attr('href')).then(res=>res.text()))
  }
  url_Array = await Promise.all(old_urls)
  for (let i = 0; i < url_Array.length; i++) {
    var $1 = cheerio.load(url_Array[i])
    old_urls1.push(urlRoot+$1(".section-more").attr('href'))
  }
  url_Array2 = await Promise.all(old_urls1)
  // console.log(url_Array2)
  for (let i = 0; i < url_Array2.length; i++) {
    UrlRequest(url_Array2[i])
  }
  // UrlRequest(url_Array2[0])
  var nextUrl = $("a.next").attr('href');
  console.log(nextUrl,'数据')
  if(nextUrl){
    let next = urlRoot + nextUrl
    getMessage(next)
  }
  return data
}

//回调函数
function UrlRequest(url) {
  myRequest(url, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      var html = iconv.decode(body, 'gbk');
      var $2 = cheerio.load(html, {decodeEntities: false})
      data.push({
        ReleaseTime:$2("#newPmVal_0").text(),   //发布会时间
        price:$2("#newPmVal_1 #param-list-b2c-jd").text(),  //价格
        listingDate:$2("tr").eq(3).children().text(),  //  上线
        screenType:$2("#newPmVal_3").text(),  //屏幕类型
        phoneSize:$2(".t-shuangshou .box-item-fl .product-link").text(),  //屏幕大小
        resolution:$2(".t-fenbianlv-hd .box-item-fl .product-link").text(), //分辨率
        name:$2(".product-model__name").text(),
        factory:$2("#newPmVal_4").text(),  //出厂内核
        OperatingSystem:$2("#newPmVal_5").text(), //操作系统
        cpuModel:$2("#newPmVal_6").text(), //cpu模型
        phoneColor:$2("#newPmVal_7").text(), //机身颜色
        Unlock:$2("#newPmVal_8").text(),  //解锁方式
        cpuFrequen:$2("#newPmVal_14").text(),  //cpu频率
        Gpu:$2("#newPmVal_16").text(), //GPU
        RAMcontain:$2("#newPmName_17").text(), // RAM容量
        ROMcontain:$2("#newPmVal_18").text(), //ROM容量
        memoryCard:$2("#newPmVal_19").text(), //存储卡
        Expandcontain:$2("#newPmVal_20").text(),  //扩展容量
        batteryType:$2("#newPmVal_21").text(),  //电池类型
        Batterycontain:$2("#newPmVal_21").text(),  //电池容量
        fiveNet:$2("#newPmVal_26").text(),  //5G网络
        fourNet:$2("#newPmName_27").text(),  //4G网络
        navigation:$2("#newPmVal_32").text(),  //导航
        bluetooth:$2("#newPmName_34").text(),  //蓝牙
        NFC:$2("#newPmName_35").text(),  //NFC
        camerasTotal:$2("#newPmVal_38").text(),  //摄像头总数
        BackCamera:$2("#newPmVal_39").text(),  //后置
        FrontCamera:$2("#newPmVal_40").text(),  //前置
        flashlight:$2("#newPmVal_43").text(),  //闪光灯
        Aperture:$2("#newPmVal_44").text(),  //光圈
        Focalrange:$2("#newPmVal_45").text(),  //焦距/范围
        camerafun:$2("#newPmVal_47").text(),  //拍照功能
      })
      num++
      console.log(data,num)
    }
  })
}
getMessage(URL)
