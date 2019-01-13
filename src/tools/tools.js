/**
 * 代码初始化
 */
const 
      ArrayProto = Array.prototype, 
      ObjProto = Object.prototype;

const 
    slice       = ArrayProto.slice,
    toString    = ObjProto.toString;

const 
    nativeKeys  = Object.keys;    

const 
    splitPath   = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/,
    RE_TRIM     = /^[\s\xa0]+|[\s\xa0]+$/g;   

const _is = {
    isArray          : (obj) => {
        return toString.call(obj) === "[object Array]";
    },
    isObject         : (obj) => {
        return toString.call(obj) === "[object Object]";
    },
    isPlainObject    : (obj) => {
          //确保不是dom节点与window对象
          if(!obj || !_is.isObject(obj) || obj.nodeType || obj.window ==obj){
            return false;
        }
        //hasOwnProperty(不检测原型链),isPrototypeOf(对象原型中是否存在对象),constructor(创建此对象的数组函数的引用),instanceof(测试对象是否为标杆对象的实例)
        try{
            if(!ObjProto.hasOwnProperty.call(obj,"constructor") && !ObjProto.hasOwnProperty.call(obj.constructor.prototype,"isPrototypeOf")){
                return false;
            }
        } catch(e){
            return false;
        }
        //
        for(let key in obj){}
        return ((key===undefined) || ObjProto.hasOwnProperty.call(obj,key));
    },
    isFunction        : (obj) => {
        return toString.call(obj) === "[object Function]";
    },
    isString          : (obj) => {
        return toString.call(obj) === "[object String]";
    },
    isRegExp          : (obj) => {
        return (toString.call(obj) === "[object Number]" && !isNaN(obj));
    },
    isUndefined       : (obj) => {
        _each(obj,function(i,n){
            if(i !== undefined){
                return false;
            }
        })
        return true;
    },
    isNull            : (obj) => {
        let flag = false;
        if(null === obj){
            flag = true;
        }
        return flag
    },
    isBoolean         : (obj) => {
        return toString.call(obj) === "[object Boolean]";
    },
    isDate            : (obj) => {
        return toString.call(obj) === "[object Date]";
    },
    isEmptyObject     : (obj) => {
        let flag = true;
        _each(obj,function(){
            flag = false;
            return true;
        })
        return flag;
    }
}




function _extend(){
    let args = arguments,
        deeps = false,
        parent = args[0] || {},
        child = args[1] || {},
        i = 0,
        l = args.length;
    if(_is.isBoolean(args[0])){
        deeps = args[0];
        parent = args[1];
        child = args[2] || {};
        i = 3;
    }else{
        i = 2;
    }
        //
        //
    _each(child, function(i,n){
        let copy = n;
        if(parent == copy)return;
        if(copy && _is.isObject(copy) && deeps){
            parent[i] = _extend(deeps,parent[i] || {},copy);
        }else if(copy && _is.isArray(copy) && deeps){
            parent[i] = _extend(deeps,parent[i] || [],copy);
        }else{
            parent[i] = copy;
        }
    })
        //
    if(l > i){
        for(let m = i; m < l; m++){
            parent = _extend(deeps,parent,args[m]);
        }
    }
        //
    return parent
}

function _each(obj, callback){
    obj = obj || [];
    if(_is.isArray(obj)){
        obj.forEach(function(currentValue,index,array){
            callback.call(this,index,currentValue);
        });
        return;
    }
    let length = obj.length || 0;

    if(length > 0){
       for(let i = 0;i < obj.length; i++){
          callback.call(this,i,obj[i]);
       }
       return;
    }
      //
    for(let o in obj){
        if(obj.hasOwnProperty(o)){
            callback.call(this,o,obj[o]);
        }
    }
}

