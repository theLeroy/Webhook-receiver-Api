// Helps with dependencies from node_modules
const nodeExternals = require('webpack-node-externals')
// Copies package.json to dist-folder
const CopyPkgJsonPlugin = require("copy-pkg-json-webpack-plugin")
const path = require("path")

module.exports = {
  mode: 'development',
  entry: "./src/server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js"
  },
  target: 'node',
  externals: [ nodeExternals() ],
  plugins: [
    new CopyPkgJsonPlugin({
      replace: {scripts: {start: 'node server.js'}}
    })
  ]
}
