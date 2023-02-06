Page({
  data: {
    serverList: [],
    date: '',
    keshiname:'',
    show: false,
  },
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onLoad(e) {
    wx.showLoading({
      title: '正在加载',
    })
    var id = e.id
    var keshiname = e.keshiname
    wx.cloud.callFunction({
      name: 'getserverbytype',
      data: {
        id: id
      }
    }).then(res => {
      console.log(res)
      this.setData({
        serverList: res.result.data,
        keshiname: keshiname
      })
      wx.hideLoading()
    })
  },
  gh(e) {
    console.log(e)
    var item = e.currentTarget.dataset.value
    var doctor = item.name
    var date = this.data.date
    if (date=='') {
      wx.showToast({
        title: '请先选择日期',
        icon:"none"
      })
      return
    }
    var keshi = this.data.keshiname
    var maxNum = item.maxNum
    var docid=item._id
    wx.navigateTo({
      url: `../ghbook/ghbook?doctor=${doctor}&date=${date}&keshi=${keshi}&maxNum=${maxNum}&docid=${docid}`,
    })
  }
})