const _ser = {
    keys         : (obj) => {
        if(!_is.isObject(obj)) return [];
        if(nativeKeys) return nativeKeys(obj);
        let keys = [];
        _each(obj,function(i,n){
            keys.push(i);
        })
        return keys;
    },
    values       : (obj) => {
        if(!_is.isObject(obj)) return [];
        let array = [];
        _each(obj,function(i,n){
            array.push(n);
        })
        return array;
    },
    makeArray    : (obj) => {
        if(!obj) return [];
        if(Array.from)return Array.from(obj);
        if(_is.isArray(obj))return slice.call(obj);
        let array = [];
        if(_is.isObject(obj) && obj.length>=0){
            _each(obj,function(i,n){
                array.push(n);
            })
            return array;
        }
        _each(obj,function(i,n){
            array.push({i:n});
        })
        return array;
    },
    trim         : (obj) => {
        return obj == null ? "" : (obj + "").replace(RE_TRIM,"");
    },
    size         : (obj) => {
        if(!obj) return 0;
        return obj.length >= 0 ? obj.length : _ser.keys(obj).length;
    },
    extname      : (path) => {
        let fileName = (path.match(splitPath) || [])[4] || "";
        return fileName.toLowerCase();
    },
    endWidth     : (str, suffix) => {
        let l = str.length - suffix.length;
        return l >= 0 && str.indexOf(suffix,l) === l;
    },
    bind         : (r,fn,obj) => {
        function o(){};
        let args = slice.call(arguments,3),
            newFn = function(){
                   let inArgs = slice.call(arguments);
                   return fn.apply(this instanceof o ? this : obj || this,r ? inArgs.concat(args):args.concat(inArgs))
            }
        o.prototype = fn.prototype;
        newFn.prototype = new o();
        return newFn;
    },
    splitNumber  : (number,split,qt) => {
        split = split || 3;
        number = number + "";
         qt = qt || ",";

        number = number.split("");
        number = number.reverse();
        let ret = [];
        $.each(number,function(i,n){
            if(i != 0 && i % split == 0){
                ret.push(qt);
                ret.push(n);
            }else{
                ret.push(n);
            }
        })
        ret = ret.reverse();
        ret = ret.join("");
        return ret;
    },
    splitMoney   : (q) => {
        let r = parseInt(q)+"";
        if(r.length > 3){
            q = q / 100;
            q = Math.round(q);
            q = q /100;
            q = q + "万";
        }
        return q;
    },
    transUrl     : (search) => {
        let ser = search.replace("?",""),
        o = ser.split("&"),
        p,
        rets = {};
        _each(o,function(i,n){
            p = n.split("=");
            rets[p[0]] = p[1];
        })

        return rets;
    },
    getWords     : (randomFlag, min, max) => {
        let str = "",
        pos = 0,
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // 随机产生
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(let i=0; i<range; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
    }
}

const _browser = {
    later         : (fn,time,which) => {
        time = time || 0;
        let r = (which) ? setInterval(fn, time) : setTimeout(fn, time);
        return {
            id:r,
            interval:which,
            cancel:function(){
                if(this.interval){
                    clearInterval(this.id);
                }else{
                    clearTimeout(this.id);
                }
            }
        }
    },
    cookie        : (key,value,time) => {
        if(typeof(value)=="undefined"&&typeof(key)!="undefined"&&typeof(value)!="boolean"){
            let arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
            if(arr != null) return (unescape(arr[2])); return null;
        }else if(typeof(key)=="string"&&typeof(value)=="string"){
            //默认30天
            if(typeof(time)=="undefined"||typeof(time)!="number") time=30;
            let exp = new Date();
            exp.setTime(exp.getTime() + time*24*60*60*1000);
            document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;";
        }else if(typeof(value)=="boolean"){
            if(value===true){
                let exp = new Date();
                exp.setTime(exp.getTime() - 1);
                let arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
                if(arr[2]!=null) document.cookie= key + "="+arr[2]+";expires="+exp.toGMTString()+";path=/";
            }
        }

    },
    storage       : (which,key,value,isClear) => {
        let _w = false,
        _key = key,
        _value = value,
        _isClear = false;
        if(typeof(which) == "boolean"){
            _w = which
        }else{
            _key = which;
            _value = key;
        }
        if(typeof(_value) == "object"){
            _value = JSON.stringify(_value);
        }
        
        if((_w == true && key == true) || (typeof(_w) == 'boolean' && !key && !value && !isClear)){
            _isClear = true;
        }
        let local = _w ? sessionStorage : localStorage;
        if(_key && !_value && typeof(_key) != "boolean"){
            //读取相关信息
            return local.getItem(_key);
        }else if(_key && _value && typeof(_value) != "boolean"){
            //存储信息
            return local.setItem(_key,_value);
        }else if(_key && _value && typeof(_value) == "boolean"){
            return local.removeItem(_key);
        }
        if(_isClear === true){
            return local.clear();
        }
    },
    browser       : {
        versions:function(){
            let u = navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                isSupportTouch : "ontouchend" in document ? true : false,//是否支持touch
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    },
    format        :(fmt, time) => {
        let date = new Date(time);
        let o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(let k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }

}

export default {
    ..._is,
    extend : _extend,
    each   : _each,
    ..._ser,
    ..._browser
}











