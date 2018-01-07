const path = require('path')
const webpack = require('webpack')

const srcPath = path.resolve(__dirname, '../src')
const mapPath = path.resolve(__dirname, './')

const getPath = (str = '') => {
	return path.resolve(__dirname, `../src/pages/${str}`)
}

module.exports = {
	entry: {
		'goods-list': [ getPath('goods/list') ],
		'goods-detials': [ getPath('goods/detials') ],
		'goods-category': [ getPath('goods/category') ],

		'user-list': [ getPath('user/list') ],

		'lostBox-list': [ getPath('lostBox/list') ],

		'about-us': [ getPath('about/us') ],

		'error-404': [ getPath('error/404') ]
	},
	resolve: {
	  modules: [
	  	'node_modules',
	   	path.resolve(__dirname, '../node_modules')
	  ],
	  extensions: ['.js', '.json'],
	}
}