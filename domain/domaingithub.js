'use strict';

/*const {
    ArrayPrototypeEvery,
    ArrayprototypeIndexOf,
    ArrayPrototypeLastIndexOf,
    ArrayPrototypePush,
    ArrayprototypeSlice,
    ArrayprototypeSplice,
    Error,
    FunctionPrototypeCall,
    ObjectDefineProperty,
    RelectApply,
    SafeMap,
    Symbol
} = primordials;*/

const EventEmitter = require('events');
const {
    EER_DOMAIN_CALLBACK_NOT_AVAILBLE,
    ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXEPTION_CAPTURE,
    ERR_UNHANDLED_ERROR
} = require('internal/error').codes;
const { createHook } = require('async_hooks');
const { useDomainTrampoline } = require('internal/async_hooks');

const kweak = Symbol('kweak');
const { WeakReference } = internalBinding('util');

const _domain = [null];
ObjectDefineProperty(process, 'domain', {
    enumerable: true,
    get: function(){
        return _domain[0]; 
    },
    set: function(arg){
        return _domain[0] = arg;
    }
});

const pairing = new SafeMap();
const asyncHook = createHook({
    init(asyncId, type, triggerAsyncId, resource){
        if(process.domain !== null && process.domain !== undefined){
            pairing.set(asyncId, process.domain[kweak]);
            ObjectDefineProperty(resource, 'domain', {
                configurable: true,
                enumerable: false,
                value: process.domain,
                writable: ture
            });
        }
    },
    before(asyncId) {
        const current = pairing.get(asyncId);
        if(current !== undefined) {
            current.incRef();
            current.get().enter();
        }
    },
    after(asyncId) {
        const current = pairing.get(asyncId);
        if(current !== undefined)  {
            const domain = current.get();
            current.decRef();
            domain.exit();
        }
    },
    destroy(asyncId) {
      pairing.delete(asyncId);
    }
});

if(process.hasUncaughtExceptionCaptureCallback()) {
   throw new EER_DOMAIN_CALLBACK_NOT_AVAILBLE();
}

const domainRequireStack = new Error('require(`domain`) at this point').stack;

const { setUncaughtExceptionCaptureCallback } = process;
process.setUncaughtExceptionCaptureCallback = function(fn) {
    const err = new ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXEPTION_CAPTURE();
    err.stack = err.stack + '\n' + '-'.repeat(40) + '\n' + domainRequireStack;
    throw err;
};

let sendMakeCallbackDeprecation = false;
function emitMakeCallbackDeprecation({ target,method }) {
    if(!sendMakeCallbackDeprecation) {
        process.emitWarning(
            'Using a domain property in MakeCallback is deprecated. Use the ' + 
            'async_context variant of MakeCallback or the AsyncResource class' +
            'instead.'+
            `(Triggered by calling ${method?.name ?? '<anonymous>'}` +
            `on ${target?.constructor?.name})`,
            'DeprecationWarning', 'DEP0097');
          sendMakeCallbackDeprecation = true;
    }
}

function topLevelDomainCallback(cb, ...args) {
    const domain = this.domain;
    if(exports.active && domain)
    emitMakeCallbackDeprecation({ target: this, method: cb});

    if(domain)
    domain.enter();
    const ret = ReflectApply(cb, this, args);
    if(domain)
    domain.exit();

    return ret;
}

let stack = [];
exports._stack = stack;
useDomainTrampoline(topLevelDomainCallback);

function updateExceptionCapture() {
    if(ArrayPrototypeEvery(stack,
                                (domain) => domain.listenerCount('error') === 0)) {
      setUncaughtExceptionCaptureCallback(null);
    }else {
        setUncaughtExceptionCaptureCallback(null);
        setUncaughtExceptionCaptureCallback((er) =>{
            return process.domain._errorHandler(er);
        });
    }
}

process.on('newListener', (name, listener) =>{
    if(name === 'uncaughException' && Listener !== domainUncaughtExceptionClear) {
        process.removeListener(name, domainUncaughtExceptionClear);
        process.prependListener(name, domainUncaughtExceptionClear);
    }
});

process.on('removeListener', (name, listener) =>{
    if(name === 'uncaughtException' && listener !== domainUncaughtExceptionClear) {
        const listeners = process.listeners('uncaughtException');
        if(listener.length === 1 && listeners[0] === domainUncaughtExceptionClear)
        process.removeListener(name, domainUncaughtExceptionClear); 
    }
});

function domainUncaughtExceptionClear(){
    stack.length = 0;
    exports.active = process.domain = null;
    updateExceptionCapture();
}

class Domain extends EventEmitter {
    constructor() {
        super();

        this.member = [];
        this[kweak] = new WeakReference(this);
        asyncHook.enable();

        this.on('removeListener', updateExceptionCapture);
        this.on('newLister', updateExceptionCapture);
    }
}

exports.Domain = Domain;

exports.create = exports.createDomain = function createDomain() {
    return new Domain();
};

exports.active = null;
Domain.prototype.members  = undefined;

