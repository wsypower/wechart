/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-22 04:22:04
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-23 14:05:48
 */
import getDetails from "../../http/api/details";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailsId: null,
    images: null,
    status: null,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    value: 4.5,
    detailInfo: null,
    list: null
  },
  applyClickHandler() {
    const status = this.data.detailInfo.status;
    console.log(status);
    const title = status == 4 ? "已结束" : "已下线";
    const icon = status == 4 ? "time" : "warning";
    if (status == 2) {
      const addressid = this.data.detailsId;
      wx.navigateTo({
        url: `/pages/appointment/appointment`,
        success: result => {
          result.eventChannel.emit("getAddressid", {
            addressid
          });
        }
      });
    } else {
      wx.lin.showToast({
        title: title,
        icon: icon
      });
    }
  },
  imageCLick(e) {
    console.log(e);
    wx.previewImage({
      current: this.data.images[0], // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    });
  },
  getDetails() {
    const addressid = this.data.detailsId;
    const personid = wx.getStorageSync("personid");
    return getDetails
      .getAddressInfo({ addressid })
      .then(({ detailInfo, list }) => {
        console.log(detailInfo);
        console.log(list);
        this.setData({
          detailInfo,
          list
        });
      });
  },
  /**
   * @description eventChannel传值为异步，变为async
   * @author weiyafei
   * @date 2020-02-26
   * @param {String} emit名称
   * @returns
   */
  PageEventEmitChannel(emit) {
    return new Promise((resolve, reject) => {
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on(emit, res => {
        resolve(res);
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    Toast.loading({
      duration: 0,
      mask: false,
      message: "加载中..."
    });
    const { detailsId, images } = await this.PageEventEmitChannel("passValue");
    this.setData({
      detailsId,
      images
    });
    await this.getDetails();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    Toast.clear();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});

/* 


*/
