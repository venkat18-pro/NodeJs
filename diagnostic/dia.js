const diagnostics_channel = require('diagnostics_channel');

/*const channel = diagnostics_channel.channel('My-channel');

channel.subscribe((message, name)=>{
    console.log('channel'+message + name);
});

if(channel.hasSubscribers){

    channel.publish({
        some: 'data'
    });
}*/
const channels = diagnostics_channel.channel('my-channel');
//var a = channels.publish({
 //   some : 'data'
//});
//console.log(a);
//console.log('hello unsubscribers');

//channels.subscribe((message, name)=>{
  //  console.log(message + name);
//});

function onMessage(message, name){
    console.log(message+ name);
}

channels.subscribe(onMessage('hello', 'world'));

channels.unsubscribe(onMessage);