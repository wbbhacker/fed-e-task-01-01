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
    try {
      //捕获错误状态
      actuator(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
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
    if (this.failCallBacks.length > 0) this.failCallBacks.forEach(cb=> cb(this.reason))
    
  }
  then(successCallback, failCallBack){

    
    let promise2 =  new MyPromise((resolve, reject)=>{

        switch (this.status) {
          case FULFILLED:
            // 成功回调
                setTimeout(() => {             
                  try {                    
                    // 捕获错误信息
                    let x = successCallback(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                  } catch (error) {
                    reject(error)
                  }     
                }, 0);
                
            break;
          
          case REJECTED:
            // 失败回调
                setTimeout(() => {          
                  try {                    
                    let r = failCallBack(this.reason)
                    resolvePromise(promise2, r, resolve, reject)
                  } catch (error) {
                    reject(error)
                  }        
                }, 0);

            break;

          default:
            // 异步时,保存回调fn
            //将成功回调添加到 成功回调中等待调用
            this.successCallbacks.push((value)=>{
              setTimeout(() => {                
                try {
                  let x = successCallback(value)
                  resolvePromise(promise2,x, resolve, reject)                  
                } catch (error) {
                  reject(error)
                }
              }, 0);
            })
            //将失败回调添加到 失败回调中等待调用
            this.failCallBacks.push((value)=>{
              setTimeout(() => {            
                try {                  
                  let x = failCallBack(value)
                  resolvePromise(promise2,x, resolve, reject)
                } catch (error) {
                  reject(error)
                }    
              }, 0);
            })
             
            break;
        }
    })
    return promise2
  }
}

function resolvePromise(promise2,x, resolve, reject){
  if(promise2 ===x ){
    //如果then 的返回promise return 自己时报错
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  if(x instanceof MyPromise){
    // 根据 promise2 对象 的状态执行对应的回调
    // 将then 的promise返回函数的成功失败回调，传给 上级成功回调返回的promise
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
    // 力扣精灵盛典
    setTimeout(() => {
      // resolve('other 成功')
      reject('other 失败')
    }, 1000);
  })
}



let p2 = promise.then(value=>{
  console.log(value)
  return other()
},(value)=>{
  // console.log(value)
  // console.log(value)
})
p2.then(
  (value)=>{console.log(value)} , 
  (value)=> console.log(value), 
)





