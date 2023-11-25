// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const webpack = require('webpack');
const path = require('path');
// 本地环境是否需要使用cdn
const devNeedCdn = true;

module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://xydh.fun',
                ws: true,
                onProxyReq(proxyReq) {
                    // 这里删除 origin 头部,避免代理跨域
                    proxyReq.removeHeader('origin');
                },
            },
        },
    },
    configureWebpack: config => {
        // 引入uglifyjs-webpack-plugin
        const UglifyPlugin = require('terser-webpack-plugin');
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            config.mode = 'production';

            // 将每个依赖包打包成单独的js文件
            const optimization = {
                minimizer: [
                    new UglifyPlugin({
                        terserOptions: {
                            warnings: false,
                            compress: {
                                drop_console: true,
                                drop_debugger: true,
                                pure_funcs: ['console.log'],
                            },
                        },
                        sourceMap: false,
                        parallel: true,
                    }),
                ],
            };

            Object.assign(config, {
                optimization,
            });

            // gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css'];
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false, // 删除原文件
                })
            );

            // 分析打包后的文件
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static', // 生成html文件
                })
            );
        } else {
            // 为开发环境修改配置
            config.mode = 'development';
        }
        // 添加新的 externals 配置
        Object.assign(config, {
            externals: {
                vue: 'Vue',
                vuex: 'Vuex',
                'element-ui': 'ELEMENT',
                lodash: '_',
            },
        });
    },
    // chainWebpack: config => {
    //     config.plugins.delete('prefetch');
    //     config.plugin('chunkPlugin').use(webpack.optimize.LimitChunkCountPlugin, [
    //         {
    //             maxChunks: 2, // 必须大于或等于 1，此处设置成最多生成5个chuank.js文件
    //             minChunkSize: 10000,
    //         },
    //     ]);
    // },
};