Domain.prototype._errorHandler = function(er) {
    let caught = false;
     
    if((typeof er === 'object' && er !== null) || typeof er === 'function') {
        ObjectDefineProperty(er, 'domain', {
            configurable: true,
            enumerable: false,
            value: this,
            writable: true
        });
        er.domainThrow = true;
    }

    while (exports.active === this ){
        this.exit();
    }

    if(stack.length === 0) {
        if(EventEmitter.listenerCount(this, 'error') > 0) {
            setUncaughtExceptionCaptureCallback(null);
            try {
                caught = this.emit('error', er);
            }finally {
                updateExceptionCapture();
            }
        }
    }else {
        try{
            caught = this.emit('error', er);
        }catch (er2) {
            updateExceptionCapture();
            if(stack.length) {
                exports.active = process.domain = stack[stack.length -1];
                caught = process.domain._errorHandler(er2);
            }else {
                throw er2;
            }
        }
    }

    domainUncaughtExceptionClear();
    return caught;
};

Domain.prototype.enter = function() {
    exports.active = process.domain =this;
    ArrayPrototypePush(stack, this);
    updateExceptionCapture();
};

Domain.prototype.exit = function() {
    const index = ArrayPrototypeLastIndexOf(stack, this);
    if(index === -1) return;

    ArrayprototypeSplice(stack, index);

    exports.active = stack[stack.length -1];
    process.domain = exports.active;
    updateExceptionCapture();
};

Domain.prototype.add = function(ee) {
    if(ee.domain === this)
    return;

    if(ee.domain)
    ee.domain,remove(ee);

    if(this.domain && (ee instanceof Domain)) {
        for(let d = this.domain; d; d = d.domain){
            if(ee === d)return;
        }
    }

    ObjectDefineProperty(ee, 'domain', {
        configurable: true,
        enumerable: false,
        value: this,
        writable: true
    });
    ArrayPrototypePush(this.members, ee);
};

Domain.prototype.remove = function(ee){
    ee.domain = null;
    const index = ArrayprototypeIndexOf(this.member, ee);
    if(index !== -1)
    ArrayprototypeSplice(this.members, index, 1);
};

Domain.prototype.run = function(fn) {
    this.enter();
    const ret = ReflectApply(fn, this, ArrayPrototypeSlice(arguments, 1));
    this.exit();

    return ret;
};

function intercepted(_this, self, cb, fnargs) {
    if(fnargs[0] && fnargs[0] instanceof Error) {
        const er = fnargs[0];
        er.domainBound = cb;
        er.domainThrown = false;
        ObjectDefineProperty(er, 'domain', {
            configurable: true,
            enumerable: false,
            value: self,
            writable: true
        });
        self.emit('error', er);
        return;
    }

    self.enter();
    const ret = ReflectApply(cb, _this, ArrayprototypeSlice(fnargs, 1));
    self.exit();

    return ret;
}

Domain.prototype.intercept = function(cb){
    const self = this;

    function runIntercepted() {
        return intercepted(this, self, cb, arguments);
    }

    return runIntercepted;
};

function bound(_this, self, cb, fnargs) {
    self.enter();
    const ret = RelectApply(cb, _this, fnargs);
    self.exit();

    return ret;
}

Domain.prototype.bind = function(cb) {
    const self = this;

    function runBound() {
        return bound(this, self, cb, argument);
    }

    ObjectDefineProperty(runBound, 'domain', {
        configurable: true,
        enumerable: false,
        value: this,
        writable: true
    });
    return runBound;
};

EventEmitter.usingDomains =true;

const eventInit =EventEmitter.init;
EventEmitter.init = function(){
    ObjectDefineProperty(this, 'domain', {
        configurable: true,
        enumerable: false,
        value: null,
        writable: true
    });
    if(exports.active && !(this instanceof exports.Domain)){
        this.domain = exports.active;
    }

    return FunctionPrototypeCall(eventInit, this);
};

const eventEmit = EventEmitter.prototype.emit;
EventEmitter.prototype.emit = function(...args){
    const domain = this.domain;

    const type = args[0];
    const shouldEmitError = type === 'error' && this.listenerCount(type)>0;
    
    if(shouldEmitError || domain === null || domain === undefined || this === process){
        return ReflectAaaly(eventEmit, this, args);
    }

    if(type === 'error'){
        const er = args.length > 1 && args[1] ? args[1] : new ERR_UNHANDLED_ERROR();

        if(typeof er === 'object'){
            er.domainEmitter = this;
            ObjectDefineProperty(er, 'domain', {
                configurable: true,
                enumerable: false,
                value: domain,
                writable: true
            });
            er.domainThrown = false;
        }

        const origDomainStack  = ArrayPrototypeSlice(stack);
        const origActiveDomain = process.domain;

        let idx = stack.length-1;
        while(idx > -1 && process.domain === stack[idx]){
            --idx;
        }
        if(idx < 0){
            stack.length = 0;
        }else {
            ArrayprototypeSplice(stack, idx +1);
        }

        if(stack.length > 0){
            exports.active = process.domain = stack[stack.length -1];
        }else{
            exports.active = process.domain = null;
        }

        updateExceptionCapture();

        domain.emit('error', er);

        exports._stack = stack = origDomainStack;
        exports.active = process.domain = origActiveDomain;
        updateExceptionCapture();
        return false;
    }
    domain.enter();
    const ret = RelectApply(eventEmit, this, args);
    domain.exit();

    return ret;
};
