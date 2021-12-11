// pages/automap/automap_Riding.js
var amapFile = require('../../static/amap-wx.130.js');
Page({
  data: {
    markers:[],
    longitude:'',
    latitude:'',
    distance: '',
    polyline: [],
    gaodeAddress:''//定位地址
  },
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: 'f1c086a1184898191bae6b8fecaa3bf3'});
    myAmapFun.getRegeo({
      success:function(res){
          that.setData({longitude:res[0].longitude,latitude:res[0].latitude,gaodeAddress:res[0].regeocodeData.formatted_address});
          that.setData({markers:[{
            iconPath: "../../static/user.png",
            id: 0,
            latitude: res[0].latitude,
            longitude: res[0].longitude,
            width: 23,
            height: 33
          }]})
      },
      fail:function(info){
        console.log('nimesila')
      }
    })
    myAmapFun.getDrivingRoute({
      origin: '113.293197,22.805413',
      destination: '113.434446,22.805413',
      success: function(data){
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
          var poLen = steps[i].polyline.split(';');
          for(var j = 0;j < poLen.length; j++){
            points.push({
              longitude: parseFloat(poLen[j].split(',')[0]),
              latitude: parseFloat(poLen[j].split(',')[1])
            })
          } 
        }
      }
      that.setData({
        polyline: [{
          points: points,
          color: "#0091ff",
          width: 6
        }]
      });
      if(data.paths[0] && data.paths[0].distance){
        that.setData({
          distance: data.paths[0].distance + '米'
        });
      }
    },       
    fail: function(info){
      console.log('sosad')
    }
  })
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../automap/automap_detail?longtitude='+this.data.longitude+'&latitude='+this.data.latitude
    })
  },
  reLocate:function(){
    var that=this;
    var myAmapFun = new amapFile.AMapWX({key: 'f1c086a1184898191bae6b8fecaa3bf3'});
    myAmapFun.getRegeo({
      success:function(res){
          that.setData({longtitude:res[0].longitude,latitude:res[0].latitude,gaodeAddress:res[0].regeocodeData.formatted_address});
          console.log(res[0].regeocodeData.formatted_address)
      },
      fail: function(info){
        console.log('sosad')
      }
    })
  }
})
