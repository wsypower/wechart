import CONFIG from "../config/config";

const { BASIC_URL } = CONFIG;

const tips = {
  1: "抱歉，出现了一个错误",
  3000: "期刊不存在"
};

class HTTP {
  request({ url, data = {}, method = "POST" }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
  }
  _request(url, resolve, reject, data = {}, method = "POST") {
    wx.request({
      url: `${BASIC_URL}${url}`,
      method: method,
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: res => {
        const result = res.data.result.result;
        result == "sucess" ? resolve(res.data.result) : reject(res.data.result);
      },
      fail: err => {
        reject(err);
        this._show_error(err.data.code);
      }
    });
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code];
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: "none",
      duration: 2000
    });
  }
}
export { HTTP };
