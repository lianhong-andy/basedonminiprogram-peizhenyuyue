const db=wx.cloud.database()
Page({
    data:{
        res:{}
    }
    ,
    onLoad(){
        wx.showLoading({ 
          title: '正在加载',
        })
        db.collection("ysmsg").get().then(res=>{
            console.log(res)
            this.setData({
                res:res.data[0]
            })
            wx.hideLoading()
        })
    }
})