Page({
    data: {
        date: '',
        doctor: '',
        keshi: '',
        maxNum: 9,
        radio: '1',
        remain1:0,
        remain2:0,
        remain3:0,
        remain4:0,
    },
 

    onClick(event) {
        console.log(event)
        const {
            name
        } = event.currentTarget.dataset;
        
        this.setData({
            radio: name,
        });
    },
    onLoad(e) {
        //还是要拿id去获取一下医生的信息。
        console.log(e)
        var date = e.date
        var doctor = e.doctor
        var keshi = e.keshi
        var maxNum = e.maxNum
        var docid = e.docid
        wx.cloud.callFunction({
            name:"getserverbyid",
            data:{
                id:docid
            }
        }).then(res=>{
            console.log(res)
            this.setData({
                doctorinfo:res.result.data
            })
        })
        this.setData({
            
            date: date,
            doctor: doctor,
            keshi: keshi,
            maxNum: maxNum,
            docid:docid
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"1",
                doctor:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain1:res.result.data.length
            })
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"2",
                doctor:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain2:res.result.data.length
            })
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"3",
                doctor:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain3:res.result.data.length
            })
        })
        wx.cloud.callFunction({
            name:'getghbynum',
            data:{
                bookdate:this.data.date,
                timenum:"4",
                doctor:docid
            }
        }).then(res=>{
            console.log(res.result.data.length)
            this.setData({
                remain4:res.result.data.length
            })
        })
    },
    verify(timenum){
        if (timenum=='1') {
            if (this.data.remain1==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }if (timenum=='2') {
            if (this.data.remain2==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }if (timenum=='3') {
            if (this.data.remain3==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }if (timenum=='4') {
            if (this.data.remain4==this.data.maxNum) {
                //说明已经约满了
                return false
            }
        }
        return true
    },
    book(){
        //预约开始
        //一，验证一下是不是有足够多的剩余位
        var timenum=this.data.radio
       var isfull= this.verify(timenum)
       if (!isfull) {
           wx.showToast({
             title: '该时间段不可约，请重新选择！',
             icon:"none"
           })
           return
       }
        wx.showLoading({
          title: '正在操作',
        })
        const db=wx.cloud.database()
        db.collection("guahao").add({
            data:{
                ghdoctor:this.data.docid,
                ghuser:wx.getStorageSync('loginmsg')._id,
                timenum:this.data.radio,
                bookdate:this.data.date,
                keshi:this.data.keshi,
                ghdoctorname:this.data.doctor,
                ispay:false,
                price:this.data.doctorinfo.price
            }
        }).then(res=>{
            wx.hideLoading()
            console.log(res)
            wx.showToast({
              title: '操作成功',
              icon:"none"
            })
            // 完成了就跳转到支付呗
            var newid=res._id
            wx.navigateTo({
              url: '../topay/topay?id='+newid,
            })
        })
    }
})