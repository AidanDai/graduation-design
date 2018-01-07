const path = require('path')
const webpack = require('webpack')

const srcPath = path.resolve(__dirname, '../src')
const buildPath = path.resolve(__dirname, '../build')
const mapPath = path.resolve(__dirname, './')

const getPath = (str = '') => {
	return path.resolve(__dirname, `../src/pages/${str}`)
}

module.exports = {
	entry: {
		'm-home': [ getPath('home/home') ],
		'm-goods-list': [ getPath('goods/list') ],
		'm-goods-claim': [ getPath('goods/claim') ],

		'm-error-404': [ getPath('error/404') ]
	},
	resolve: {
	  modules: [
	  	'node_modules',
	   	path.resolve(__dirname, '../node_modules')
	  ],
	  extensions: ['.web.js', '.js', '.json'],
	}
}