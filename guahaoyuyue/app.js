// app.js
App({
 onLaunch(){
 
  wx.cloud.init({
    env:'cloud1-8gdhjngm2fc7bba0'
  })
  
 },
    globalData:{
        booktype:["骨科","精神科","神经科"],
        workplace:[]
    }
})
