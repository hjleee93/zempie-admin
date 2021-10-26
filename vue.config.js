module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  publicPath: './',
  productionSourceMap: false
}
