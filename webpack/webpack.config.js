const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: resolve(__dirname, 'src', 'index.js'),
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader',"css-loader"],
			},
			{
				test: /\.less$/,
				use: ['style-loader',"css-loader","less-loader"], // compiles Less to CSS
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
		],
	},
	optimization: {
		splitChunks: { chunks: "all" }
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname,'src','index.html')
		})
	],

	devServer: {
		contentBase: resolve(__dirname, 'dist'),
		compress: true,
		port: 9000
	},
};
