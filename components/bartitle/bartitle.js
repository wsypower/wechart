/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-23 11:10:29
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-23 11:36:13
 */
import CONFIG_ADMIN from '../../config/config';
Component({
	options: {
		addGlobalClass: true,
	},
	data: {},
	properties: {
		//显示的数字
		value: {
			type: String,
			value: '这是测试样式',
		},
		//显示的颜色 --灰色 --蓝色 --绿色
		color: {
			type: String,
			value: CONFIG_ADMIN.COLOR[1],
		},
	},
	methods: {},
});
