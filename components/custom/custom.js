/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-21 09:21:04
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-23 14:02:14
 */
const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ""
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ""
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      let pages = getCurrentPages();
      console.log(pages);
      const curntPage = pages[pages.length - 1].route;
      const previousPage = pages[pages.length - 2].route;
      if (curntPage == previousPage) {
        wx.navigateBack({
          delta: 2
        });
        return;
      }
      wx.navigateBack({
        delta: 1
      });
    },

    toHome() {
      wx.reLaunch({
        url: "/pages/home/home"
      });
    }
  }
});
