// pages/login/login.js
const db = wx.cloud.database() //打开数据库连接
Page({
  data: {
    radio: '2'
  },
  register(e) {
    wx.showLoading({
      title: '正在注册',
      icon: 'none'
    })
    console.log(e)
    var username = e.detail.value.username
    var phone = e.detail.value.phone
    var password = e.detail.value.password
    var name = e.detail.value.name
    if (username == '' || password == "") {
      wx.showToast({
        title: '请补全账号密码',
        icon: 'none'
      })
      return
    }


    db.collection('user').add({
      data: {
        username: username,
        password: password,
        phone: phone,
        name: name,
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '注册成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1000);
    })
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  toregister(e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  login(e) {
    wx.showLoading({
      title: '正在登录',
      icon: 'none'
    })
    console.log(e)
    var username = e.detail.value.username
    var password = e.detail.value.password
    if (username == '' || password == "") {
      wx.showToast({
        title: '请补全账号密码',
        icon: 'none'
      })
      return
    }
    var isadmin = this.data.radio == '1' ? true : false
    console.log(isadmin)
    db.collection('user').where({
      username: username,
      password: password,
      isadmin: isadmin
    }).get().then(res => {
      console.log(res)
      if (res.data.length == 1) {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.setStorageSync('loginId', res.data[0]._id)
        wx.setStorageSync('msg', res.data[0])
        wx.setStorageSync('isadmin', res.data[0].isadmin)
        wx.setStorageSync('joinedclass', res.data[0].joinedclass)
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000);
      } else {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  }
})