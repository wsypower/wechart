/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-21 11:11:25
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-22 21:53:08
 */
// components/search/search.js
Component({
	options: {
		styleIsolation: 'shared',
	},
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
			this.triggerEvent('onSearch', e, {})
		},
		onCancel(e) {
			this.triggerEvent('onCancel', e, {})
		},
		focus(e){
			this.triggerEvent('onFocus', {}, {})
		},
		clear(){
			this.triggerEvent('onClear', {}, {})
		}
	},
});
