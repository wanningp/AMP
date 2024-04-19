// import $ from 'jquery';

/* eslint-disable no-constant-condition */
// function sendCars(  day, ...carIds){
//     carIds.forEach(id=> console.log(id));
// }

// sendCars('Monday',1,2,3);

let carIds=[1,2,5];
let car1, remainingCars;
[car1, ...remainingCars]=carIds;

console.log(car1, remainingCars);

// let remainingCars1;
// [ ,...remainingCars1]=carIds;
// console.log(remainingCars1);

let car ={id:5000, style:'convertible'};
let id, style;
({id, style} = car );
console.log(id,style);

function startCars(car1, car2,car3,...rest){
    console.log(rest);
}

let carIds2=[1,2,3,4,5,6];
startCars(...carIds2); //4,5,6

console.log(startCars);
console.log(typeof(null));



//convert string to integer
console.log(Number.parseInt('55ABC'));
console.log(Number.parseFloat('55.88ABC'));



//Loops
let i=0;
for(;1<12;i++){
    if(i===8){
        break;
    }
    // console.log(i);
}

 console.log(i); //8

for (let i=0; i<4; i++){
    if(i===2){
        continue;
    }
    console.log(i);
} //0,1,3


//Equality Operators
var var1='123';
var var2=123;

if (var1==var2){
    console.log(true);
}
else{
    console.log(false);
}//true

if (var1===var2){
    console.log(true);
}
else{
    console.log(false);
}//false

let id1=123;
console.log(id1!=="123"); //true
console.log(id1!="123");//false

//Unary Operators 
let year=1967;
console.log(year++);//1967
console.log(year);//1968
console.log(++year);//1969

let year1="1967";
console.log(+year1);//1967
console.log(-year1);//-1967

//Logical Operators 
if(5===5 && 6===7){
    console.log(true);
}

else{
    console.log(false);  
}

let userSettings={name:'Joe'};
let defaultSettings={name:'Ben'};
console.log(userSettings || defaultSettings);//Joe
console.log(userSettings && defaultSettings); //Ben
//and symbol has a higher precidence 

//Relational Operators
let s1="Zoo";
let s2="alpha";
if(s1<s2){
    console.log(true);
}
else{
    console.log(false);
}//true because upper case is smaller than lower case


//Conditional Operator 

console.log((5>4)? 'yes':'no'); //yes

//Assignment operators
var1 += 10; //add 10 to var1
var1 -=10; //subtract 10 from var1
let year3=1964;
year3<<=1; //multiply by 2 
year3>>=1; //dividing by 2
console.log(year3); 

//Function scope
function startCar(){
    let message ='starting...';
    let startFn= function turnKey(){
        console.log(message);
    };
    startFn();
  
}
startCar(123);

//Block scope 
let message='Outside';
if (5===5){
    // var message ='Equal';
    let message='Equal';
    console.log(message); 
}

console.log(message);

//IIFE, Immediately invoked function expresson and closure
let app=(function(){
    let carId1=123;
    let getId=function(){
        return carId1;
    };
    return{
    getId:getId
   };
})();

console.log(app.getId());

//'This' keyword
let o ={
    carId3:123,
    getId1:function(){
        console.log(this);
        return this.carId3;
    }
};
console.log(o.getId1()); //123

//Call and apply 
let m={
    carId:123,
    getId:function(prefix){
        return prefix+this.carId;
    }
};
let newCar = {carId:456};
console.log(m.getId.apply(newCar,['ID:'])); //ID:456
//  call and apply are similar just that apply can be used for arrays

//Bind 
let n ={
    carId:123,
    getId:function(){
        return this.carId;
    }
};
let newCar1={carId:456};
let newFn= n.getId.bind(newCar1);
console.log(newFn());//456 

//Arrow functions
let getId=()=> 123;
console.log(getId());//123

let getId3=(prefix, suffix)=>{
    return prefix +123+suffix;

};
console.log(getId3('ID:','!')); //ID:123!
//arrow functions do not have their own 'this' value 


//Default Parameters
let trackCar=function(carId4,city='NY'){
    console.log(`Tracking, ${carId4} in ${city}`);

};

