// Promise 功能
  // 1.promise 有三种状态pending 等待、fulfilled 失败、rejected 拒绝
  // 2.立即执行器 actuator, resolve 成功回调， reject 失败回调
  // 3.then 链式调用
  // 4.多个then 连续调用


// *****************************MyPromise 实现************************************//

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 定义

class MyPromise{
  
  status = PENDING  // promise 状态
  value = undefined // 成功返回值
  reason = undefined // 失败返回值
  successCallbacks = [] // 成功回调数组
  failCallBacks = []  //失败回调数组

  constructor(actuator){
    actuator(this.resolve, this.reject)
  }
  resolve = (v) => {  // 为了传递this 用箭头函数
    if (this.status === REJECTED) return // 状态已为 REJECTED 时 退出

    // 修改 promise 状态
    this.status = FULFILLED
    this.value = v
    // 异步完成时执行成功回调
    if (this.successCallbacks.length > 0 ) this.successCallbacks.forEach(cb=> cb(this.value))

  }
  reject = (v) =>{

    if (this.status === FULFILLED) return 

    // 修改 promise 状态
    this.status = REJECTED
    this.reason = v


    // 异步完成时，执行失败回调
    if (this.failCallBacks.length > 0) this.failCallBacks.forEach(cb=>(this.reason))
    
  }
  then(successCallback, failCallBack){

    
    let promise2 =  new MyPromise((resolve, reject)=>{

        switch (this.status) {
          case FULFILLED:
            // 成功回调
                let x = successCallback(this.value)
                resolvePromise( x, resolve, reject)
            break;
          
          case REJECTED:
            // 失败回调
              let r = failCallBack(this.reason)
              resolvePromise( r, resolve, reject)
            break;

          default:
            // 异步时,保存回调fn

            this.successCallbacks.push((value)=>{
              let x = successCallback(value)
              resolvePromise(x, resolve, reject)
            })
            this.failCallBacks.push((value)=>{
              let x = failCallBack(value)
              resolvePromise(x, resolve, reject)
            })
             
            
            break;
        }
    })
    return promise2
  }
}

function resolvePromise( x, resolve, reject){

  if(x instanceof MyPromise){
    // 根据 promise2 对象 的状态执行对应的回调
    x.then(resolve, reject)

  }else{
    // 普通值
    resolve(x)
  }
  
}

// *************************************************************
let promise = new MyPromise((resolve, reject) => {
 
  // reject(' promise 失败')
  setTimeout(() => {
    
    resolve('promise 成功')

  }, 1000);
  
})

function other(){
  return new MyPromise((resolve, reject)=>{
    // setTimeout(() => {
      resolve('other 成功')
      // reject('other 失败')
    // }, 1000);
  })
}



promise.then(value=>{
  console.log(value)
  return other()
},(value)=>{
  console.log(value)
}).then(
  (value)=>{
    console.log(value)
    return 0
  } , 
  (value)=> console.log(value), 
)





