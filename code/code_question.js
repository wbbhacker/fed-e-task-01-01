const fp = require('lodash/fp')
// 一、
let p1 = new Promise((resolve, reject )=>{
      setTimeout(() => {
        var a = 'hello'
        resolve(a)
      }, 10);
}).then((a)=>{
  return  new Promise((resolve, reject)=>{
    setTimeout(() => {
      var b = 'lagou'
      resolve(`${a} ${b}`)
    }, 10);
  })
  
}).then((ab)=>{
  setTimeout(() => {
    var c = 'I ❤ U'
    console.log(`${ab} ${c}`)
  }, 10);
})

// 二
const cars = [
  {name: 'Ferrari FF', horsepower:660, dollar_value:700000, in_stock:true},
  {name: 'Spyker C12 Zagato', horsepower:650, dollar_value:648000, in_stock:false},
  {name: 'Jaguar XKR-S', horsepower:550, dollar_value:132000, in_stock:false},
  {name: 'Audi R8', horsepower:525, dollar_value:114200, in_stock:false},
  {name: 'Aston Martin One-77', horsepower:750, dollar_value:1850000, in_stock:true},
  {name: 'Pagani Huayra', horsepower:700, dollar_value:1300000, in_stock:false},
]

  // 1
let isLastInStock = fp.flowRight(fp.curry(fp.prop('in_stock')),fp.last)
console.log(isLastInStock(cars))
  // 2

let getFirstName = fp.flowRight(fp.curry(fp.prop('name')), fp.first)
console.log(getFirstName(cars))
  // 3
let _average = function(xs){ return fp.reduce(fp.add, 0, xs)/xs.length}
let averageDollarValue = fp.flowRight(_average,fp.map((car)=> car.dollar_value))
console.log(averageDollarValue(cars))

  // 4
let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.map((v) => { return fp.flowRight(_underscore,fp.lowerCase)(v)})
console.log(sanitizeNames(['Hello World']))


// 三
class Container{
  static of(value){
    return new Container(value)
  }
  constructor(value){
    this._value = value
  }
  map(fn){
    return Container.of(fn(this._value))
  }
}
class Maybe{
  static of(x){
    return new Maybe(x)
  }
  isNothing(){
    return this._value === null || this._value === undefined
  }
  constructor(x){
    this._value = x
  }
  map(fn){
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}

  // 1

  let maybe = Maybe.of([5,6,11])
  let ex1 = (num) => maybe.map(fp.map((v)=>fp.add(v,num)))
  console.log(ex1(1))

  // 2
  let xs = Container.of(['do1','ray','me','fa','so','la','ti','do'])
  let ex2 = () => xs.map(fp.first)._value
  console.log(ex2())

  // 3
  let safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x])
  })
  let user = {id:2, name:'Albert'}
  let ex3 = () => safeProp('name', user).map(fp.first)
  console.log(ex3())

  // 4
let ex4 = (x) =>  Maybe.of(x).map(parseInt)._value
  console.log(ex4('1'))
  console.log(ex4(null))

