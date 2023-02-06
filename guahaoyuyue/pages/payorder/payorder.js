

// pages/payorder/payorder.js
const db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        res:[],
        show:false,
        showpay:false,
      values:5,
      actions: [
        {
          name: '微信支付',
        },
        {
          name: '支付宝支付',
        },

      ],
        steps: [
            {
              text: '等待接单',
            },
            {
              text: '预约成功',
            },
            {
              text: '按时履约',
            },
            {
              text: '服务完成',
            },
          ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onClosepay() {
      this.setData({ showpay: false });
    },
  
    onSelect(event) {
      console.log(event.detail);
      this.onSubmit()
    },
    lookcomment(e){
      console.log(e)
     wx.navigateTo({
       url: '../mycomment/mycomment',
     })
    },
    comment(e){
      wx.showLoading({
        title: '正在操作',
      })
      console.log(e)
      var comment=e.detail.value.comment
      var res=this.data.res
      var that=this
      var usermsg=wx.getStorageSync('msg')
      db.collection('comment').add({
        data:{
          comment:comment,
          serverId:res.serverId,
          userId:res.userId,
          servermsg:res,
          usermsg:usermsg,
          time:this.getNowDate(),
          star:this.data.values
        }
      }).then(res=>{
        db.collection("orderList").doc(that.data.res._id).update({
          data:{
            iscomment:true
          }
        }).then(res=>{
          wx.showToast({
            title: '评价成功',
          })
          this.onClose()
          this.setData({
            iscomment:true
          })
          wx.hideLoading({
            success: (res) => {},
          })
        })
        
      })
    },
    getNowDate: function () {


      var date = new Date();
      var year = date.getFullYear() //年
      var month = date.getMonth() + 1 //月
      var day = date.getDate() //日
  
      var hour = date.getHours() //时
      var minute = date.getMinutes() //分
      var second = date.getSeconds() //秒
  
      var xiaoshi = "";
      if (hour < 10) {
        xiaoshi = "0" + hour;
      } else {
        xiaoshi = hour + "";
      }
  
      var fenzhong = "";
      if (minute < 10) {
        fenzhong = "0" + minute;
      } else {
        fenzhong = minute + "";
      }
  
      var miao = "";
      if (second < 10) {
        miao = "0" + second;
      } else {
        miao = second + "";
      }
      var time = year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao
      return time
  
  
    },
    showPopup() {
      this.setData({ show: true });
    },
    showPopuppay() {
      console.log("支付show")
      this.setData({ showpay: true });
    },
    onChange(event) {
      this.setData({
        values: event.detail,
      });},
    onClose() {
      this.setData({ show: false,showpay:false });
    },
    onSubmit(e){
      wx.showLoading({
        title: '正在支付',
      })
      db.collection('orderList').doc(this.data.res._id).update({
        data:{
          ispay:true
        }
      }).then(res=>{
        var s=this.data.res.ispay
        this.setData({
          ispay:true
        })
        wx.showToast({
          title: '支付成功',
          icon:'none'
        }) 
        setTimeout(() => {
          wx.hideLoading({
            success: (res) => {},
          })
        }, 2000);
      })
    },
    onLoad(options) {
        var id=options.id
        db.collection('orderList').doc(id).get().then(res=>{
            console.log(res)
            this.setData({
                res:res.data,
                ispay:res.data.ispay,
                iscomment:res.data.iscomment
            })
            // 判断是到了哪个阶段
            if (res.data.isend) {
                this.setData({ 
                    value:'3'
                })
            }else if(res.data.isstart){
                this.setData({
                    value:'2'
                })
            }else if(res.data.isaccept){
                this.setData({
                    value:'1'
                })
            }else{
                this.setData({
                    value:'0'
                })
            }
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
    onShow() {

    },

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