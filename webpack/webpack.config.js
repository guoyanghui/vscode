const path = require("path");
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH,"./src/");
const BUILD_PATH = path.resolve(ROOT_PATH,"./build/");

module.exports = {
    devtool: "eval-source-map",
    devServer: {
        contentBase:"./public",
        historyApiFallback:true,
        online:true,
        port:8088
    },
    entry: SRC_PATH,
    output:{
        path:BUILD_PATH,
        filename:"bundle.js"
    },
    module: {
        rules: [
            {
                test:/(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader:"css-loader"
                    }
                ]
            },
        ]
    }
}