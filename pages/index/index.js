/*
 * @Autor: Wsy
 * @Description:首页
 * @Date: 2020-02-21 09:21:04
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-23 20:59:44
 */
//index.js
//获取应用实例
import { list } from "./data";
import getList from "../../http/api/index";
import { renameKeys } from "../../utils/common";
import user_login from "../../http/api/login";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
const app = getApp();
Component({
  options: {
    styleIsolation: "shared"
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    communityOption: [],
    stateOption: [],
    // 列表项
    list: [],
    // 搜索项列表
    searchList: [],
    // 社区-Code
    community: "",
    // 状态-Code
    state: "2",
    // 搜索输入结果
    value: "",
    // 暂无数据
    nodata: false,
    //下拉刷新
    refresher: false,
    overlay: false
  },

  /* -----------------------------  Page 生命周期  --------------------------------- */
  methods: {
    bindGetUserInfo(e) {
      console.log(e.detail.userInfo);
    },
    // ─── SCROLLTOLOWER ─────────────────────────────────────────── START ────────────
    /**
     * @description: 上拉加载
     * @author: Wsy
     */
    scrollToLower(e) {
      console.log("index页面触底了");
    },
    refresherpulling(e) {},
    async refresherrefresh() {
      await this.asyncGetAddressList(false).then(() => {
        setTimeout(() => {
          this.setData({
            refresher: false
          });
          Toast.success("刷新成功");
        }, 1000);
      });
    },
    // ─── SCROLLTOLOWER ───────────────────────────────────────────  END  ────────────

    // ─── SELECT-DROPDOWN ───────────────────────────────────────── START ────────────
    /**
     * @description: 点击之后切换数据
     * @return: null
     * @author: Wsy
     */
    communityChangeHandle({ detail }) {
      this.data.community = detail;
      this.asyncGetAddressList();
    },
    stateChangeHandle({ detail }) {
      this.data.state = detail;
      this.asyncGetAddressList();
    },
    /**
     * @description: 关闭下拉
     * @param {Boolean}
     * @return: null
     * @author: Wsy
     */
    closeDropdown(close = false) {
      this.selectComponent("#community").toggle(close);
      this.selectComponent("#state").toggle(close);
    },
    // ─── SELECT-DROPDOWN ─────────────────────────────────────────  END  ────────────

    // ─── SEARCH ────────────────────────────────────────────────── START ────────────
    /**
     * @description: 搜索事件
     * @author: Wsy
     */
    onSearch({ detail }) {
      this.asyncGetAddressList();
    },
    /**
     * @description: 搜索输入改变
     * @author: Wsy
     */
    onChange({ detail }) {
      this.setData({
        value: detail
      });
    },
    /**
     * @description: 搜索框聚焦
     * @author: Wsy
     */
    onFocus() {
      // 关闭Dropdown下拉
      this.closeDropdown();
    },
    /**
     * @description: 清空搜索框
     * @author: Wsy
     */
    onClear() {
      this.asyncGetAddressList(false);
    },
    /**
     * @description: 取消搜索事件
     * @param {Boolean}
     * @author: Wsy
     */
    onCancel(e) {
      // 关闭Dropdown下拉
      this.closeDropdown();
      this.data.value = "";
      this.asyncGetAddressList(false);
    },
    // ─── SEARCH ──────────────────────────────────────────────────  END  ────────────

    /* ------------------------------------------------------------------------------- */

    /**
     * @description:页面跳转
     * @param {type}
     * @return:
     * @author: Wsy
     */
    clickHandler() {
      wx.navigateTo({
        url: "/pages/details/details",
        success: result => {
          console.log(result);
        },
        fail: error => {
          console.log(error);
        },
        complete: () => {}
      });
    },

    // ─── GETDATA ──────────────────────────────────────────────────  START  ────────────

    /**
     * @description 请求下拉搜索选项
     * @author weiyafei
     * @date 2020-02-25
     */
    asyncGetSelect() {
      return getList.getInitSelect().then(({ areaList, statusList }) => {
        const area = renameKeys({ areaname: "text", id: "value" }, areaList);
        const status = renameKeys({ value: "text", key: "value" }, statusList);
        const states = status[0].value;
        this.setData({
          communityOption: [{ text: "全部社区", value: "" }, ...area],
          stateOption: [...status],
          state: states
        });
      });
    },
    /**
     * @description:   获取初始数据
     * @author  Wsy
     */
    asyncGetAddressList(loading = true) {
      this.setData({
        nodata: false
      });
      if (loading) {
        Toast.loading({
          duration: 0,
          mask: false,
          message: "加载中..."
        });
      }
      return getList
        .getAddressList({
          courtName: this.data.value,
          communityCode: this.data.community,
          publishStatus: this.data.state
        })
        .then(res => {
          const { list, fileServer } = res;
          let noPicture = list.length === 0 ? true : false;
          list.forEach(value => {
            value.image =
              value.filepath?.split("|").map(img => `${fileServer}${img}`) ||
              [];
          });
          this.setData({
            list,
            nodata: noPicture
          });
          if (loading) {
            Toast.clear();
          }
        });
    }
    // ─── GETDATA ──────────────────────────────────────────────────  END    ────────────
  },
  lifetimes: {
    async attached() {
      console.log("刷新index");
      await this.asyncGetSelect();
      await this.asyncGetAddressList();
    }
  },
  pageLifetimes: {
    async show() {
      // 页面被展示
      console.log("页面被展示1");
      this.asyncGetAddressList();
      console.log("页面被展示2");
    },
    hide() {
      console.log("页面被隐藏");
    }
  }
});
