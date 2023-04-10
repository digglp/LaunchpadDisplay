//import webpack from 'webpack';

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const fs = require("fs");

module.exports = {
  entry: "./src/application/console.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "launchpad.js",
    path: path.resolve(__dirname, "dist"),
  },
};
