const liveServer = require('rollup-plugin-live-server') 

//开发环境需要使用的插件
const devPlugins = [
    liveServer({
        file: 'index.html',
        open: true,
        root: ''
    })
]

const target = {
    file: 'dist/zr.js',
    name:"Zr",
    format: 'umd'
}

const watchOptions = {
    watch:{
        include: 'src/**'
    }
}



module.exports = {
    plugins : devPlugins,
    target  : target,
    watch   : watchOptions
    // watch
}