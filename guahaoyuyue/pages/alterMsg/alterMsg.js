
const db=wx.cloud.database()
// pages/alterMsg/alterMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: {},
    date: '2002-01-22',
    picker: ['男', '女'],
    index:0
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onLoad(options) {

  },
  submit(e) {
    console.log(e)
    wx.showLoading({
      title: '正在修改',
    })

    console.log(e)
    var form = e.detail.value
    


    if (this.data.index == "1") {
      var gender = "女"
    } else {
      var gender = "男"
    }
    var userid = this.data.res._id
    var date = this.data.date
    db.collection('user').doc(userid).update({
      data: {
        gender:gender,
        brithday:date,
        age:form.age,
        name: form.name,
        phone: form.phone,
        username:form.username,
        password:form.password,
        pos:form.pos
      }
    }).then(res=>{
      // 写缓存 
      wx.showToast({
        title: '修改成功',
        icon:'none'
      })
      wx.clearStorage()
      setTimeout(() => {
        wx.switchTab({
          url: '../server/server',
        })
      }, 1000);
    })
    
  },
  onShow() {
    wx.showLoading({
      title: '正在加载',
    })
    var res = wx.getStorageSync('loginmsg')
    var id = wx.getStorageSync('loginmsg')._id
    db.collection("user").doc(id).get().then(res=>{
      wx.hideLoading()
      this.setData({
        res: res.data,
        date:res.data.brithday,
        index:res.data.gender=='男'?'0':'1'
      }) 
    })
    
  },
})