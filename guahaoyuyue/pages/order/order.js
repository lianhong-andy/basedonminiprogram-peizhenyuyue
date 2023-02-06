// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        allorder:[],
        show: false,
      },
      showPopup() {
        this.setData({ show: true });
      },
    
      onClose() {
        this.setData({ show: false });
      },
      onChange(event) {
       
      },
      toorderdetail(e){
        console.log(e)
        wx.navigateTo({
          url: '../payorder/payorder?id='+e.currentTarget.dataset.id,
        })
      },
      reorder(e){
        console.log(e)
        wx.showModal({
          cancelColor: '',
          title:'是否再次预约',
          success:res=>{
              wx.showLoading({
                title: '正在操作',
              })
              if (res.confirm) {
                wx.setStorageSync('selectserver', e.currentTarget.dataset.res)
                wx.switchTab({
                  url: '../selectJiuyi/selectJiuyi',
                })
                wx.hideLoading({
                  success: (res) => {},
                })
              }else{
wx.hideLoading({
  success: (res) => {},
})
              }
          }
        })
      },
      onShow(){
        wx.showLoading({
          title: '正在加载',
        })
        wx.cloud.callFunction({
            name:"getorder"
        }).then(res=>{
            console.log(res)
            this.setData({
                allorder:res.result.data.reverse()
            })
            wx.hideLoading({
              success: (res) => {},
            })
        })
      },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})