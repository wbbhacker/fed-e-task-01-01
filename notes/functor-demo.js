const fs = require('fs')
const { split, find } = require('lodash/fp')
const fp = require('lodash/fp')
// 一般函子
// class Container{
//   static of(x){
//     return new Container(x)
//   }
//   constructor(x){
//     this._value = x
//   }
//   map(fn){
//     return new Container(fn(this._value))
//   }
// }


// let r = Container.of(5)
//           .map(x => x + 2)
//           .map(x => x * x)



// let r = Container.of(null)
//   .map(x => x.toUpperCase())

// console.log(r)

// maybe 函子

// class Maybe{  
//   static of (x){
//     return new Maybe(x)
//   }
//   constructor(x){

//     this._value = x
//   }
//   map(fn){
//     return this._value !== null && this._value !== undefined ?  Maybe.of(fn(this._value)) :  Maybe.of(this._value)
//   }
// }

// class Maybe {
//   static of(x) {
//     return new Maybe(x)
//   }
//   constructor(x) {

//     this._value = x
//   }
//   map(fn) {
//     return this.isNothing ? Maybe.of(this._value) : Maybe.of(fn(this._value)) 
//   }
//   isNothing(){
//     return this._value === null || this._value === undefined
//   }
// }


// let r = Maybe.of(undefined)
//   .map(x => x.toUpperCase())
//   .map(x=> x*x)

// console.log(r)

// either 函子

// class Either{
//   static of(left,right){
//     return new Either(left, right)
//   }
//   constructor(left, right){
//     this._value = right ? right : left;
//   }
//   map(fn){
//     return Either.of(fn(this._value))
//   }
// }


// class Either {
//   static of(left, right) {
//     return new Either(left, right)
//   }
//   constructor(left, right) {
//     this.left = left;
//     this.right = right;
//   }
//   map(fn) {
//     return this.right ?  Either.of(this.left,fn(this.right)) : Either.of(fn(this.left),this.right)
//   }
// }

// class Left{
//   static of(x){
//     return new Left(x)
//   }
//   constructor(x){
//     this._value = x
//   }
//   map(fn){
//     return this
//   }
// }

// class Right {
//   static of(x) {
//     return new Right(x)
//   }
//   constructor(x) {
//     this._value = x
//   }
//   map(fn) {
//     return Right.of(fn(this._value))
//   }
// }


// console.log(Either.of(5, 6).map(x => x + 1)); // Either { __value: null, left: 5, right: 7 }
// console.log(Either.of(5, null).map(x => x + 1)); // Either { __value: null, left: 5, right: 7 }

// let r1 = Right.of(12).map(x => x + 2)
// let r2 = Left.of(12).map(x => x + 2)

// console.log(r1)
// console.log(r2)

// function parseJSON(str) {
//   try {
//     return Right.of(JSON.parse(str))
//   } catch (e) {
//     return Left.of({ error: e.message })
//   }
// }

// let r = parseJSON('{ name: zs }')
// console.log(r)

// let r = parseJSON('{ "name": "zs" }')
//   .map(x => x.name.toUpperCase())
// console.log(r)


// class IO {
//   static of(x) {
//     return new IO(x)
//   }
//   constructor(x) {

//     this._value = x
//   }
//   map(fn) {
//     return this.isNothing ? Maybe.of(this._value) : Maybe.of(fn(this._value)) 
//   }
// }
// console.log('AAAA')
// setTimeout(() => {
//   console.log('BBBB')
// }, 1000);
// const start = new Date();
// while (new Date() - start < 3000) { }
// console.log('CCCC')
// setTimeout(() => {
//   console.log('DDDD')
// }, 0);
// new Promise((resolve, reject) => {
//   console.log('EEEE')
//   foo.bar(100)
// })
//   .then(() => console.log('FFFF'))
//   .then(() => console.log('GGGG'))
//   .catch(() => console.log('HHHH'))
// console.log('IIII')



// function foo() {
//   setTimeout(() => {
//     foo()
//   }, 0);
// }
// foo()

// 

// class IO{
//   static of(value){
//     return new IO(function(){
//       return value
//     })
//   }
//   constructor(fn){
//     this._value = fn
//   }
//   map(fn){
//     return new IO(fp.flowRight(fn,this._value))
//   }
// }

// let r = IO.of(process).map(p => p.execPath)
// // console.log(r)
// console.log(r._value())

// async function async1(){
//   console.log('AAAA')
//   async2()
//   console.log('BBBB')
// }
// async function async2(){
//   console.log('CCCC')
// }
// console.log('DDDD')
// setTimeout(() => {
//   console.log('FFFF')
// }, 0);
// async1()
// new Promise(function(resolve) {
//   console.log('GGGG')
// }).then(function () {
//     console.log('HHHH')
// })
// console.log('IIII')


// task fanctor

// class taskFanctor{
//   static of(fn){
//     return new taskFanctor(()=>{
//       return setTimeout(()=>{
//         fn(this.resolver)
//       },0)
//     })
//   }
//   constructor(fn){
//     this._value = fn
//     this.resolver = {
//       resolve:null
//     }
//   }

//   map(fn){
//     return new taskFanctor(fp.flowRight(fn, this._value)) 
//   }

//   run(){
//     return  taskFanctor.of(this._value())
//   }

//   listen(obj){
//     this._value()
//     this.resolver.resolve = obj.onResolved
//   }

// }


// // let taskInstance = new taskFanctor(resolver => {
// //   fs.readFile('fp-demo.js', 'utf-8', (err, data) => {
//     // if (err) resolver.reject(err)

// //     resolver.resolve(data)
// //   })
//   // let r = IO.of('sljdlsj\nsdsdsd')

// taskFanctor.of(resolver => {
//     fs.readFile('fp-demo.js', 'utf-8', (err, data) => {
//       if (err) resolver.reject(err)
//       resolver.resolve(data)
//     })
//   })
//   .map(split('\n'))
//   .map(value=> console.log(value))
//   .run()
//   .listen({
//     onResolved: value => {
//       console.log(value)
//     }
//   })
