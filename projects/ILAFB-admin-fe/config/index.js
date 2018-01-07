const config = {
	menus: {
		data: [
			{
				label: '失物', 
				value: '/admin/goods',
				children: [
					{label: '失物管理', value: '/admin/goods'},
					{label: '分类管理', value: '/admin/goods-category'}
				]
			},
			{
				label: '用户', 
				value: '/admin/users',
				children: [
					{label: '用户管理', value: '/admin/users'},
					// {label: '角色管理', value: '/users/role'}
				]
			},
			{
				label: '失物箱', 
				value: '/admin/lost-box',
				children: [
					{label: '失物箱管理', value: '/admin/lost-box'}
				]
			},
			{
				label: '关于', 
				value: '/admin/about',
				children: [
					{label: '关于我们', value: '/admin/about'}
				]
			}
		]
	},
	apis: {
		version: '1.0',
		perfix: '/apis'
	}
}

export default config