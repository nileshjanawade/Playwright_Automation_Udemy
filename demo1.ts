// let message1  = "Hello";
// // message1 = 12 ; //Type 'number' is not assignable to type 'string'.

// message1 = "bye";
// console.log(message1);

// let age1 = 20;
// console.log(age1);


// let isActive = false ; 
// console.log(isActive); 

// let numberarray = [1,2,3];



//  let data : any = " this could be anything";

//  data = 42 ;
//  console.log(data);


 let message2 : String  = "Hello";
// message1 = 12 ; //Type 'number' is not assignable to type 'string'.
console.log(message2);

message2 = "TATA";
console.log(message2);

let age2 : number = 30;
console.log(age2);


let isVlaue : boolean = true ; 
console.log(isVlaue); 

function addEventListener2(a:number,b:number)
{
    return a+b;
}

console.log(addEventListener2(2,4));
// console.log(addEventListener2(2,"3"));


let user1 = {name: "Bob" , age :34}
let user2 : {name:String , age: number} = {name : "Bob" , age : 23}

user1.location = "Hyderabad"; 
