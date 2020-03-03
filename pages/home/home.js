/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-22 06:25:56
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-23 21:20:34
 */

const app = getApp();
import getUser from "../../http/api/getuser";
import user_login from "../../http/api/login";
Page({
  onShareAppMessage() {
    return {
      title: "活动用房预约",
      imageUrl: "/images/share.jpg",
      path: "/pages/home/home"
    };
  },
  data: {
    PageCur: "index",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabBar: null,
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    overlay: false,
    userInfo: {},
    personid: app.globalData.personid
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    const { nickName, avatarUrl } = e.detail.userInfo;
    wx.setStorageSync("userInfo", e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      overlay: false
    });
    user_login
      .addUserInfo({ personname: nickName, headimagepath: avatarUrl })
      .then(({ personid }) => {
        this.setData({
          personid
        });
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
  navChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur,
      personid: app.globalData.personid
    });
  },
  /**
   * @description: 获取底部操作栏高度
   * @author: Wsy
   */
  getRect() {
    const TabBar = wx.createSelectorQuery().select("#tab-bar");
    TabBar.boundingClientRect(({ height }) => {
      // 赋值给全局标量
      app.globalData.TabBar = height;
      console.log("TCL: getRect -> height", height);
      // 映射给wxml
      this.setData({
        TabBar: height
      });
    }).exec();
  },

  onLoad: function() {
    // 获取底部操作栏高度
    this.getRect();
    console.log("进入页面");
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo;
        getUser(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          getUser(res);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  onReady: function() {
    console.log(this.data.personid);
    wx.getSetting({
      success: res => {
        res.authSetting["scope.userInfo"]
          ? this.setData({
              overlay: false,
              personid: wx.getStorageSync("personid")
            })
          : this.setData({
              overlay: true,
              personid: wx.getStorageSync("personid")
            });
      }
    });
  }
});
