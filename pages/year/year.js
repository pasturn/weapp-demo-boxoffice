//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    loadingHidden: false,
    networkErrorModal: true,
    failCount: 0,
    topNav: [],
    navActive: 'year',
    tabActive: 'year',
    currentDate: '2016-09-01',
    boxData: {
      sumBoxOffice:'',
      filmsList:[]
    }
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getTopNav(function(topNav){
      //更新数据
      that.setData({
        topNav: topNav
      })
    })
    //调用api数据
    this.getData()
  },
  navSwitch: function(e){
    var that = this
    var navCellId = e.currentTarget.id
    wx.redirectTo({
      url: `../${navCellId}/${navCellId}`
    })
  },
  //弹错误提示
  confirmErrorModal: function(e){
    this.setData({
       networkErrorModal: true
    })
    this.getData()
  },
  
  //加载API数据方法
  getData: function(){
    var that = this
    wx.request({
      url:'http://www.cbooo.cn/boxOffice/GetHourBoxOffice',
      data:{
        d:(new Date()).getTime()
      },
      success: function(res) {
        that.setData({
          boxData:{
            sumBoxOffice: res.data.data1[0].sumBoxOffice,
            filmsList: res.data.data2
          },
          loadingHidden: true,
          failCount:0
        })
      },
      fail: function(err) {
        //超时计数
        if(that.data.failCount < 4){
          that.setData({
            failCount:that.data.failCount+1
          })
          //每隔5秒，尝试重新加载数据
          setTimeout(that.getData,5000)
        }else{
          //大于5次弹出错误提示
          that.setData({
            networkErrorModal: false,
            loadingHidden: true
          })
        }
      }     
    })
  }
})
