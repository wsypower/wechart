/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-21 11:11:25
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-21 11:21:27
 */
// components/search/search.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},

	/**
	 * 组件的初始数据
	 */
	data: {
		value: '',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onSearch(e) {
      console.log(e);
      console.log(this.data.value);
      console.log('123');
		},
		onCancel(e) {
			console.log(e);
		},
	},
});
