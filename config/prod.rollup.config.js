const uglify = require('rollup-plugin-uglify');
let pkg = require('../package.json')
//生产环境需要使用的插件
const prodPlugins = [
    uglify()
]

const target = {
    file: 'dist/'+(pkg.name).toLowerCase()+'.min.js',
    name:pkg.name,
    format: 'umd',
    sourcemap:true
}

module.exports = {
    plugins : prodPlugins,
    target  : target
}