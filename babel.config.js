module.exports = {
  presets: [
    "@babel/preset-env",
    {
      useBuiltIns: "entry",
      corejs: "3.21.1",
      targets: {
        browsers: ["> 1%", "last 2 versions", "not ie <= 10"],
        node: "current"
      }
    }
  ]
}