const db=wx.cloud.database()
Page({
    data:{
        list:[]
    },
    topay(e){
      console.log(e)
      var ispay=e.currentTarget.dataset.ispay
      var id=e.currentTarget.dataset.id
      if (ispay) {
        wx.showToast({
          title: '已支付',
          icon:"none"
        })
      }else{
        wx.navigateTo({
          url: '../topay/topay?id='+id,
        })
      }
    },
    delete(e){
        wx.showModal({
          title: '提示',
          content: '是否取消',
          complete: (res) => {
            if (res.cancel) {
              
            }
        
            if (res.confirm) {
                wx.showLoading({
                  title: '正在操作',
                })
              var id=e.currentTarget.dataset.id
              db.collection("guahao").doc(id).remove().then(res=>{
                  wx.showToast({
                    title: "已取消",
                    icon:"none"
                  })
                  this.onLoad()
              })

            }
          }
        })
        console.log(e)

    },
    onLoad(){
        wx.showLoading({
          title: '正在加载',
        })
        wx.cloud.callFunction({
            name:"getallguahaobyid",
            data:{
                userid:wx.getStorageSync('loginmsg')._id
            }
        }).then(res=>{
            console.log(res)
            this.setData({
                list:res.result.data.reverse()
            })
            wx.hideLoading()
        })
    }
})