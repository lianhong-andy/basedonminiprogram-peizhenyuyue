const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    workplace: [],
    workplacelist: [],
    swiper: ['https://p9.itc.cn/q_70/images03/20210115/b2908279115f4dc8a6e80e5039df34bb.jpeg'],
    server: [],
    date: '2023-01-22',
    time: '12:01',
    keshi: app.globalData.booktype,
    indexkeshi:''
  },
  onLoad() {
    this.getNowDate()
  },
  submit(e) {
    wx.showLoading({
      title: '正在操作',
    })
    console.log(e)
    var userId = wx.getStorageSync('userId')
    // 这里怎么写
    var submittime = this.getNowDate()
    var sage = this.data.server.sage
    var sbirthday = this.data.server.sbirthday
    var sbrief = this.data.server.sbrief
    var scardid = this.data.server.scardid
    var sgender = this.data.server.sgender
    var sid = this.data.server.sid
    var simage = this.data.server.simage
    var sjob = this.data.server.sjob
    var smoney = this.data.server.smoney
    var sname = this.data.server.sname
    var sphone = this.data.server.sphone
    var sworkimage = this.data.server.sworkimage
    var sworkplace = this.data.server.sworkplace
    var sworkplacename = this.data.server.sworkplacename
    var sworkyear = this.data.server.sworkyear
    var serverId = this.data.server._id
    db.collection('orderList').add({
      data: {
        serverId: serverId,
        userId: userId,
        brief: e.detail.value.sickbrief,
        submittime: submittime,
        sage: sage,
        sbirthday: sbirthday,
        sbrief: sbrief,
        scardid: scardid,
        sgender: sgender,
        sid: sid,
        simage: simage, 
        sjob: sjob,
        smoney: smoney,
        sname: sname,
        sphone: sphone,
        sworkimage: sworkimage,
        sworkplace: sworkplace,
        sworkplacename: sworkplacename,
        sworkyear: sworkyear,
        bookdate: this.data.date,
        booktime: this.data.time,
        selectkeshi:this.data.keshi[this.data.indexkeshi],
        ispay: false, //是否已支付
      }
    }).then(res => {
      console.log(res)
      var orderId = res._id

      wx.hideLoading()
      wx.navigateTo({
        url: '../payorder/payorder?id=' + orderId,
      })
    })
  },
  getNowDate: function () {


    var date = new Date();
    var year = date.getFullYear() //年
    var month = date.getMonth() + 1 //月
    var day = date.getDate() //日

    var hour = date.getHours() //时
    var minute = date.getMinutes() //分
    var second = date.getSeconds() //秒

    var xiaoshi = "";
    if (hour < 10) {
      xiaoshi = "0" + hour;
    } else {
      xiaoshi = hour + "";
    }

    var fenzhong = "";
    if (minute < 10) {
      fenzhong = "0" + minute;
    } else {
      fenzhong = minute + "";
    }

    var miao = "";
    if (second < 10) {
      miao = "0" + second;
    } else {
      miao = second + "";
    }
    var time = year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao
    return time


  },
  gettime() {
    //写获取时间
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + '-' + M + '-' + D
  },

  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  PickerChangekeshi(e) {
    console.log(e);
    this.setData({
      indexkeshi: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
    wx.showToast({
      title: '即将选择陪诊人员',
      icon: 'none'
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '../selectServer/selectServer?name=' + this.data.workplacelist[e.detail.value]
      })
    }, 1000);
  },
  onShow() {
    console.log("show", app.globalData.workplace)
    var phone = wx.getStorageSync('loginmsg').phone
    var msg = wx.getStorageSync('msg')
    if (!phone) {
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }else{
        setTimeout(() => {
            
        }, 1000);
    }
  
   
  },
})