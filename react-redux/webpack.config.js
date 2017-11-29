var path = require("path");
var webpack = require("webpack");
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH,"./app/");
const BUILD_PATH = path.resolve(ROOT_PATH,"./build/");
var HtmlPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");


module.exports = {
    entry:{
        path:APP_PATH,
        filename:"index.jsx"
    },
    output: {
        path:BUILD_PATH,
        filename:"bundle.js"
    },
    resolve:{
        extensions:["",".js",".jsx"]
    },
    module:{
        loaders:[
            {test:/\.(js|jsx)$/,exclude:/node_modules/,loader:"babel-loader"},
            {test:/\.less$/,exclude:/node_modules/,loader:"style-loader!css-loader!postcss-loader!less"},
            {test:/\.css$/,exclude:/node_modules/,loader:"style-loader!css-loader!postcss-loader"},
            {test:/\.(png|gif|jpg|jpeg|bmp)$/i,loader:"url-loader?limit=5000"},
            {test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,loader:'url-loader?limit=5000'}
        ]
    },
    postcss:[
        require("autoprefixer")
    ],
    plugins:[
        /*模版插件*/
        new HtmlPlugin({
            template:ROOT_PATH + "/app/index.tmpl.html"
        }),

        /*热加载插件*/
        new webpack.HotModuleReplacementPlugin(),

        new OpenBrowserPlugin({
            url:"localhost:8033"
        }),

        /*设置开发环境*/
        new webpack.DefinePlugin({
            __DEV__:JSON.stringify(JSON.parse((process.env.NODE_EVN == "dev") || "false"))
        })

    ],
    devServer:{
        color:true,
        historyApiFallback:true,
        inline:true,
        hot:true,
        port:"8088"
    }
}