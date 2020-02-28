/*
 * @Autor: Wsy
 * @Description:
 * @Date: 2020-02-23 22:31:50
 * @LastEditors: Wsy
 * @LastEditTime: 2020-02-24 05:51:44
 */
import { GenNonDuplicateID } from '../../utils/common';

const Datalist = [
	{
		week: '周一',
		day: '2月2日',
		id: '123',
		timerList: [
			{ id: '21233215155522331', timer: '18:00 ~ 19:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '21233215155522332', timer: '18:00 ~ 19:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
			{ id: '21233215155522334', timer: '18:00 ~ 19:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '21233215155522335', timer: '18:00 ~ 19:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
	{
		week: '周二',
		day: '2月3日',
		id: '1123',
		timerList: [
			{ id: '212332151555223317781', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{
				id: '212332151555223317782',
				timer: '8:00 ~ 9:00',
				key: GenNonDuplicateID(10),
				people: '100',
				isOk: true,
			},
			{ id: '212332151555223317783', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{
				id: '212332151555223317784',
				timer: '8:00 ~ 9:00',
				key: GenNonDuplicateID(10),
				people: '100',
				isOk: true,
			},
		],
	},
	{
		week: '周三',
		day: '2月3日',
		id: '121144',
		timerList: [
			{ id: '223310098', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '21251555223310094', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
	{
		week: '周四',
		day: '2月4日',
		id: '1111111555',
		timerList: [
			{ id: '212515552233100947644', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{
				id: '21251555223310094125556',
				timer: '8:00 ~ 9:00',
				key: GenNonDuplicateID(10),
				people: '0',
				isOk: false,
			},
			{ id: '21251555223310094', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
	{
		week: '周五',
		day: '2月5日',
		id: '1114433',
		timerList: [
			{ id: '21233215155578', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '21233215155589', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
			{ id: '212332151555788', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '21233215155566', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
	{
		week: '周一',
		day: '2月2日',
		id: '1238798844',
		timerList: [
			{ id: '4555', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '4556', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
			{ id: '446677', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '45622222', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
	{
		week: '周二',
		day: '2月3日',
		id: '2168888',
		timerList: [
			{ id: '123123123121212', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '12312312312001', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
			{ id: '12312312312002', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '12312312312003', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
	{
		week: '周三',
		day: '2月3日',
		id: '9876444',
		timerList: [
			{ id: '11115', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '11116', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
			{ id: '11117', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '11118', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
	{
		week: '周四',
		day: '2月4日',
		id: '7590000',
		timerList: [
			{ id: '112', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '113', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
			{ id: '114', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '115', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
	{
		week: '周五',
		day: '2月5日',
		id: '0643333',
		timerList: [
			{ id: '12', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '13', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
			{ id: '14', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '0', isOk: false },
			{ id: '15', timer: '8:00 ~ 9:00', key: GenNonDuplicateID(10), people: '100', isOk: true },
		],
	},
];
export { Datalist };
