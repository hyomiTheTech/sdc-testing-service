module.exports = {
  entry: __dirname + "/client/src/index.jsx",
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              "@babel/preset-env",
              {
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-transform-runtime"
                ]
              }
            ]
          }
        }
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/client/dist"
  }
};
