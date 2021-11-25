function asy(n1, n2){
    let p = new Promise((resolve, reject)=>{
        if(n1 >= 0 && n2 >= 0){
            resolve(n1+n2);
        }
        else{
            reject('Error');
        }
        
    });
    return p;
}

/*asy(10,20).then((result)=>{
    console.log(result);
    return asy(result, result);
}).then((result)=>{
    console.log(result);
    return asy(result, result);
}).then((result)=>{
    console.log(result);
    return asy(500, 50);
}).then((result)=>{
    console.log(result);
});
*/
Promise.race([asy(10,20), asy(30,30), asy(40,40)])
                    .then((resolveValue)=>{
                        console.log(resolveValue);
                        console.log(resolveValue);
                        //console.log(resolveValue[2]);
                    }).catch((rejectValue)=>{
                        console.log(rejectValue);
                    });


