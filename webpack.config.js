const path = require("path");

module.exports = {
  entry: {
    bundle: "./src/js/script.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist",
    library: "threex-domevents",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.scss$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          }
        ]
      }
    ]
  },
  devServer: {
    overlay: true
  }
};
