import $ from '../tools/tools'
import add from '../core/add'
import use from '../core/use'

const addModule = (name, factory, config) => {
   let _add = new add(name, factory, config)
}

const useModule = function(){
   let _args = Array.prototype.slice.call(arguments),
       _use = new use(..._args) 
}

export default {
   add : addModule,
   use : useModule
}