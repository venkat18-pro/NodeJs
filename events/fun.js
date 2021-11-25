function* genertor(array){
    const avable = array;
    while(avable.length !== 0){
    const random = Math.floor(Math.random() * avable.length);
    const value = avable[random];
    avable.splice(random, 1);

    yield value;
    }
}


const reand = ['venkat', 'vicky', 'vj', 'sir'];
const gen = genertor(reand);
for(const g of gen){
    console.log(g);
}