console.log(trackCar(123));
console.log(trackCar(123,'Chicago'));

//Constructor function 
function Car(id){
    this.carId=id;
    this.start=function(){
        console.log('start:'+this.carId);};
    
}

let vehicle= new Car(123);
vehicle.start();

//JSON
let jsonIn=
`[{"carId":123},
{"carId":456},
{"carId":789}]`;

let CarIds=JSON.parse(jsonIn);
console.log(CarIds);
console.log(JSON.stringify(CarIds));

//Array Iteration
let cardids=[
    {carId:123, style:'sedan'},
    {carId:456, style:'convertible'},
    {carId:789, style:'sedan'}
] ;
let sedans = cardids.filter(car=> car.style==='sedan');
console.log(sedans);

let result= cardids.every(
    car=>car.carId>0
);
console.log(result);// validating that car id exist in each car 

let car8=cardids.find(
    car=>car.carId>500
);
console.log(car8);

cardids.forEach(car=> console.log(car));

cardids.forEach((car,index)=> console.log(car,index));


//Classes 
class Car3{
    constructor(id){
        this.id=id;
    }
}

let car3= new Car3(123);
car3.id=456;
console.log(car3.id);



//Inheritance 
class Vehicle{
    constructor(){
        this.type='car';
    }
    start(){
        return ` Starting:${this.type}`;
    }
}
//Methods
class Car4 extends Vehicle{
    constructor(id){
        super();
        this.id=id;
    }
    identify(suffix){
        return `Car Id: ${this.id} ${suffix}`;
    }
    start(){
        return 'in car start'+super.start();
    }
}
let car4= new Car4(123);
let car5= new Car4();
console.log(car4.identify('!!!'));

console.log(car5.type);
console.log(car5.start());

//BOM
// year4=1956;
console.log(window.innerWidth);

//Timer
let intervalId=setTimeout(function(){
    console.log('1 second passed');
}, 1000);

intervalId;

clearInterval(intervalId);

//location object 
console.log(document.location.href);


//document object 
//select dom elements
let el =document.getElementById('first');
console.log(el);

let le= document.getElementsByClassName('p1');
console.log(le);
console.log(le[0]);

let lel= document.getElementsByTagName('p');
console.log(lel);

//Modifying Dom element 
// let element=document.getElementById('first');
// element.textContent='New Content...'; //line 
// element.setAttribute('foo', 'fooValue');
// console.log(element);
// element.classList.add('p2');
// console.log(element);
// element.style.color='blue';
// console.log(element);

//Error handling
// try {
//     let carq= newCar2;
// }
// catch(error) {
//     console.log('error:',error);
// }
// finally{console.log('continuing...');}

//developer define error 
try{
    throw new Error('my custom error');
}
catch(error){
    console.log('error:',error);
}
finally{
    console.log('this always executes');
}

//Promises
// let promise= new Promise(
//     function(resolve,reject){
//         setTimeout(resolve,100,'someValue');
//     });
// console.log(promise);
// promise.then(
//     value=>console.log('fulfilled:'+value),
//     error=>console.log('rejected:'+error)
// );

//HTTP GET JQUERY
// let promise=$.get("http://myid.mockapi.io/api/v1/users");
// promise.then(
//     data=>console.log('success:', data),
//     error=>console.log('error:', error)
// );

//http post jquery 
// let user={
//     name:'Mark Zamoyota',
//     avatar:'mark.jpg'
// };

// let promise1=$.post("http://myid.mockapi.io/api/v1/users");
// promise1.then(
//     data=>console.log('success:', data),
//     error=>console.log('error:', error)
// );

//Form
let form = document.getElementById('user-form');
form.addEventListener('submit', 
event=>{
    let user=form.elements['user'];
    // let avatarFile=form.elements['avatar-file'];
    if (user.value.length<4){
        let userError=document.getElementById('user-error');
        userError.textContent='Invalid Entry';
        userError.style.color='red';
        user.style.borderColor='red';
        user.focus();
    // console.log(user.value,avatarFile.value);

    event.preventDefault();}
});

window.foo='secretcode';
