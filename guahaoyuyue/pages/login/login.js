// pages/login/login.js
const db = wx.cloud.database() //打开数据库连接
Page({
    data: {
        radio:'2'
    },
    toregister(e){
      wx.navigateTo({
        url: '../register/register',
      })
      },
    login(e) {
        wx.showLoading({
          title: '正在登录',
          icon:'none'
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
        db.collection('user').where({
            username: username,
            password: password,
        }).get().then(res => {
            console.log(res)
            if (res.data.length == 1) {
                wx.hideLoading({
                  success: (res) => {},
                })
                wx.setStorageSync('loginmsg', res.data[0])
                
                wx.showToast({
                  title: '登录成功',
                  icon:'none'
                })
                setTimeout(() => {
                    wx.navigateBack({
                      delta: 1,
                    })
                }, 1000);
            }else{
                wx.hideLoading({
                  success: (res) => {},
                })
                wx.showToast({
                  title: '登录失败',
                  icon:'none'
                })
            }
        })
    }
})