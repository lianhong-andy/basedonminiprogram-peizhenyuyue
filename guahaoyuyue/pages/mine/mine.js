Page({
	data:{

	},
	history(){
		wx.navigateTo({
			url: '../mycomment/mycomment',
		})
    },
    jf(){
      wx.navigateTo({
        url: '../myjf/myjf',
      })
    },
bl(){
  wx.navigateTo({
    url: '../mybl/mybl',
  })
},
about(){
  wx.navigateTo({
    url: '../about/about',
  })
},
    myguahao(){
        wx.navigateTo({
          url: '../myguahao/myguahao',
        })
    },
    exit(){
        wx.showModal({
          title: '提示',
          content: '是否退出',
          complete: (res) => {
            if (res.cancel) {
              
            }
        
            if (res.confirm) {
              wx.clearStorage()
              wx.switchTab({
                url: '../server/server',
              })
            }
          }
        })
    }
    ,alter(){
		wx.navigateTo({
			url: '../alterMsg/alterMsg',
		})
	}
})