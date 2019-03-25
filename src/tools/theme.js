import $ from './tools'

var _reg = /.*(nv.)(.*)(.min.css|min.css)/

export default function(){

let _els = document.getElementsByTagName('link'),
    _el,_g;

    if(_els && _els.length > 0){
        $.each(_els,function (index,obj) {
            if(_g){return false}
            let _status = obj.getAttribute('data-theme')
            if(_status === ""){
                _el = obj;
                _g = 1;
            }
        })
    }else{
        return ''
    }

    if(!_el){
        return ''
    }

let _href = _el.getAttribute('href')
    if(_href){
        _href = _href.match(_reg)
    }else{
        return ''
    }

    if(_href){
        _href = _href[2].split('.')[0]
    }

    if(_href){
        return _href
    }else{
        return ''
    }
}