/*console.time();
function fun(num){
    if(num<=0){
        return 1;
    }else{
        var x = num * fun(num-1);
        console.log(x);
        return x;
    }
}

fun(10);
console.timeEnd();


const name = ['venkat', 'vj', 'vicky'];
name.map((element, index)=>{
    console.log('index of arrow function');
    console.log(`index ${index} element ${element}`);
});


function con(rollno, firstName, lastName){
    this.rollno = rollno;
    this.firstName = firstName;
    this.lastName = lastName;

    this.fullNameA = function(){
        setTimeout(()=>{
            console.log(this.firstName +' '+ this.lastName);
        },1000);

     this.fullName = function(){
         setTimeout(()=>{
             console.log(this.firstName +' '+this.lastName);
         },1000);
     }   
    }
}

const s1 = new con(1, 'venkat', 'esh');
s1.fullNameA();
s1.fullName();
*/

var a = [1,2,3];
var b= [4];
var c = [...a,...b];
console.log(c);

var aa = {first: 'venkat',second: 'vicky'};
var bb = {thrid: 'vj'};
var cc = {...aa, ...bb}
console.log(cc);