
Page({
    data:{
        id:'',
        res:{}
    },
    onSubmit(){
        wx.showLoading({
          title: '正在操作',
        })
        wx.cloud.callFunction({
            name:"updateghpaybyid",
            data:{
                id:this.data.id
            }
        }).then(res=>{
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '支付完成',
            })
            setTimeout(() => {
                wx.switchTab({
                  url: '../server/server',
                })
            }, 2000);
        })
    },
    onLoad(e){
        wx.showLoading({
          title: '正在加载',
        })
        var id=e.id 
        // var id='ff3a195863e082e601c6cc83722dd78f'
        this.setData({
            id:id
        })
        wx.cloud.callFunction({
            name:"getghbyid",
            data:{
                id:id
            }
        }).then(res=>{
            console.log(res)
            this.setData({
                res:res.result.data
            })
            wx.hideLoading()
        })
      
    }   
})