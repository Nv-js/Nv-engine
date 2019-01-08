import _config  from './config'

const _global = {
     MODULESLIST : {},
     CONFIG      : _config.config,
     PREFIX      : _config.prefix
}

const _log = () => {
   //log todo something
}
const _throwError = (msg) => {
   throw msg;
}

const _status = {
    /** error */
    'ERROR'         : -1,
    /** init */
    'INIT'          : 0,
    /** loading */
    'LOADING'       : 1,
    /** loaded */
    'LOADED'        : 2,
    /**dependencies are loaded or attached*/
    'READY_TO_BIND' : 3,
    /** attaching */
    'BINDING'       : 4,
    /** attached */
    'SUCCESS'       : 5
}

export const global     = _global

export const log        = _log

export const throwError = _throwError

export const cmpstaus   = _status

// export default {
//     global         : _global,
//     log            : _log,
//     throwError     : _throwError,
//     cmpstaus       : _status
// }



