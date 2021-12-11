// pages/reportingOrders/index.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",
    text:'',
    option1: [
      { text: '垃圾种类有误', value: 0 },
      { text: '统计重量有误', value: 1 },
      { text: '危险垃圾申报', value: 2 },
    ],
    value1:0,
    fileList:[],
    listlength:0,
    title:"请选择申报问题"
  },
  /**
   * 申报的问题改变的处理函数
   * @param {*} event 选择的问题类型
   */
  onChange:function(event){
    console.log(event.detail)
    this.setData({title:this.data.option1[event.detail].text})
  },

  afterRead:function(event) {
    // const { file } = event.detail;
    // // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
    const { file }=event.detail;
    console.log(file)
    var list=this.data.fileList
    var id=this.data.listlength
    file.forEach(element => {
      list.push({
        name:id,
        url:element.url,
        type:"image",
        thumb:element.thumb,
        isImage: true,
        deletable:true
      })
      id=id+1;
    });
    console.log(list)
    this.setData({fileList:list,listlength:id})
  },
  onSubmit(){
    if(this.text!=''){
      Dialog.confirm({
        message: '确定完成订单吗',
      }).then(() =>{
      wx.showToast({
        title: '申报成功！',  // 标题
        icon: 'success',   // 图标类型，默认success
        duration: 1500 ,  // 提示窗停留时间，默认1500ms
      })
      setTimeout(function () {
        wx.navigateBack({//返回
          delta: 0
        })
      }, 1500);
    })
  }else{

  }
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})