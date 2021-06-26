const { 
    override,
    fixBabelImports, 
    addLessLoader, 
    addWebpackAlias, 
    addWebpackPlugin, 
    overrideDevServer, 
    addDecoratorsLegacy
    } = require('customize-cra')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 进度条
const chalk = require('chalk'); // console打印颜色

// const addProxy = (config) => {
//     config.proxy = {
//         '/api': {
//             target: 'http://localhost:3721/',
//             changeOrigin: true,
//             pathRewrite:{
//                 '^/api': ''
//             }
//         }
//     }
//     return config
// }
const addCustomize = () => (config) => {
    const oneOf = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    return config;
  };
module.exports = {
    webpack: override(
        addWebpackAlias({
            ['@']: path.resolve(__dirname, 'src'),
            ['components']: path.resolve(__dirname, 'src/components')
        }),
        fixBabelImports('antd', {
            libraryDirectory: 'es',
            style: true
        }),
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
                // modifyVars: {'@primary-color': '#1DA57A'}
            }
        }),
        addWebpackPlugin(new ProgressBarPlugin({
            complete: "█",
            format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ':msg:' ${chalk.bold('(:percent)')}`,
            clear: true
        })),
        addCustomize()
    ),
    // devServer: overrideDevServer(addProxy)
}