import $ from './tools'
import {cmpstaus} from '../config/global'

const  regx = {
    Regx_name           :  /^\.[\/|\\]\w+[\/|\\](\w.[\/|\\])+/,
    Regx_name_l         :  /^(\.[\/|\\])/g,
    Regx_name_r         :  /^[\/|\\]/g
}



/**
 * 检测类
 */
const common = {
    /**
     * 检测是否符合约定路径写法
     * @param  {路径名称} n
     */
    checkValidName     : (n) => {
        return n.match(regx.Regx_name) || ""
    },
    
    /**
     * 检测是否是相对路径写法
     * @param  {路径名称} n
     */
    isRelativeName     : (n) => {
        return n.match(regx.Regx_name_l) ? 1 : 0
    },
    /**
     * 检测是否是绝对路径写法
     * @param  {路径名称} n
     */
    isAbsoluteName     : (n) => {
        return n.match(regx.Regx_name_r) ? 1 : 0
    },
}

const tools = {

    /**
     * @param  {当前可执行的环境} T
     * @param  {全局函数集合} R
     */
    getFixRequiresPaths  :  (T, R) => {
       let _this = T, 
           _checkName = common.checkValidName(_this.name),
           _requires = _this.config.requires || {},
           _rets = [];
        if(_checkName && _requires.length > 0){
            _requires.forEach(function(ele,index,arr){
                // 如果依赖开头是以“./” or ".\"开头
                let _v = common.isRelativeName(ele)
                if(_v){
                    ele = ele.replace(regx.Regx_name_l, "")
                    _rets.push(_checkName[0] + ele)
                    return
                }
                // 如果当前是以‘/’ or "\" 开头
                _v = common.isAbsoluteName(ele)
                if(_v){
                     ele = ele.replace(regx.Regx_name_r, "")
                     _rets.push("./" + ele)
                     return
                }
                _rets.push(ele)
            })
        }
        //检查依赖数组内有没有别名，有则替换成普通路径
        _rets = tools.getCoreModuleList(_rets, R);
        if(!_rets.length){
            _rets = _requires
        }
        return _rets;
    },
    
    /**
     * 检查集合中是否有别名，有则替换路径，没有则返回
     * @param  {待检测的模块名称或者路径} n
     * @param  {组件的核心集} R
     */
    getCoreModuleList  : (ns, R) => {
        let _config = R.config,
            _repeat = {},
            _m;
        if(ns && $.isArray(ns)){
            ns = tools.fixPaths(ns);
            ns.forEach(function(ele,index,arr){
                if(_repeat[ele]){
                    ns[index] = _repeat[ele]
                    return
                }
                _m = _config.modules[ele]
                if(_m){
                    ns[index] = _m.version ? _m.path.replace('@version', _m.version) : _m.path
                }
                _repeat[ele] = ns[index];
            })
            return ns
        }    


    },
    /**
     * 返回一个补全信息的数组
     * ./date/ => ./date/index || ./common/index.js => ./common/index
     * @param  {路径,支持字符串或者数组} paths
     * @return 入参数组返回数组，入参字符串返回字符串
     */
    fixPaths : (paths) => {
        if(!paths){
            return ''
        }

        if($.isString(paths)){
          return tools.fixPathItem(paths)    
        }

        if($.isArray(paths)){
            let _rets = [];
            paths.forEach(function(ele, index, arr){
                if(ele){
                    _rets.push(tools.fixPathItem(ele))
                }
            })
            return _rets
          }
    },
    /**
     * 修复具体的路径
     * @param  {具体item} path
     */
    fixPathItem  : (path) => {
        if($.isString(path)){
            let _t = path.charAt(path.length - 1)
            if(_t === '/' || _t === '\\'){
                path += "index"
            }
            path = path.replace(regx.Regx_name_l,'./')

            if($.extname(path) === '.js'){
                path = path.slice(0,-3);
            }
            return path 
        }
        return path;
    }
}


const add = {
     register:function(config, R) {
         let name = config.name,
             M = R.global.MODULESLIST
         if(M[name]){
             R.log(name + '重复注册，请检查后核实')
             return
         }
         M[name] = config;
         R.global.MODULESLIST = {
             ...M
         }
     }
}

const use = {
    //该方法是判断了全部模块已经加载完毕并绑定了所有关系后才能调用
    getAllModules(paths, R){
        R.alias = {}
        let _M = R.global.MODULESLIST,
            _m,
            _mName,
            _mFactory,
            _mAlias,
            _rets = [R]
        if($.isArray(paths)){
            paths.forEach(function(ele, index, arr){
                _m        = _M[ele]
                _mName    = _m.name
                _mFactory = _m.factory || {}
                _mAlias   = _m.alias || ''
                if(_mName && $.extname(_mName) !== '.css'){
                    try{
                        _rets.push(_mFactory)
                        _mAlias ? R.alias[_mAlias] = _mFactory : ''
                    } catch(err) {
                        R.throwError('请检查别名为：'+_mAlias+'的'+_mName+'模块异常')
                    }
                }else{
                    _rets.push(undefined)
                }
            })
        }
        return _rets
    },
    //检查路径集合是否都已经注册完毕,并返回未注册完毕的目标集合
    getUnRegisterPath(path, R){
        let _M = R.global.MODULESLIST,
            _unR = []
        if($.isArray(path)){
            path.forEach(function(ele, index, arr){
                let _m = _M[ele]
                if(!_m || _m.status < cmpstaus.SUCCESS){
                    _unR.push({
                        path: ele,
                        m   : _m
                    })
                }
            })
            return _unR
        }else{
            return []
        }
    },

    
}

export default {
    ...regx,
    ...common,
    ...tools,
    ...add,
    ...use

}