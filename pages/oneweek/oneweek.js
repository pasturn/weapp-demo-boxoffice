//oneday.js
var app = getApp()
Page({
  data: {
    loadingHidden: false,
    networkErrorModal: true,
    failCount: 0,
    topNav: [],
    navActive: 'oneweek',
    tabActive: 'oneweek',
    currentDate: '很久很久以前',
    boxData: {
      sumBoxOffice:'',
      filmsList:[]
    },
    statisticsData:{
      CinemaCount:'',
      BoxOffice:'',
      ShowCount:'',
      AudienceCount:''
    }
  },
  onLoad: function (option) {
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
  confirmErrorModal: function(e){
    this.setData({
       networkErrorModal: true
    })
    this.getData()
  },
  getData: function(){
    var that = this
    wx.request({
      url:'http://www.cbooo.cn/boxOffice/getWeekInfoData',
      data:{
        sdate:'2016-09-26'
      },
      success: function(res) {
        
        that.setData({
          boxData:{
            filmsList: res.data.data1
          },
          statisticsData:{
            BoxOffice:res.data.data2[0].BoxOffice,
            ShowCount:res.data.data2[0].ShoCount,
            AudienceCount:res.data.data2[0].AudienceCount
          },
          currentDate: res.data.data2[0].sDate,
          loadingHidden: true
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
  },
  navSwitch: function(e){
    var that = this
    var navCellId = e.currentTarget.id
    wx.redirectTo({
      url: `../${navCellId}/${navCellId}`
    })
  }
})
