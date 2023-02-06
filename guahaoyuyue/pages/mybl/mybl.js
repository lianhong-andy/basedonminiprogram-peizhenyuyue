Page({
    data:{
        res:[]
    },
    onLoad(){
        wx.showLoading({
          title: '正在加载',
        })
        var userid=wx.getStorageSync('loginmsg')._id
        wx.cloud.callFunction({
            name:"getblbyid",
            data:{   
                userid:userid
            }
        }).then(res=>{
            console.log(res)
            this.setData({ 
                res:res.result.data.reverse()
            })
            wx.hideLoading()
        })
    }

})