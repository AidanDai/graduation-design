const os = require('os')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const def = require('./webpack.def')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const postcssImport = require('postcss-import')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AssetsWebpackPlugin = require('assets-webpack-plugin')

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

const srcPath = path.resolve(__dirname, '../src')
const buildPath = path.resolve(__dirname, '../assets')
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, '')
]
const HtmlWebpackPluginConfig = getHtmlWebpackPluginConfig(def.entry)
const extractCSS = new ExtractTextPlugin({
  allChunks: true,
  filename:'stylesheets/[name].bundle.[hash:8].css'
})
const extractLESS = new ExtractTextPlugin({
  allChunks: true,
  filename:'stylesheets/[name].bundle.[hash:8].css'
})

let config = {
	output: {
		path: buildPath,
		filename: 'javascripts/[name].[hash:8].js',
		publicPath: '/assets/',
		libraryTarget: 'umd'
	},
	externals: {
    react: {
      amd: 'react',
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      amd: 'react-dom',
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    'moment': {
      amd: 'moment',
      root: 'moment',
      commonjs: 'moment',
      commonjs2: 'moment'
    },
    'antd-mobile': {
      amd: 'antd-mobile',
      root: 'antd-mobile',
      commonjs: 'antd-mobile',
      commonjs2: 'antd-mobile'
    }
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
		    use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
		  },
		  {
		    test: /\.less/,
				include: [ srcPath ],
		    use: extractLESS.extract([ 'css-loader', 'postcss-loader', 'less-loader' ])
		  },
		  {
		    test: /\.(jpe?g|png|gif|woff|woff2|ttf|eot|svg)$/,
				include: [ srcPath ],
		    use: [
		    	{
		    		loader: 'file-loader',
    				query: {
		    			name: 'images/[name].[hash:8].[ext]'
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
		    test: /\.(svg)$/i,
		    include: svgDirs,
		    use:[
		    	'svg-sprite-loader'
		    ]
		  },
		]
	},
	plugins: [
		new HappyPack({
      id: 'happybabel',
      loaders: [ 'babel-loader' ],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new CleanWebpackPlugin(
    	[ path.resolve(__dirname, '../assets/*'),  path.resolve(__dirname, '../views/*')]
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
      name:'bundle'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize:1000}),
    new AssetsWebpackPlugin({
      prettyPrint: true,
      includeManifest: 'manifest',
      filename: 'assets.json',
      path: path.join(__dirname, '../')
    }),
    extractCSS,
    extractLESS,
    ...HtmlWebpackPluginConfig
  ],
	context: path.join(__dirname, '../'),
  devtool: false,
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
  }
}

module.exports = Object.assign({}, def, config)