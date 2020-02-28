import { HTTP } from "../http";
import { promisic } from "../../utils/common";
class Details extends HTTP {
  /**
   * @description 获取预约的详细情报
   * @author weiyafei
   * @date 2020-02-24
   * @memberof List
   */
  getAddressInfo({ addressid }) {
    const personid = wx.getStorageSync("personid");
    return this.request({
      url: "getAddressInfo",
      method: "GET",
      data: {
        addressid,
        personid
      }
    });
  }
  getAddressIntervalInfo({ addressid }) {
    return this.request({
      url: "getAddressIntervalInfo",
      method: "GET",
      data: {
        addressid
      }
    });
  }
  saveOrderInfo({ personid, addressid, orderday, timeinterval }) {
    return this.request({
      url: "saveOrderInfo",
      method: "POST",
      data: {
        personid,
        addressid,
        orderday,
        timeinterval
      }
    });
  }
}

const getDetails = new Details();
export default getDetails;
