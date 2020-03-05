/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-22 04:22:04
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-23 14:05:48
 */
import getDetails from "../../http/api/details";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
import user_login from "../../http/api/login";
const app = getApp();
Page({
  onShareAppMessage() {
    return {
      title: "活动用房预约",
      imageUrl: "/images/share.jpg",
      path: "/pages/home/home"
    };
  },
  /**
   * 页面的初始数据
   */
  data: {
    overlay: false,
    detailsId: null,
    images: null,
    status: null,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    value: 4.5,
    detailInfo: null,
    list: null,
    starlevelAvg: null,
    orderAllowNumber: null,
    orderedtime: null
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
    return getDetails
      .getAddressInfo({ addressid })
      .then(({ detailInfo, list, orderedtime }) => {
        console.log(detailInfo);
        console.log(list);
        orderedtime = orderedtime ? orderedtime : false;
        console.log("orderedtime", orderedtime);

        this.setData({
          detailInfo,
          list,
          orderedtime
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
  // 获取用户信息
  getUserInfo(e) {
    if (!e.detail.userInfo) {
      return;
    }
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.overlay = false;
    const { nickName, avatarUrl } = e.detail.userInfo;
    wx.setStorageSync("userInfo", e.detail.userInfo);
    this.setData({
      overlay: false
    });
    user_login
      .addUserInfo({ personname: nickName, headimagepath: avatarUrl })
      .then(({ personid }) => {
        wx.setStorage({
          key: "personid",
          data: personid
        });
        app.globalData.personid = personid;
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    this.setData({
      overlay: app.globalData.overlay
    });
    Toast.loading({
      duration: 0,
      mask: false,
      message: "加载中..."
    });
    const {
      detailsId,
      images,
      starlevelAvg,
      orderAllowNumber
    } = await this.PageEventEmitChannel("passValue");
    this.setData({
      detailsId,
      images,
      starlevelAvg,
      orderAllowNumber
    });
    await this.getDetails();
    Toast.clear();
  }
});

/* 


*/
