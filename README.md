# jQuery-delayQueue
jQuery delayQueue

### 简单使用
#### 默认配置  {debug:0,locally:1,interval:5000,queue:[],callback:{}}
var delayQueue=$.delayQueue();
#### 配置时间间隔
var delayQueue=$.delayQueue(1000);
或者
var delayQueue=$.delayQueue({interval：1000});
#### 自定义配置
var delayQueue=$.delayQueue({debug:0,locally:1,interval:5000,queue:[],callback:{}});
#### 添加队列
var timeStamp=delayQueue.add(time,callback,type)  type若存在，则time为时间戳，否则为延后的分钟数
#### 移除队列
delayQueue.remove(timeStamp)  timeStamp为创建队列时返回的值


### 参数说明
#### (boolean)debug 
若为true，则每次调用时会在console中输出对象自身
#### (boolean)locally 
若为true，则会使用cookie做本地存储依赖，从而不受浏览器刷新等限制
#### (int)interval 
时间间隔毫秒数
#### (array)queue 
时间戳队列，可用于初始化队列，locally为false时有效
#### (object)callback 
时间戳及回调函数的对象，可用于初始化队列，locally为false时有效


### 属性
#### (array)queue
时间戳队列数组
#### (object)callback
时间戳和回调函数存储对象
#### (object)timer
内置定时对象，需要juery.timer.js依赖
#### (int)interval
timer定时间隔，可简单认为定时队列的精度
#### (boolean)debug
debug 选项
#### (boolean)locally
存储类型，false 无本地存储  1 cookie存储  其它 html5 localStorage存储
#### (int)runtimes
timer自上一次浏览器刷新到现在的运行次数


### 方法
#### init()
初始化方法，读取本地存储--实例化timer
#### add(time,callback,type)
添加延时队列  callback为匿名函数时不能保存在本地，为 函数(参数) 时 可保存,type存在时time为时间戳，否则为延后的分钟数
#### checkRepeat(timeStamp)
添加队列时，获取不重复的时间戳
#### remove(timeStamp)
移除时间戳对应的定时队列
#### localize(type)
本地化处理函数，type存在为存储，否则为读取
#### getStorage(name) getCookie(name)
读取本地数据，前者为localStorage后者为cookie
#### setStorage(name,value) setCookie(name,value,expiredays)
存储本地数据，前者为localStorage后者为cookie
#### stop() pause() resume() reset(time)
封装timer自带方法
#### check(timeStamp)
检查传入时间戳timeStamp之前的所有需要执行的队列
#### getSmallList(arr,num)
数字数组排序，获得小于该数字的数组
