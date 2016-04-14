# jQuery-delayQueue
jQuery delayQueue

## 简单使用
###默认配置  {debug:0,locally:1,interval:5000,queue:[],callback:{}}
var delayQueue=$.delayQueue();
###配置时间间隔
var delayQueue=$.delayQueue(1000);
或者
var delayQueue=$.delayQueue({interval：1000});
###自定义配置
var delayQueue=$.delayQueue({debug:0,locally:1,interval:5000,queue:[],callback:{}});
###添加队列
var timeStamp=delayQueue.add(time,callback,type)  type若存在，则time为时间戳，否则为延后的分钟数
###移除队列
delayQueue.remove(timeStamp)  timeStamp为创建队列时返回的值


##参数说明
####(boolean)debug 
若为true，则每次调用时会在console中输出对象自身
####(boolean)locally 
若为true，则会使用cookie做本地存储依赖，从而不受浏览器刷新等限制
####(int)interval 
时间间隔毫秒数
####(array)queue 
时间戳队列，可用于初始化队列，locally为false时有效
####(object)callback 
时间戳及回调函数的对象，可用于初始化队列，locally为false时有效

