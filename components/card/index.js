/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-22 22:53:12
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-23 07:42:15
 */
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ["l-class", "l-img-class", "l-title-class"],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    starlevelAvg: Number,
    orderAllowNumber: Number,
    statusType: String,
    cardId: String,
    image: String,
    imagesList: Array,
    title: String,
    describe: String,
    plaintext: Boolean,
    full: Boolean,
    position: {
      type: String,
      value: "left"
    },
    imageMode: {
      type: String,
      value: "aspectFill"
    },
    type: {
      type: String,
      value: "primary"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @description:点击获取当前页，并展开图片预览
     * @author  Wsy
     */
    itemImageClick(e) {
      wx.previewImage({
        current: this.data.image, // 当前显示图片的http链接
        urls: this.data.imagesList // 需要预览的图片http链接列表
      });
    },
    /**
     * @description:   点击获取数据，跳转入详情页面
     * @author  Wsy
     */
    cardClick() {
      const detailsId = this.data.cardId;
      const images = this.data.imagesList;
      const starlevelAvg = this.data.starlevelAvg;
      const orderAllowNumber = this.data.orderAllowNumber;
      wx.navigateTo({
        url: `/pages/details/details`,
        success: result => {
          result.eventChannel.emit("passValue", {
            detailsId,
            images,
            starlevelAvg,
            orderAllowNumber
          });
        }
      });
    }
  }
});
