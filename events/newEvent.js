const { EventEmitter } = require('events');

const emitter = new EventEmitter();

function hi() {
    console.log('hi');
}
emitter.on('hello', hi);
// console.log(emitter.listeners('hello'));

// emitter.setMaxListeners(5);
// console.log(emitter.getMaxListeners());
// console.log(emitter.listenerCount('hello'));
// console.log(emitter.eventNames());
// const off = emitter.off('hello', () => {
//     console.log('event removed');
// });
// console.log(off);
emitter.once('hello', hi);
// emitter.prependListener('hello', () => console.log('hi i am first'))
emitter.removeListener('hello', hi);
emitter.emit('hello');
emitter.emit('hello');

emitter.on('hi', () => console.log('hire'));
emitter.on('hi', () => console.log('hirwtfsf'));

const newListener = emitter.rawListeners('hi');
newListener[1]();
emitter.emit(hi);