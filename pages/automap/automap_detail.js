// pages/automap/automap.js
var amapFile = require('../../static/amap-wx.130.js');

Page({
  data: {
    longtitude:'',
    latitude:'',
    steps: {}
  },
  onLoad: function(options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: 'f1c086a1184898191bae6b8fecaa3bf3'});
    that.setData({longtitude:options.longtitude,latitude:options.latitude});
    myAmapFun.getDrivingRoute({
      origin: this.data.longtitude+','+this.data.latitude,
      destination: '113.434446,22.805413',
      success: function(data){
        if(data.paths && data.paths[0] && data.paths[0].steps){
          that.setData({
            steps: data.paths[0].steps
          });
        }
          
      },
      fail: function(info){

      }
    })
  }
})