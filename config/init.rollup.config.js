const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const minimist = require('minimist');
const dev = require('./dev.rollup.config');
const prod = require('./prod.rollup.config');


var argv = process.argv.slice(2),
cmd = minimist(argv);

process.env.NODE_ENV = cmd.production ? 'production' : 'development'
let isProd = process.env.NODE_ENV === 'production'

//打包入口文件
const input = 'src/index.js'

//通用插件
const commonPlugins = [
    babel({
        // plugins: ['external-helpers'],
        // externalHelpers: true,
        exclude : 'node_modules/**'
    }),
    resolve(),
    commonjs({
        extensions: [ '.js', '.coffee' ]
    })
]
//插件集合
let plugins = [...commonPlugins].concat(isProd ? prod.plugins : dev.plugins)

//输出地址
let output = isProd ? prod.target : dev.target

let config = {
    input,
    plugins
}

let _exp = {
    config,
    output,
    isProd
}
//是否监控
if(!isProd){
    let _watchOptions = {
        ...dev.watch,
        input,
        output
    }
    _exp['watch'] = _watchOptions
}



module.exports = _exp