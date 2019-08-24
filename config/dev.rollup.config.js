const liveServer = require('rollup-plugin-live-server')
const { eslint } = require('rollup-plugin-eslint')
const pkg = require('../package.json')
//开发环境需要使用的插件
const devPlugins = [
    liveServer({
        file: 'index.html',
        open: true,
        ignore:'src,node_modules,plugin_modules,docs,.gitignore,git/FETCH_HEAD',
        root: ''
    }),
    // eslint()
]

const target = {
    file: 'dist/'+ (pkg.name).toLowerCase() +'.js',
    name:pkg.name,
    format: 'umd'
}

const watchOptions = {
    watch:{
        include: 'src/**/*'
    }
}

module.exports = {
    plugins : devPlugins,
    target  : target,
    watch   : watchOptions
    // watch
}