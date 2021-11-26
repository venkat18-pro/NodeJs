const async_hooks =require('async_hooks');

const eid = async_hooks.executionAsyncId();

const tid = async_hooks.triggerAsyncId();

const asyncHook = async_hooks.createHook({ init, before, after, destroy, promiseResolve});

asyncHook.enable();

asyncHook.disable();

function init(asyncId, type, triggerAsyncId, resource){
    console.log(asyncId);
    console.log(type);
    console.log(triggerAsyncId);
    console.log(resource);
}

function before(asyncId){
    console.log('Hello this is before async Hook');
}

function after(asyncId){
    console.log('Hello this is after async Hook');
}

function destroy(asyncId){
    console.log("The hook is destroy");

}

function promiseResolve(asyncId){
    console.log("The hook is promiseResolve");
    
}
 
console.log(asyncHook);
