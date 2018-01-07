const config = {
	menus: {
		data: [
			{label: 'Home', value: '/'},
			{label: 'About', value: '/about'}
		],
		value: ['/']
	},
	goodsCategory: {
		data: [
			{label: '卡片类', value: '/goods?category='},
			{label: '金属类', value: '/goodses/2'},
			{label: '文具类', value: '/goodses/3'},
			{label: '书籍类', value: '/goodses/4'}
		],
		value: ['/goodses/1']
	},
	apis: {
		version: '1.0',
		perfix: '/apis'
	}
}

export default config