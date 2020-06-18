const _ = require('lodash')
let arrTest = [1,2,3,4,5,6,7,8,9,10]
let arrStr = ['hello', 'world']

// forEach 函数

// function forEach(array, fn) {
//   for(let i of array){
//     fn(i)
//   }
// }
// forEach(arrTest, (v)=>{
//   console.log(v)
// })

// // Filter 函数

// function Filter(array,fn) {
//   let result = []
//   for(let i of array){
//     if(fn(i)) result.push(i)
//   }
//   return result
// }
// console.log(Filter(arrTest,v=>v>3));


// makeFn

// function makeFn(){
//   let msg = 'hello, world'
//   return function(){
//     console.log(msg);
//   }
// }
// let rFn = makeFn()
// console.log(rFn());

// once 

// function once(fn){
//   let flag = true
//   return function(...args){
//     if (flag) fn.apply(this,args)
//     flag = false
//   }
// }
// let log = once(v=> console.log(v))
// log(1)
// log(2)
// log(3)

// map

// function map(array, fn) {
//     let result =[]
//     for(let v of array){
//       result.push(fn(v))
//     }
//     return result
// }
// console.log(map(arrTest,v=>v*v));

// every
// function every(array, fn){
//   let result = true
//   for(let v of array){
//     if(!fn(v)) result = false
//   }
//   return result
// }

// console.log(every(arrTest, v => v >=1));

// some
// function some(array, fn) {
//     let result = false
//     for(let v of array){
//        if(fn(v)){
//          result = true
//          break;
//        }
//     }
//     return result
// }
// console.log(some(arrTest, v=> v>11))


// closure
// function makePower(power) {
//   return  (v) =>  Math.pow(v,power)
// }
// let power2 = makePower(2)
// let power3 = makePower(2)
// console.log(power2(2))
// console.log(power3(3))

// lodash
// console.log(_.first(arrTest))
// console.log(_.last(arrTest))
// console.log(_.upperCase(arrStr))
// console.log(_.reverse(arrTest))
// console.log(_.reverse(arrTest))

// memoize

// function memoize(fn) {
//   let cache = {}
//   return function (...args) {

//     const key = JSON.stringify(args)
//     cache[key] = cache[key] ? cache[key] : fn.apply(this, args)
//     return cache[key]

//   }
// }
// function clog(str) {
//   console.log(str)
// }
// console.log(memoize(clog)('test'))

// curry

// let add = function(a,b,c){
//   return a+b+c
// }
// function curry(fn) {
//   return function curriedFn(...args){
//     if(args.length < fn.length){
//       return function () {
//         return curriedFn(...args.concat(Array.from(arguments)))
//       }
//     }else{
//       return fn.call(this,...args)
//     }
//   }
// }
// let addCurry = curry(add)
// console.log(addCurry(1,2,3))
// console.log(addCurry(1)(2)(3))
// console.log(addCurry(1,2)(3))

// compose


// const reverse = arr => arr.reverse()
// const first = arr => arr[0]
// const toUpper = s => s.toUpperCase()

// let compose =  (...args) => (value) => args.reverse().reduce((acc, fn) => fn(acc), value) 

// let f = compose(toUpper,first,reverse)

// console.log(f(['one', 'two', 'three']))

