Page({
  onLoad(){
      wx.showLoading({
        title: '正在加载',

      })
      wx.cloud.callFunction({
          name:"getallkeshi"
      }).then(res=>{
          console.log(res)
          this.setData({
              res:res.result.data
          })
          wx.hideLoading()
      })
  }  ,
  tolist(e){
      console.log(e)
      var id=e.currentTarget.dataset.id
      var keshiname=e.currentTarget.dataset.keshiname
      wx.setStorageSync('clickkeshi', keshiname)
      wx.navigateTo({
        url: '../doctorbykeshi/doctorbykeshi?id='+id+'&keshiname='+keshiname,
      })
  }
})