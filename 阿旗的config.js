// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const path = require('path');

// 基础路径 注意发布之前要先修改这里
let publicPath = '/'

// 本地环境是否需要使用cdn
const devNeedCdn = true

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
      // vue: 'Vue',
      // vuex: 'Vuex',
      // 'vue-router': 'VueRouter'
  },
  // cdn的css链接
  css: [
  ],
  // cdn的js链接
  js: [
      'https://api.map.baidu.com/api?v=3.0&ak=uFxW4HUI2R4L4qtsNea17066QRRL7udq',
      'https://lib.baomitu.com/jquery/1.12.4/jquery.js',
      'https://ssl.captcha.qq.com/TCaptcha.js'
  ]
}

module.exports = {
  devServer: {
    port: 8886,     // 端口
    publicPath
  },
  css: { // 配置css模块
    loaderOptions: { // 向预处理器 Loader 传递配置选项
        less: { // 配置less（其他样式解析用法一致）
          javascriptEnabled: true // 设置为true
        }
    }
  },
  lintOnSave: false,   // 取消 eslint 验证
  productionSourceMap: false,
  publicPath,
  chainWebpack: config => {

    // config.resolve.alias
    //   .set('@ant-design/icons/lib/dist$',resolve('./src/util/icons.js'))
      
    if (process.env.NODE_ENV == 'production' ){
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()

      config.plugin('context')
        .use(webpack.ContextReplacementPlugin,
          [/moment[/\\]locale$/, /ja|it/])

      // // 移除 prefetch 插件
      // config.plugins.delete('prefetch')
      // // 移除 preload 插件
      // config.plugins.delete('preload')

      // // js文件最小化处理
      // config.optimization.minimize(true);

      // //分割代码
      // config.optimization.splitChunks({
      //     chunks: 'all'
      // });
    }
    // ============压缩图片 start============
    config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
    // ============压缩图片 end============

    // ============注入cdn start============
    config.plugin('html').tap(args => {
        // 生产环境或本地需要cdn时，才注入cdn
        if (process.env.NODE_ENV == 'production' || devNeedCdn) args[0].cdn = cdn
        return args
    })
    // ============注入cdn start============
    
  },
  configureWebpack: (config) => {

    // config.resolve = {
    //   alias: {
    //     '@ant-design/icons/lib/dist$': resolve('./src/util/icons.js')
    //   }
    // }
    
    //  引入uglifyjs-webpack-plugin
    let UglifyPlugin = require('uglifyjs-webpack-plugin');

    if (process.env.NODE_ENV == 'production') {
      

      // 为生产环境修改配置
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {

        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                // const packageName = module.context.match(
                //   /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                // )[1];
                const packageName = Math.random().toString(36).substr(2)
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `java.${packageName}`;
              },
              // test: /node_modules/,
              // name:"vendor",
              // minChunks: 3,
              // maxInitialRequests: 5,
              // minSize: 0,
              // priority:100,
            },
            common: {
              chunks:"all",
              test:/[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority:60
            },
            styles: {
              name: 'styles',
              test: /\.(sa|sc|c)ss$/,
              chunks: 'all',
              enforce: true,
            },
          }
        },

        minimizer: [new UglifyPlugin({
            uglifyOptions: {
                warnings: false,
                compress: {
                  drop_console: true, 
                  drop_debugger: true,
                  pure_funcs: ['console.log'] 
                }
            },
            sourceMap: false,
            parallel: true,
        })],
      }

      Object.assign(config, {
        optimization
      })


      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
          new CompressionWebpackPlugin({
              filename: '[path].gz[query]',
              algorithm: 'gzip',
              test: new RegExp(
                  '\\.(' + productionGzipExtensions.join('|') + ')$'
              ),
              threshold: 0, // 只有大小大于该值的资源会被处理 10240
              minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
              deleteOriginalAssets: false // 删除原文件
          })
          // new CompressionWebpackPlugin({
          //   filename: '[path].gz[query]',
          //   algorithm: 'gzip',
          //   test: /\.js$|\.html$|\.json$|\.css/,
          //   threshold: 0, // 只有大小大于该值的资源会被处理
          //   minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
          //   deleteOriginalAssets: false // 删除原文件
          // })
      )


      
    } else {
      // 为开发环境修改配置
      config.mode = 'development'
    }
  },
  parallel: require('os').cpus().length > 1,
};