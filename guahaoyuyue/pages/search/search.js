Page({
    data:{
        serverList:[]
    },
    onLoad(e){
        var search=e.search
        wx.showLoading({
          title: '正在搜索',

        })
        wx.cloud.callFunction({
            name:"getserverbysearch",
            data:{
                search:search
            }
        }).then(res=>{
            console.log(res)
            this.setData({
                serverList:res.result.data.reverse()
            })
            wx.hideLoading()
        })
    },todetail(e){
        console.log(e)
        var id=e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../serverdetail/serverdetail?id='+id,
        })
    }
})