/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-23 00:45:15
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-24 05:16:51
 */

/**
 * @author:wsy
 * @description:将回调函数变为promise函数
 * @param {Function} func
 * @returns {Function} Promise
 */
const promisic = function(func) {
  return function(params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: res => {
          resolve(res);
        },
        fail: error => {
          reject(error);
        }
      });
      func(args);
    });
  };
};

/**
 * @author:wsy
 * @description:生成唯一的id
 * @param {Number}
 * @returns {String}
 */
const GenNonDuplicateID = randomLength => {
  return Number(
    Math.random()
      .toString()
      .substr(3, randomLength) + Date.now()
  ).toString(36);
};
/**
 * @author:wsy
 * @description:改变数组对象的键
 * @param {Object} 需要管边的键值
 * @param {Object} 数组
 * @returns {Array}
 */
const renameKeys = (keysMap, arr) =>
  arr.length
    ? arr.map(obj => {
        return Object.keys(obj).reduce(
          (acc, key) => ({
            ...acc,
            ...{ [keysMap[key] || key]: obj[key] }
          }),
          {}
        );
      })
    : [];

export { promisic, GenNonDuplicateID, renameKeys };
