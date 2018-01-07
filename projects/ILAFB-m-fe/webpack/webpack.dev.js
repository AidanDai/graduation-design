const os = require('os')
const path = require('path')
const webpack = require('webpack')
const def = require('./webpack.def')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const postcssImport = require('postcss-import')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const getHtmlWebpackPluginConfig = (obj = {}) => {
	let env = process.env.NODE_ENV
  let options = {
  	template: path.resolve(__dirname, `../src/template.${env}.html`)
  }
  let config = []
  const keys = Object.keys(obj)

  keys.forEach((key) => {
  	let temp = Object.assign({}, options)

  	temp.filename = path.resolve(__dirname, `../views/${key}.html`)
  	temp.inject = true
  	temp.chunks = ['bundle', key]
  	config.push(
  		new HtmlWebpackPlugin(temp)
  	)
  })

  return config
}

const getHRMEntryConfig = (obj = {}) => {
  const keys = Object.keys(obj)
  let config = Object.assign({}, obj)

  keys.forEach((key) => {
    config[key].unshift(
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://127.0.0.1:${port}`, 
      'webpack/hot/only-dev-server'
    )
  })

  return config
}

const port = 3030
const srcPath = path.resolve(__dirname, '../src')
const buildPath = path.resolve(__dirname, '../assets')
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, '')
]
const HtmlWebpackPluginConfig = getHtmlWebpackPluginConfig(def.entry)
const libPath = path.resolve(__dirname, '../assets/javascripts/library/core.js')
const manifestPath = path.resolve(__dirname, '../assets/javascripts/library/manifest.json')
const viewsPath = path.resolve(__dirname, '../views')
const assetsPath = path.resolve(__dirname, '../')

let config = {
	entry: getHRMEntryConfig(def.entry),
	output: {
		path: buildPath,
		filename: 'javascripts/[name].js',
		publicPath: '/assets/',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				include: [ srcPath ],
				use: [
					"react-hot-loader/webpack",
					'happypack/loader?id=happybabel'
				]
			},
			{
		    test: /\.css$/,
		    use: [
		    	'style-loader', 
		    	'css-loader', 
		    	'postcss-loader'
		    ]
		  },
		  {
		    test: /\.less/,
				include: [ srcPath ],
		    use:[
		    	'style-loader', 
		    	'css-loader', 
		    	'postcss-loader',
		    	'less-loader'
		    ]
		  },
		  {
		    test: /\.(jpe?g|png|gif)$/,
				include: [ srcPath ],
		    use: [
		    	{
		    		loader: 'url-loader',
    				query: {
    					limit: 10000,
		    			name: 'images/[name].[ext]'
		    		}
		    	},
		    	{
		        loader: 'image-webpack-loader',
		        options: {
			        query: {
			          mozjpeg: {
			            progressive: true,
			          },
			          gifsicle: {
			            interlaced: true,
			          },
			          optipng: {
			            optimizationLevel: 7,
			          },
			          pngquant: {
			            quality: '65-90',
			            speed: 4
			          }
			        }
			      }
		      }
		    ]
		  },
		  {
		    test: /\.(woff|woff2|ttf|eot)$/,
				include: [ srcPath ],
		    use: [
		    	{
		    		loader: 'file-loader',
    				query: {
		    			name: 'stylesheets/fonts/[name].[ext]'
		    		}
		    	}
		    ]
		  },
		  {
		    test: /\.(svg)$/i,
		    include: svgDirs,
		    use:[
		    	'svg-sprite-loader'
		    ]
		  },
		]
	},
	plugins: [
		// new webpack.DllReferencePlugin({
  //     context: path.resolve(__dirname, '../'),
  //     scope: require(libPath),
  //     manifest: require(manifestPath)
  //   }),
  	new HappyPack({
      id: 'happybabel',
      loaders: [ 'babel-loader' ],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
		new CleanWebpackPlugin(
    	[ path.resolve(__dirname, '../assets/*'), path.resolve(__dirname, '../views/*') ], 
    	{
	      root: path.resolve(__dirname, '../assets/javascripts'),
	      verbose: false,
				exclude: ['./library/*']
	    }
    ),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function (webpack) {
          return [
          	postcssImport({
              addDependencyTo: webpack
            }),
          	autoprefixer,
          	px2rem({remUnit: 75})
          ];
        }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
    	minChunks: Infinity,
      name: 'bundle'
    }),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize:1000}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  //   new AddAssetHtmlPlugin(
		// 	{ 
		// 		filepath: path.resolve(__dirname, 
		// 		'../assets/javascripts/library/core.js') 
		// 	}
		// ),
    ...HtmlWebpackPluginConfig
	],
	context: path.resolve(__dirname, '../'),
  stats: 'errors-only',
  devtool: 'source-map',

  cache: true,
  watch: true,
  devServer: {
  	contentBase: [ viewsPath, assetsPath],
  	publicPath: '/assets/',
	  historyApiFallback: true,
	  port: port,
	  compress: false,
	  inline: true,
	  // hot: true,
	  host: '0.0.0.0',
	  stats: {
	    assets: true,
      assetsSort: "size",
      cached: true,
      cachedAssets: true,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      depth: false,
      entrypoints: false,
      errors: true,
      errorDetails: true,
      hash: true,
      modules: false,
      performance: true,
      providedExports: false,
      publicPath: true,
      reasons: false,
      source: false,
      timings: true,
      usedExports: false,
      version: true,
      warnings: true
	  },
	  proxy: {
	    '/api': {
	      target: 'http://127.0.0.1:3000',
	      changeOrigin: true
	    }
	  }
  }
}

module.exports = Object.assign({}, def, config)