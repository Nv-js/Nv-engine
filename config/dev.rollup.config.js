const liveServer = require('rollup-plugin-live-server') 

//开发环境需要使用的插件
const devPlugins = [
    liveServer({
        file: 'index.html',
        open: true,
        ignore:'src,node_modules,plugin_modules,docs,.gitignore,git/FETCH_HEAD',
        root: ''
    })
]

const target = {
    file: 'dist/nv.js',
    name:"Nv",
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