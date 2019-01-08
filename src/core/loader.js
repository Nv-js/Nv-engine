class loader {
    constructor(handler,_R){
        this.handler = handler
        this.queue = {}
        this._this = _R
    }


    execute(){
        if(this.handler){
            this.handler();
            this.handler = null;
        }
    }

    set(path){
        this.queue[path] = 1
    }

    delete(path){
        delete this.queue[path]
    }

    get(path){
        return this.queue[path]
    }


}

export default loader