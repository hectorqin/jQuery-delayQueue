/**
 * jQuery delayQueue Plugin
 * @version 1.0.1
 * @author hector <1069315972@qq.com>
 * @website http://hectorq.me
 * @license MIT 
 */

(function($) {
	jQuery.delayQueue = function(options) {
		// Create options for the default locally value
		if(typeof(options)=="number"){
			options={interval:options};
		}else if(typeof(options)!="object"&&options){
			return false;
		}
		if(typeof($.timer)=="undefined"){
	            console.error('需要juery.timer.js库');
	            return false;
	        }
        
		var options = jQuery.extend({ locally : 1}, options);

		var delayQueue=function(options){
			this.queue    =options.queue||[];
			this.callback =options.callback||{};
			this.interval =options.interval||5000;
			this.debug    =options.debug||0;  //debug
			this.runtimes =0;

			this.init = function(){
				this.localize();
				var self=this;
				this.timer=$.timer(this.interval,function(){
					var timeStamp=Date.parse(new Date());
					self.debug&&console.log(self);
					self.runtimes++;
					self.pause();
					self.check(timeStamp);
					self.resume();
				});
			};

			//添加延时队列  callback为匿名函数时不能保存在本地，为 函数(参数) 时 可保存
			this.add = function(time,callback,type){
				if(!callback) { return false; }
				if(!type){ //默认为分钟
					var timeStamp=Date.parse(new Date());
					timeStamp+=time*60000;
				}else{
					var timeStamp=time;
				}

				timeStamp=this.checkRepeat(timeStamp);
				this.queue.push(timeStamp);
				this.callback[timeStamp]=callback;
				this.localize(true);
				return timeStamp;
			};

			this.checkRepeat = function(timeStamp){
				if($.inArray(timeStamp, this.queue)!=-1){
					return this.checkRepeat(parseInt(timeStamp)+parseInt(Math.random()*1000));
				}else{
					return timeStamp;
				}
			};

			this.remove = function(timeStamp){
				var k=$.inArray(timeStamp, this.queue);
				this.queue.splice(k, 1);
				delete this.callback[timeStamp];
				this.localize(true);
			};

			this.localize = function(type){
				if(type){
					if(!options.locally){
						return ;
					}
					var obj={
						'queue':this.queue,
						'callback':this.callback
					}
					if(options.locally==1){
						this.setCookie('delayQueue',JSON.stringify(obj))
					}else{
						this.setStorage('delayQueue',JSON.stringify(obj));
					}
				}else{
					if(!options.locally){
						return ;
					}
					var obj=(options.locally==1)?this.getCookie('delayQueue'):this.getStorage('delayQueue');
					obj=obj?JSON.parse(obj):{"queue":[],"callback":{}};
					this.queue=obj.queue;
					this.callback=obj.callback;
				}
			};

			this.getStorage = function(name){
				if(!window.localStorage) return false;
				var storage=window.localStorage;
				return storage.getItem(name);
			}

			this.setStorage = function(name,value){
				if(!window.localStorage) return false;
				var storage=window.localStorage;
				return storage.setItem(name,value);
			}

			//cookie做本地存储依赖
			this.getCookie = function(name){
				if(typeof(getCookie)=='function'){
					return getCookie(name);
				}else{
					var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			        if(arr=document.cookie.match(reg)){
			            return unescape(arr[2]);
			        }else{
			            return null;
			        }
				}
			};

			//cookie做本地存储依赖
			this.setCookie = function(name,value,expiredays){
				if(typeof(setCookie)=='function'){
					return setCookie(name,value,expiredays);
				}else{
					if(!expiredays){
			            document.cookie = name + "="+ escape (value) + ";path=/";
			        }else{
			            var exdate=new Date();
			            exdate.setTime(exdate.getTime()+expiredays*24*3600*1000);
			            document.cookie = name + "="+ value + ";expires="+exdate.toGMTString()+";path=/";
			        }
				}
			};

			this.stop = function(){
				return this.timer.stop();
			};

			this.reset = function(time){
				this.interval=time;
				return this.timer.reset(time);
			};

			this.pause = function(){
				return this.timer.pause();
			};

			this.resume = function(){
				return this.timer.resume();
			};

			this.sleep = function(sleepTime){
				if(typeof(sleep)=='function'){
					sleep(sleepTime);
				}else{
					for(var start = Date.now(); Date.now() - start <= sleepTime; ) { }
				}
			};

			//判断是否有队列需要出栈
			this.check = function(timeStamp){
				var _queue=this.getSmallList(this.queue,timeStamp);
				if(_queue.length>0){
					for(i in _queue){
						var _callback=this.callback[_queue[i]];
						this.remove(_queue[i]);
						if(_callback){  //自执行函数保存临时变量
							setTimeout(function(_callback){
								return function(){
									if(typeof(_callback)=='string'){
										eval(_callback);
									}else{
										_callback();
									}
								}	
							}(_callback),i*1000);
						}
					}
				}else{
					if(this.queue.length==0){
						this.reset(60000);
					}
				}
			};

			//数字数组排序，获得小于该数字的数组
			this.getSmallList = function(arr,num){
				var temp=arr.slice(0);
				temp.push(num+'++++++');
				temp.sort(function(a,b){
					if(parseInt(a)<parseInt(b)){
						return false;
					}else if(parseInt(a)==parseInt(b)){
						return a.length<b.length
					}else{
						return true;
					}
				});
				var k=$.inArray(num+'++++++', temp);
				return temp.slice(0,k);
			};

			this.init();
		}

		// Create a new timer object
		return new delayQueue(options);
	};
})(jQuery);
