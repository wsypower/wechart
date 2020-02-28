import user_login from "./login";
const getUser = res => {
  console.log("进入这个对比了》》》》》》》》》》》》》》》》》》");
  const userInfoStorage = wx.getStorageSync("userInfo");

  const userInfoVariety =
    userInfoStorage == ""
      ? false
      : Object.keys(userInfoStorage).every(
          key => userInfoStorage[key] === res.userInfo[key]
        );
  if (!userInfoVariety) {
    user_login
      .addUserInfo({
        personname: res.userInfo.nickName,
        headimagepath: res.userInfo.avatarUrl
      })
      .then(({ personid }) => {
        wx.setStorageSync("personid", personid);
        wx.setStorageSync("userInfo", res.userInfo);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
export default getUser;
