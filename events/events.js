const {EventEmitter} = require('events');



const myEmitter = new EventEmitter();
/*
myEmitter.on('event', (a,b)=>{
    setImmediate(()=>{
        console.log('this happens asynchronously');
    });
});

myEmitter.emit('event', 'a', 'b');


myEmitter.once('event', ()=>{
    console.log('hello');
});

myEmitter.emit('event');
const emitter = new MyEmitter();
emitter.on('error', (err)=>{
    console.error('error');
});
emitter.emit('error', new Error('whoop'));

const ee1 = new EventEmitter({captureRejections: true});

ee1.on('something', async (value)=>{
    throw new Error('kaboom');
});

ee1.on('error', console.log);

const ee2 = new EventEmitter({captureRejections: true});

ee2.on('something', async (value)=>{
    throw new Error('kaboom');
});

ee2[Symbol.for('node.js.rejection')]=console.log;


myEmitter.once('removeListener', (event, listener)=>{
    
    if(event === 'event'){
        myEmitter.on('event', ()=>{
            console.log('b');
        });
    }
});

myEmitter.on('event', ()=>{
    console.log('a');
});

myEmitter.emit('event');

let c = 0

myEmitter.addListener('event', ()=>{
    c++;
    console.log('add event');
});

myEmitter.on('event', ()=>{
    c++;
    console.log(c);

});
myEmitter.emit('event');


myEmitter.on('event', function first(){
    console.log('first listener');
});
myEmitter.on('event', function second(arg1, arg2){
    console.log('second listener'+arg1+arg2);
});
myEmitter.on('event', function third(...args){
    const pa = args.join(',');
    console.log('third listener'+pa);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1,2,3,4,5);

myEmitter.on('foo', ()=>{});
myEmitter.on('foo', ()=>{});
myEmitter.on('foo', ()=>{});

//myEmitter.getMaxListeners(2);
myEmitter.removeAllListeners('foo');
console.log(myEmitter.listenerCount('foo'));

const callbackA = ()=>{
    console.log('a');
    myEmitter.removeListener('event', callbackB);
};

const callbackB = ()=>{
    console.log('b');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

myEmitter.emit('event');

myEmitter.emit('event');

function pong() {
    console.log('pong');
}

myEmitter.on('ping', pong);
myEmitter.once('ping', pong);
myEmitter.removeListener('ping', pong);

myEmitter.emit('ping');
myEmitter.emit('ping');
*/

myEmitter.once('log', ()=> console.log('log once'));

const listeners = myEmitter.rawListeners('log');
const logFnWrapper = listeners[0];

logFnWrapper.listener();

logFnWrapper();

myEmitter.on('log', ()=> console.log('log persistently'));
const newListeners = myEmitter.rawListeners('log');

newListeners[0]();
myEmitter.emit(
   ' log'
);

