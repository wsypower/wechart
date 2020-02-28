import { HTTP } from "../http";
import { promisic } from "../../utils/common";

class List extends HTTP {
  /**
   * @description 获取预约点列表页面的条件部初始化数据
   * @author weiyafei
   * @date 2020-02-24
   * @memberof List
   */
  getInitSelect(placecode = "") {
    return this.request({
      url: "getInitData",
      method: "GET",
      data: {
        placecode
      }
    });
  }
  /**
   * @description 单独一个区域社区列表
   * @author weiyafei
   * @date 2020-02-24
   * @memberof List
   */
  getCommunityList() {
    return this.request({
      url: "getCommunityList",
      method: "GET",
      data: {
        placecode
      }
    });
  }
  /**
   * @description 根据小区名称、所属社区、活动状态获取预约点列表
   * @author weiyafei
   * @date 2020-02-24
   * @memberof List
   */
  getAddressList({
    courtName = "",
    communityCode = "",
    publishStatus = ""
  } = {}) {
    return this.request({
      url: "getAddressList",
      method: "GET",
      data: {
        courtName,
        communityCode,
        publishStatus
      }
    });
  }
}
const getList = new List();
export default getList;
