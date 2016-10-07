//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getTopNav:function(cb){
    var that = this
    if(this.globalData.topNav){
      typeof cb == "function" && cb(this.globalData.topNav)
    }
  },
  globalData:{
    topNav:[
      {title:'实时', name:'living'},
      {title:'单日', name:'oneday'},
      {title:'单周', name:'oneweek'},
      {title:'单月', name:'onemonth'},
      {title:'年度', name:'year'},
      {title:'影院', name:'cinema'}],
    userInfo:null
  }
})