const app = getApp();
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
import getDetails from "../../http/api/details";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
Page({
  onShareAppMessage() {
    return {
      title: "活动用房预约",
      imageUrl: "/images/share.jpg",
      path: "/pages/home/home"
    };
  },
  data: {
    CustomBar: app.globalData.CustomBar,
    images: null,
    addressid: null,
    id: null,
    color: null,
    status: null,
    detailInfo: null,
    ordertime: null,
    value: null,
    evaluation: ""
  },
  //点击图片
  imageClickHandler(e) {
    wx.previewImage({
      current: this.data.images[0], // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    });
  },
  // 评论
  evaluationOnChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      evaluation: event.detail
    });
  },
  // 星级选择
  onChange(event) {
    this.setData({
      value: event.detail
    });
  },
  //点击评价提交
  evaluationBtnHandler() {
    const starlevel = this.data.value;
    const advice = this.data.evaluation;
    if (starlevel == null || advice == "") {
      wx.lin.showToast({
        title: "请输入评价",
        icon: "error",
        placement: "right"
      });
      return;
    }
    Toast.loading({
      duration: 0,
      mask: false,
      message: "加载中..."
    });
    const orderid = this.data.id;
    getDetails
      .updateEvaluateInfo({ orderid, starlevel, advice })
      .then(res => {
        Toast.clear();
        console.log(res);
        wx.lin.showToast({
          title: "感谢评价",
          icon: "success"
        });
        setTimeout(() => {
          wx.lin.showToast({
            title: "参加成功",
            icon: "success"
          });
          let pages = getCurrentPages();
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
        }, 500);
      })
      .catch(err => {
        console.log(err);
        Toast.clear();
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
  getDetails(orderid) {
    return getDetails.getOrderDetailInfo(orderid).then(({ detailInfo }) => {
      return detailInfo;
    });
  },
  setStatus(status) {
    const orderid = this.data.id;
    const personid = app.globalData.personid;
    return getDetails
      .updateOrderStatus({ orderid, personid, status: status })
      .then(res => {
        console.log(res);
        return res;
      });
  },
  //流转到填写详情页面
  processFlow() {
    const { images, addressid, id, ordertime } = this.data;
    const color = "blue";
    const status = 2;
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
  },
  buttonCallback() {
    this.setStatus(2)
      .then(res => {
        this.processFlow();
      })
      .catch(err => {
        console.error(err);
        wx.lin.showToast({
          title: "未到预约时间",
          icon: "error"
        });
      });
  },
  cancelCallback() {
    Dialog.confirm({
      title: "是否取消预约？",
      message: "需重新预约人数未满的时间段",
      asyncClose: true
    })
      .then(() => {
        this.setStatus(3).then(res => {
          wx.lin.showToast({
            title: "取消成功",
            icon: "success"
          });
          setTimeout(() => {
            Dialog.close();
            wx.navigateBack({
              delta: 1
            });
          }, 500);
        });
      })
      .catch(() => {
        Dialog.close();
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
    const {
      images,
      addressid,
      id,
      color,
      status,
      ordertime
    } = await this.PageEventEmitChannel("passValue");
    this.setData({
      images,
      addressid,
      id,
      color,
      status,
      ordertime
    });
    const detailInfo = await this.getDetails(this.data.id);
    this.setData({
      detailInfo
    });
    Toast.clear();
  }
});
