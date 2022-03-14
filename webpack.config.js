const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { DefinePlugin } = require("webpack")

const __DEV__ = process.env.NODE_ENV === "development"

module.exports = {
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          __DEV__ ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
          {
            loader: "custom-loader",
            options: {
              value: "str",
              count: 2
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/[name].[hash:8][ext]"
        }
      }
    ]
  },
  resolveLoader: {
    alias: {
      "custom-loader": path.resolve(__dirname, "./custom-loader/index.js")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      filename: "index.html",
      title: "Webpack Learning"
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css"
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({})
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[/]node_modules[/]/,
          priority: 10,
          chunks: 'initial'
        },
        commons: {
          name: 'chunk-commons',
          minChunks: 2,
          priority: 5,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  }
}