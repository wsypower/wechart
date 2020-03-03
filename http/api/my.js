import { HTTP } from "../http";

class My extends HTTP {
  //personid 的默认值
  personid = wx.getStorageSync("personid");
  getOrderInfoByStatus({ status = 1, personid = this.personid } = {}) {
    return this.request({
      url: "getOrderInfoByStatus",
      method: "GET",
      data: {
        personid,
        status
      }
    });
  }
}
const my = new My();
export default my;
