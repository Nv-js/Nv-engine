import $ from './tools'
import {cmpstaus,global} from '../config/global'
import getFile from './getFile'
import myLoader from '../core/loader'

const  regx = {
    Regx_name           :  /(^\.[\/|\\].+[\/|\\])|(^\w.+[\/|\\])/,
    Regx_name_l         :  /^(\.[\/|\\])/g,
    Regx_name_r         :  /^[\/|\\]/g,
    Regx_prefix         :  /\.[\/|\\]+/,
    Regx_start          : /^\w.+/,
    Regx_last           : /[\/|\\]$/
}



/**
 * 检测类
 */
const common = {
    /**
     *
     */
    checkIsPath        : (n) => {
        return n.match(regx.Regx_start) ? 1 : 0
    },
    /**
     * 检测是否符合约定路径写法
     * @param  {路径名称} n
     */
    checkValidName     : (n) => {
        return n.match(regx.Regx_name)  || ""
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
    isRegisterAllName  : (ns, R) => {
        let status = 1,
            _M = R.global.MODULESLIST
        $.each(ns,function (index,ele) {
            if(!_M[ele.path]){
                status = 0
                return false
            }
        })
        return status;
    }
    
}

const tools = {
     getPathPrefix        :  (path) => {
         if(path.indexOf("/") != -1){
             path = path.substring(0,  path.lastIndexOf("/")+1) ;
         }
         return path
     },
    getRplacePath         : (path, R) => {
         let paths = R.global.CONFIG.paths
         let index = path.indexOf("/"),
             pre = path.substring(0,index),
             last = path.substring(index),
             realPre = tools.getFixRealPaths(paths[pre])
        if(realPre){
             return realPre + last
        }else {
            return path
        }
    },
    getFixRealPaths       : (path) => {
         if(regx.Regx_last.test(path) && path){
             path = path.substring(0,path.lastIndexOf('/'))
         }

         return path
    },
    /**
     * @param  {当前可执行的环境} T
     * @param  {全局函数集合} R
     */
    getFixRequiresPaths  :  (T, R,Test) => {
       let _this = T,
           _checkName = common.checkValidName(_this.name),
           _prefix = tools.getPathPrefix(_this.name),
           _requires = _this.config.requires || [],
           _rets = [];
       console.log(_this.name,Test,_checkName)
       // console.log(_requires)
        if(_checkName && _requires.length > 0){
            $.each(_requires,function(index,ele){
                // 如果依赖开头是以“./” or ".\"开头
                let _v = common.isRelativeName(ele)
                if(_v){
                    ele = ele.replace(regx.Regx_name_l, "")
                    _rets.push(_prefix + ele)
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
        let _config = R.global.CONFIG,
            _repeat = {},
            _m;
        if(ns && $.isArray(ns)){
            ns = tools.fixPaths(ns);
            $.each(ns,function (index,ele) {
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
            $.each(paths,function (index,ele) {
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
             M[name] = $.extend(true,M[name],config)
         }else{
             M[name] = config;
         }
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
            _mExport,
            _mAlias,
            _rets = [R]
        if($.isArray(paths)){
            $.each(paths,function (index,ele) {
                _m        = _M[ele]
                _mName    = _m.name
                _mExport = _m._exports
                _mAlias   = _m.alias || ''
                if(_mName && $.extname(_mName) !== '.css'){
                    try{
                        _rets.push(_mExport)
                        _mAlias ? R.alias[_mAlias] = _mExport : ''
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
            _unR = [],
            _repeat = {}
        if($.isArray(path)){
            $.each(path,function (index,ele) {
                if(_repeat[ele]){
                    return
                }
                _repeat[ele] = 1

                let _m = _M[ele]
                if(!_m){
                    _unR.push({
                        path: ele,
                        m   : _m
                    })
                    return
                }
                if(_m.status < cmpstaus.SUCCESS){
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
    //未注册模块需要加载该模块并进行状态更新
    requestFile(path,loader, R){
        if($.isString(path)){
            path = [path]
        }
        $.each(path,function (index,ele) {
            use.requestFilePath(ele,loader, R)
        })

            
    },
    //加载对应路径文件
    requestFilePath(path,loader, R){
        let baseUrl = R.global.CONFIG.baseUrl,
            cdnUrl = R.global.CONFIG.cdnUrl,
            paths = R.global.CONFIG.paths
        //注册状态
        add.register({
            name:path,
            status    : 0,
            lock   : 0
        }, R)
        //加载文件
        let _repath = path.replace(regx.Regx_prefix,'')
        let _typeStatus = _repath.lastIndexOf("cdn_")
            // _path = baseUrl + _repath
        let isPath = common.checkIsPath(path),
            _path = ""

        if(_typeStatus > -1 && !isPath){
            _path = cdnUrl + _repath
        }

        if(isPath){
            _path = tools.getRplacePath(path,R)
        }
        if(!_path){
            _path = baseUrl + _repath
        }
        //更新模块状态
        R.global.MODULESLIST[path].status = cmpstaus.LOADING
        R.global.MODULESLIST[path].lock = 1
        //
        if(!$.endWidth(_path,'.js') && !$.endWidth(_path,'.css')){
            _path += '.js'
        }
        //如果开启了开发模式，则添加后缀
        if(R.global.CONFIG.development){
           _path += '?t='+$.getWords(1,10,20)
        }
        let _file = new getFile(_path,{
            success:function(){
                //删除等待条目
                loader.deleter(path)
                if($.endWidth(path,'.css')){
                    R.global.MODULESLIST[path].status = cmpstaus.SUCCESS
                    R.global.MODULESLIST[path].lock = 1
                    //成功状态则通知其他订阅者
                    R._pub.publish(path)
                }
                if(loader.isEmpty()){
                    loader.execute();
                }
            },
            error:function(){
                window[global.PREFIX].throwError('文件不存在或者已经丢失，路径：' + _path)
                R.global.MODULESLIST[path].status = cmpstaus.ERROR
            }
        })  
        _file.request()
    },
    
    /**
     * 获取所有依赖模块
     * @param  {} paths
     * @param  {} R
     */
    getAllRequiresPaths(paths, R){
        let _requires = [],
            _repeatR = [],
            _repeat = {}
            $.each(paths,function(index,ele){
                let _e = R.global.MODULESLIST[ele.path],
                    _r = _e.requires || [];
                //
                if(_r && _r.length > 0 && _e.status < cmpstaus.READY_TO_BIND){
                    _requires = _requires.concat(_r)
                }
            })

        //去重
        $.each(_requires,function (index,ele) {
            if(_repeat[ele]){
                return
            }
            _repeatR.push(ele)
        })
        return _repeatR
    },
    bindingAllRelationPaths(paths, R, handler){

        let _M = R.global.MODULESLIST,
             _m,
             _rets = [],
             _go = 1
        $.each(paths,function(index,ele){
            _m = _M[ele.path]
            if(_m.status === cmpstaus.SUCCESS){
                return
            }
            //判断当前的模块状态，如果是BINDING以上的状态，则全体等待订阅这个路径完成后再继续运行
            function waitBinding(){
                use.bindingAllRelationPaths(paths, R, handler)
            }
            if(_m.status != cmpstaus.SUCCESS && _m.lock && !_m.factory){
                R._pub.subscibe(ele.path,waitBinding)
                _go = 0
                return false
            }
            R.global.MODULESLIST[ele.path].status = cmpstaus.BINDING
            R.global.MODULESLIST[ele.path].lock = 1
            _rets.push(ele.path);
        })

        //当前订阅了绑定行为，终止所有流程，等待通知再执行
        if(!_go){
            return false
        }
        //
        if(_rets.length){
            use.bindingExtend(_rets, R, handler)
        }else{
            handler()
        }

    },
    bindingExtend(paths, R, handler){
        let _M = R.global.MODULESLIST
        $.each(paths,function (index,ele) {
            let _m           = _M[ele],
                _factory     = _m.factory,
                _requires    = _m.requires || [],
                hand,
                handR,
                _rets = [R]

            if(_requires.length){
               _requires = tools.getCoreModuleList(_requires, R)
                $.each(_requires,function (rindex,rele) {
                    let _mi = _M[rele]
                    if(!_mi){
                        R.throwError('check the module '+rele+' spell right?')
                    }
                    if($.extname(rele) === '.css'){
                        hand = undefined
                    }else{
                        hand = _mi._exports ? _mi._exports : _mi.factory()
                    }
                    _rets.push(hand)
                })
            }

            ////


            handR = _factory(..._rets)
            R.global.MODULESLIST[ele]._exports = handR
            R.global.MODULESLIST[ele].status = cmpstaus.SUCCESS
            R._pub.publish(ele)
        })
       handler()
    },
    //存储成熟的绑定关系到缓存,暂时不用
    storagePath(path, R){
        let config   = R.global.CONFIG,
            _storage = config.storage,
            _name    = _storage.name,
            _type    = _storage.type == 'session' ? true : _storage.type == 'static' ? '' : false,
            _version = _storage.version,
            _m = R.global.MODULESLIST[path]
        if(_type !== ''){
            let _getS    = $.storage(_type, _name) || '{}',
            _default = JSON.parse(_getS)
            _default.version = _version
            if($.isFunction(_m.factory)){
                _m.factory += '' 
            } 
            _default[path] = _m
            _default = JSON.stringify(_default)
            _default = JSON.parse(_default)
            $.storage(_type, _name, _default)    
        }
        return R
    }
    
}

export default {
    ...regx,
    ...common,
    ...tools,
    ...add,
    ...use

}