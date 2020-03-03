/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-23 13:49:57
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-24 06:25:55
 */
import { Datalist } from "./data";
import getDetails from "../../http/api/details";
import { GenNonDuplicateID } from "../../utils/common";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
const app = getApp();
Page({
  data: {
    detailsId: null,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    MainTolower: false,
    scrollTop: null,
    radio: "",
    addressid: "",
    interval: "",
    parentid: "",
    week: "",
    dayValue: "",
    orderallowcount: ""
  },
  /**
   * @description 根据flag结果修改返回字符
   * @author weiyafei
   * @date 2020-02-28
   */
  /**
   * 提交预约
   */
  applyClickHandler() {
    const interval = this.data.interval;
    if (interval == "") {
      Toast("请选择预约时间再提交预约！");
      return;
    }
    const personid = wx.getStorageSync("personid");
    getDetails
      .saveOrderInfo({
        personid: personid,
        addressid: this.data.addressid,
        orderday: this.data.dayvalue,
        timeinterval: this.data.interval
      })
      .then(res => {
        console.log(res);
        wx.lin.showToast({
          title: "预约成功",
          icon: "success"
        });
        setTimeout(() => {
          wx.redirectTo({
            url: "/pages/home/home"
          });
        }, 500);
      })
      .catch(err => {
        wx.lin.showToast({
          title: "预约失败",
          icon: "error"
        });
      });
  },
  /**
   * @description 点击选择时间段落
   * @author weiyafei
   * @date 2020-02-26
   * @param {*} event
   * @returns
   */
  cellOnclickHandler(event) {
    const {
      name,
      disabled,
      interval,
      parentid,
      week,
      dayvalue,
      orderallowcount
    } = event.currentTarget.dataset;
    if (disabled) {
      return;
    }
    if (name == this.data.radio) {
      this.setData({
        radio: "",
        interval: "",
        week: "",
        dayvalue: "",
        orderallowcount: ""
      });
      return;
    }
    this.setData({
      radio: name,
      interval,
      parentid,
      TabCur: parentid,
      week,
      dayvalue,
      orderallowcount
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
   * @description 给元素所有数组对象元素添加唯一key
   * @author weiyafei
   * @param {Array} arr
   * @returns {Array}
   */
  addKeysLoop(arr) {
    return arr.map(item => {
      item["id"] = GenNonDuplicateID(13);
      Object.keys(item).map(k => {
        while (Array.isArray(item[k])) {
          return this.addKeysLoop(item[k]);
        }
      });
      return item;
    });
  },
  async onLoad() {
    Toast.loading({
      duration: 0,
      mask: false,
      message: "加载中..."
    });
    const { addressid } = await this.PageEventEmitChannel("getAddressid");
    const { list } = await getDetails.getAddressIntervalInfo({ addressid });
    const newList = this.addKeysLoop(list);
    console.log(newList);
    this.setData({
      addressid: addressid,
      list: newList,
      listCur: newList[0],
      TabCur: newList[0].id
    });
  },
  onReady() {
    Toast.clear();
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    });
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view
          .fields(
            {
              size: true
            },
            data => {
              console.log("TCL: VerticalMain -> data", data);
              list[i].top = tabHeight;
              tabHeight = tabHeight + data.height;
              list[i].bottom = tabHeight;
              list[i]["height"] = data.height;
            }
          )
          .exec();
      }
      that.setData({
        load: false,
        list: list
      });
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        let CrossScroll = list[i].height;
        for (let j = i + 1; j < list.length; j++) {
          CrossScroll = CrossScroll + list[j].height;
        }
        if (e.detail.scrollHeight - e.detail.scrollTop < CrossScroll) {
          return;
        }
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        });
        return false;
      }
    }
  }
});
