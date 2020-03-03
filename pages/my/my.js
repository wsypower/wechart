// pages/my/my.js
const app = getApp();
import my from "../../http/api/my";

Component({
  /**
   * @description 接受全局样式
   * @author weiyafei
   **/
  options: {
    addGlobalClass: true,
    styleIsolation: "shared"
  },
  properties: {
    userInfo: Object,
    TabBar: Number,
    CustomBar: Number
  },
  /**
   * 组件页面的初始数据
   */
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    active: 1,
    status: 1,
    tablen: 0,
    tabs: [
      { nav: "待确认", status: 1, data: [] },
      { nav: "待评价", status: 2, data: [] },
      { nav: "已完成", status: 5, data: [] }
    ]
  },
  lifetimes: {
    attached() {
      this.getData();
    }
  },
  pageLifetimes: {
    async show() {
      // 页面被展示
      this.getData();
    },
    hide() {
      console.log("页面被隐藏");
    }
  },
  methods: {
    //点击图片
    imageClickHandler(e) {
      const images = e.currentTarget.dataset.img;
      wx.previewImage({
        current: images[0], // 当前显示图片的http链接
        urls: images // 需要预览的图片http链接列表
      });
    },
    onChange(event) {
      console.log(event);
      this.data.tablen = event.detail.index;
      this.data.status = event.detail.name;
      this.getData();
    },
    getData() {
      let personid = wx.getStorageSync("personid");
      let status = this.data.status;
      const _this = this;
      const tabs = this.data.tabs;
      const color = ["green", "blue", "gray"];
      const text = ["预约时间", "参加时间", "取消时间"];
      return my.getOrderInfoByStatus({ status, personid }).then(res => {
        tabs[this.data.tablen].data = res.list.map(item => {
          item["color"] = color[this.data.tablen];
          item["statusText"] = text[this.data.tablen];
          item["images"] = item.path
            ?.split("|")
            .map(v => `${res.fileServer}${v}`);
          return item;
        });
        _this.setData({
          tabs
        });
      });
    },
    clickCardHandler(e) {
      const {
        id,
        addressid,
        images,
        color,
        status,
        ordertime
      } = e.currentTarget.dataset;
      console.log(status);
      console.log(color);
      wx.navigateTo({
        url: "/pages/orderdetail/orderdetail",
        success: result => {
          result.eventChannel.emit("passValue", {
            images,
            addressid,
            id,
            color,
            status,
            ordertime
          });
        }
      });
    }
  }
});
