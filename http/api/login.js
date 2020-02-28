import { HTTP } from "../http";
import { promisic } from "../../utils/common";
class Login extends HTTP {
  openid = null;
  _setStor(key, velue) {
    wx.setStorage({
      key: key,
      data: velue
    });
  }
  _getStor(key) {
    const value = wx.getStorageSync(key);
    return value;
  }
  /**
   * @description 登录
   * @author weiyafei
   * @date 2020-02-24
   * @memberof Login
   */
  login() {
    this._checkSession()
      .then(() => this._reReg())
      .then(({ code }) => this._getOpenId(code))
      .then(({ personid, openid }) => {
        this.openid = openid;
        this._setStor("openid", openid);
        this._setStor("personid", personid);
      })
      .catch(err => console.error(err));
  }
  /**
   * @description 发送 res.code 到后台换取 openId, sessionKey, unionId
   * @author weiyafei
   * @date 2020-02-24
   * @memberof Login
   */
  _reReg() {
    // promise化
    return promisic(wx.login)();
  }
  /**
   * @description 检测 session_key是否已经过期
   * @author weiyafei
   * @date 2020-02-24
   * @memberof Login
   */
  _checkSession() {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success() {
          //session_key 未过期，并且在本生命周期一直有效
          const openid = _this._getStor("openid");
          // 如果清理过缓存找不到personid，就在去直接登录一遍
          if (!openid) {
            _this
              ._reReg()
              .then(({ code }) => _this._getOpenId(code))
              .then(({ personid, openid }) => {
                _this.openid = openid;
                _this._setStor("openid", openid);
                _this._setStor("personid", personid);
              });
          }
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          resolve();
        }
      });
    });
  }
  /**
   * @description 零时code换取 用户标识符 openId
   * @param {String} code
   * @author weiyafei
   * @date 2020-02-24
   * @memberof Login
   */
  _getOpenId(code) {
    return this.request({
      url: "homepage",
      data: {
        code
      }
    });
  }
  addUserInfo({ personname, headimagepath }) {
    const openid = this._getStor("openid");
    return this.request({
      url: "addUserInfo",
      data: {
        openid: openid,
        personname: personname,
        headimagepath: headimagepath
      }
    });
  }
}
const user_login = new Login();

export default user_login;
