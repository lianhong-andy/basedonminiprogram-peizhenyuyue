const app=getApp()
Page({
    data:{
        workplace:[],
        serverList:[],
        search:'',
        iconList: [{
          icon: 'edit',
          color: 'red',
          
          name: '挂号记录'
        }, {
          icon: 'profile',
          color: 'orange',
          badge: 1,
          name: '修改个人信息'
        }, {
          icon: 'timefill',
          color: 'yellow',
          badge: 0,
          name: '未完待续'
        }],
        swiper: ['https://p9.itc.cn/q_70/images03/20210115/b2908279115f4dc8a6e80e5039df34bb.jpeg'],
    },
    click(e){
      console.log(e)
      var name=e.currentTarget.dataset.item.name
      if(name=='挂号记录'){
        wx.navigateTo({
          url: '../myguahao/myguahao',
        })
      }else if(name=='修改个人信息'){
        wx.navigateTo({
          url: '../alterMsg/alterMsg',
        })
      }else{
        wx.showToast({
          title: '敬请期待',
          icon:"none"
        })
      }
    },
    searchinput(e){
        console.log(e)
        this.setData({
            search:e.detail.value
        })
    },
    search(e){
        wx.navigateTo({
          url: '../search/search?search='+this.data.search,
        })
    },
    onShow(){
        console.log("show", app.globalData.workplace)
        var phone = wx.getStorageSync('loginmsg').phone
        var msg = wx.getStorageSync('msg')
        if (!phone) {
          wx.navigateTo({
            url: '../login/login',
          })
          return
        }
        wx.showLoading({
          title: '正在加载',
        })
        this.setData({
            workplace:app.globalData.workplace
        })
        wx.cloud.callFunction({
            name:'getallserver'
        }).then(res=>{
            console.log(res)
            this.setData({
                serverList:res.result.data
            })
            wx.hideLoading({
              success: (res) => {},
            })
        })
    },todetail(e){
        console.log(e)
        var id=e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../serverdetail/serverdetail?id='+id,
        })
    }
})