const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");

module.exports = {
	context: __dirname,
	entry:{
		"plugin/runinsidedest": "./plugin/runinsidedest.jsx",
		"plugin/runinsidesrc": "./plugin/runinsidesrc.jsx",
		"plugin/popup/connect":"./plugin/popup/connect.jsx"
	},
	output: {
		path: __dirname,
		filename: "[name].js"
	},
	module: {
		loaders: [
			{
				loader: "babel-loader",
				test: /.jsx?$/,
				include: [__dirname],
				query: {
					//presets: ["es2015", "react"]
				}
			}
		]
	},
	watch: NODE_ENV == "development",
	watchOptions: {
		aggregateTimeout: 300
	}
}
